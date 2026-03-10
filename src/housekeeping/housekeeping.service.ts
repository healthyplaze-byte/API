import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { HousekeepingStatus, TaskPriority } from "@prisma/client";

@Injectable()
export class HousekeepingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(hotelId: string) {
    return this.prisma.housekeepingTask.findMany({
      where: { hotelId },
      include: {
        room: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.housekeepingTask.findUnique({
      where: { id },
      include: {
        room: true
      }
    });
  }

  async create(hotelId: string, data: {
    roomId: string;
    assignedStaffId?: string;
    priority?: TaskPriority;
    notes?: string;
  }) {
    return this.prisma.housekeepingTask.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async update(id: string, data: {
    assignedStaffId?: string;
    status?: HousekeepingStatus;
    priority?: TaskPriority;
    notes?: string;
    startedAt?: Date;
    completedAt?: Date;
  }) {
    return this.prisma.housekeepingTask.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.housekeepingTask.delete({
      where: { id }
    });
  }
}
