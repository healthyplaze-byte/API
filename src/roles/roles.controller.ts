import { Controller, Get, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("roles")
  @UseGuards(JwtAuthGuard)
  listRoles() {
    return this.rolesService.listRoles();
  }

  @Get("permissions")
  @UseGuards(JwtAuthGuard)
  listPermissions() {
    return this.rolesService.listPermissions();
  }
}

