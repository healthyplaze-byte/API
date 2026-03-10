
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class UsersService {
  private supabase;

  constructor(private readonly prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
  }

  async findStaffByHotel(hotelId: string) {
    return this.prisma.hotelUser.findMany({
      where: { hotelId, isActive: true },
      include: {
        role: true
      }
    });
  }

  async inviteStaff(hotelId: string, email: string, roleKey: string) {
    // Legacy invite logic (sending email)
    const role = await this.prisma.role.findUnique({ where: { key: roleKey } });
    if (!role) throw new Error('Role not found');

    return this.prisma.hotelUser.create({
      data: {
        hotelId,
        roleId: role.id,
        invitedEmail: email,
        userId: 'pending_' + Date.now(), 
        isActive: false
      }
    });
  }

  async createStaff(hotelId: string, data: { email: string; password?: string; fullName: string; roleKey: string }) {
    const role = await this.prisma.role.findUnique({ where: { key: data.roleKey } });
    if (!role) throw new Error('Role not found');

    // 1. Create User in Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email: data.email,
      password: data.password || "Hotel123!", // Default password if not provided
      options: {
        data: { full_name: data.fullName }
      }
    });

    if (authError) throw new Error(`Supabase Auth Error: ${authError.message}`);
    if (!authData.user) throw new Error("User creation failed");

    // 2. Create HotelUser (Staff Membership)
    // Check if membership already exists to avoid duplicates
    const existing = await this.prisma.hotelUser.findFirst({
      where: { userId: authData.user.id, hotelId }
    });

    if (existing) {
      // Update existing inactive membership
      return this.prisma.hotelUser.update({
        where: { id: existing.id },
        data: { isActive: true, roleId: role.id }
      });
    }

    return this.prisma.hotelUser.create({
      data: {
        hotelId,
        userId: authData.user.id,
        roleId: role.id,
        isActive: true,
        invitedEmail: data.email
      }
    });
  }

  async updateStaffRole(hotelUserId: string, roleKey: string) {
    const role = await this.prisma.role.findUnique({ where: { key: roleKey } });
    if (!role) throw new Error('Role not found');

    return this.prisma.hotelUser.update({
      where: { id: hotelUserId },
      data: { roleId: role.id }
    });
  }

  async removeStaff(hotelUserId: string) {
    return this.prisma.hotelUser.update({
      where: { id: hotelUserId },
      data: { isActive: false }
    });
  }
}
