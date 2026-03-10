import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PermissionsGuard } from "../auth/permissions.guard";
import { RequirePermissions } from "../auth/permissions.decorator";

@Controller("users")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("hotel/:hotelId")
  @RequirePermissions("users.read")
  listForHotel(@Param("hotelId") hotelId: string) {
    return this.usersService.findStaffByHotel(hotelId);
  }

  @Post("invite")
  @RequirePermissions("users.manage")
  inviteStaff(@Body() body: { hotelId: string; email: string; roleKey: string }) {
    return this.usersService.inviteStaff(body.hotelId, body.email, body.roleKey);
  }

  @Post("create")
  @RequirePermissions("users.manage")
  createStaff(@Body() body: { hotelId: string; email: string; fullName: string; roleKey: string; password?: string }) {
    return this.usersService.createStaff(body.hotelId, body);
  }

  @Patch(":id/role")
  @RequirePermissions("users.manage")
  updateRole(@Param("id") id: string, @Body() body: { roleKey: string; hotelId: string }) {
    // Note: PermissionsGuard checks hotelId from body
    return this.usersService.updateStaffRole(id, body.roleKey);
  }

  @Delete(":id")
  @RequirePermissions("users.manage")
  removeStaff(@Param("id") id: string, @Body() body: { hotelId: string }) {
    return this.usersService.removeStaff(id);
  }
}

