import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(hotelId: string) {
    const [totalRooms, occupiedRooms, pendingReservations, totalRevenue, openMaintenance, dirtyRooms] = await Promise.all([
      this.prisma.room.count({ where: { hotelId } }),
      this.prisma.room.count({ where: { hotelId, status: "OCCUPIED" } }),
      this.prisma.reservation.count({ where: { hotelId, status: "PENDING" } }),
      this.prisma.financialTransaction.aggregate({
        where: { hotelId, type: "PAYMENT" },
        _sum: { amount: true }
      }),
      this.prisma.maintenanceRequest.count({ where: { hotelId, status: "OPEN" } }),
      this.prisma.room.count({ where: { hotelId, status: "CLEANING" } })
    ]);

    return {
      occupancy: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
      activeReservations: occupiedRooms,
      pendingReservations,
      revenue: Number(totalRevenue._sum.amount || 0),
      maintenanceIssues: openMaintenance,
      dirtyRooms
    };
  }
}
