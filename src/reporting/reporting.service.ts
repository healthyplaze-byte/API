import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReportingService {
  constructor(private readonly prisma: PrismaService) {}

  async getOccupancyReport(hotelId: string) {
    const totalRooms = await this.prisma.room.count({
      where: { hotelId }
    });

    const occupiedRooms = await this.prisma.room.count({
      where: {
        hotelId,
        status: "OCCUPIED"
      }
    });

    return {
      totalRooms,
      occupiedRooms,
      occupancyPercentage: totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0
    };
  }

  async getRevenueReport(hotelId: string, startDate?: Date, endDate?: Date) {
    const transactions = await this.prisma.financialTransaction.findMany({
      where: {
        hotelId,
        type: "PAYMENT",
        transactionAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    const revenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    return {
      totalRevenue: revenue,
      transactionCount: transactions.length
    };
  }

  async getMaintenanceSummary(hotelId: string) {
    const openRequests = await this.prisma.maintenanceRequest.count({
      where: {
        hotelId,
        status: "OPEN"
      }
    });

    const inProgressRequests = await this.prisma.maintenanceRequest.count({
      where: {
        hotelId,
        status: "IN_PROGRESS"
      }
    });

    return {
      openRequests,
      inProgressRequests
    };
  }
}
