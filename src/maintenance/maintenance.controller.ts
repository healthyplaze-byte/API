import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { MaintenanceService } from "./maintenance.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { MaintenanceStatus, TaskPriority } from "@prisma/client";

@Controller("maintenance")
@UseGuards(JwtAuthGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.maintenanceService.findAll(hotelId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Post()
  create(@Request() req: any, @Body() data: {
    roomId?: string;
    category: string;
    description: string;
    priority?: TaskPriority;
  }) {
    const hotelId = req.user.payload.hotel_id;
    const reportedBy = req.user.payload.sub; // user ID from token
    return this.maintenanceService.create(hotelId, {
      ...data,
      reportedBy
    });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    assignedStaffId?: string;
    status?: MaintenanceStatus;
    priority?: TaskPriority;
    cost?: number;
    startedAt?: string;
    completedAt?: string;
  }) {
    return this.maintenanceService.update(id, {
      ...data,
      startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.maintenanceService.remove(id);
  }
}
