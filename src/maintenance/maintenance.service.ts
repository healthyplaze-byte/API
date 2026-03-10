import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MaintenanceStatus, TaskPriority } from "@prisma/client";

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(hotelId: string) {
    return this.prisma.maintenanceRequest.findMany({
      where: { hotelId },
      include: {
        room: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.maintenanceRequest.findUnique({
      where: { id },
      include: {
        room: true
      }
    });
  }

  async create(hotelId: string, data: {
    roomId?: string;
    reportedBy?: string;
    category: string;
    description: string;
    priority?: TaskPriority;
  }) {
    return this.prisma.maintenanceRequest.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async update(id: string, data: {
    assignedStaffId?: string;
    status?: MaintenanceStatus;
    priority?: TaskPriority;
    cost?: number;
    startedAt?: Date;
    completedAt?: Date;
  }) {
    return this.prisma.maintenanceRequest.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.maintenanceRequest.delete({
      where: { id }
    });
  }
}
