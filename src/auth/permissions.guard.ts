
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.id) {
      return false;
    }

    // Try to find hotelId from params, query, or body
    const hotelId = request.params.hotelId || request.query.hotelId || request.body.hotelId;

    if (!hotelId) {
      // If no hotel context, check if user is SUPER_ADMIN globally (if applicable)
      // Or fail if permissions are required
      // For now, let's just fail or check default hotel
      // throw new ForbiddenException('Hotel ID is required for permission check');
      return false; 
    }

    // Check user's role in this hotel
    const hotelUser = await this.prisma.hotelUser.findFirst({
      where: {
        userId: user.id,
        hotelId: hotelId,
        isActive: true
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    });

    if (!hotelUser) {
      return false;
    }

    // SUPER_ADMIN bypass
    if (hotelUser.role.key === 'SUPER_ADMIN') {
      return true;
    }

    const userPermissions = hotelUser.role.rolePermissions.map(rp => rp.permission.key);

    // Check if user has ALL required permissions
    return requiredPermissions.every(permission => {
      // Support wildcards
      if (userPermissions.includes('*')) return true;
      
      const [resource, action] = permission.split('.');
      if (userPermissions.includes(`${resource}.*`)) return true;
      
      return userPermissions.includes(permission);
    });
  }
}
