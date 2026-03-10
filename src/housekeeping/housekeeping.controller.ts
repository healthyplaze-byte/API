import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { HousekeepingService } from "./housekeeping.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { HousekeepingStatus, TaskPriority } from "@prisma/client";

@Controller("housekeeping")
@UseGuards(JwtAuthGuard)
export class HousekeepingController {
  constructor(private readonly housekeepingService: HousekeepingService) {}

  @Get()
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.housekeepingService.findAll(hotelId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.housekeepingService.findOne(id);
  }

  @Post()
  create(@Request() req: any, @Body() data: {
    roomId: string;
    assignedStaffId?: string;
    priority?: TaskPriority;
    notes?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.housekeepingService.create(hotelId, data);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    assignedStaffId?: string;
    status?: HousekeepingStatus;
    priority?: TaskPriority;
    notes?: string;
    startedAt?: string;
    completedAt?: string;
  }) {
    return this.housekeepingService.update(id, {
      ...data,
      startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.housekeepingService.remove(id);
  }
}
