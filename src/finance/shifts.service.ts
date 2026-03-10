
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentShift(userId: string, hotelId: string) {
    return this.prisma.shift.findFirst({
      where: {
        userId,
        hotelId,
        status: "OPEN"
      },
      include: {
        transactions: true
      }
    });
  }

  async openShift(userId: string, hotelId: string, startCash: number) {
    // Check if already open
    const existing = await this.getCurrentShift(userId, hotelId);
    if (existing) throw new Error("Shift already open");

    return this.prisma.shift.create({
      data: {
        userId,
        hotelId,
        startCash,
        status: "OPEN"
      }
    });
  }

  async closeShift(userId: string, hotelId: string, endCash: number, notes?: string) {
    const shift = await this.getCurrentShift(userId, hotelId);
    if (!shift) throw new Error("No open shift found");

    // Calculate system cash
    // Start Cash + (Payments - Refunds)
    const totalTransactions = shift.transactions.reduce((sum, tx) => {
      if (tx.type === "PAYMENT") return sum + Number(tx.amount);
      if (tx.type === "REFUND") return sum - Number(tx.amount);
      return sum;
    }, 0);

    const systemCash = Number(shift.startCash) + totalTransactions;

    return this.prisma.shift.update({
      where: { id: shift.id },
      data: {
        endTime: new Date(),
        endCash,
        systemCash,
        status: "CLOSED",
        notes
      }
    });
  }

  async getHistory(userId: string, hotelId: string) {
    return this.prisma.shift.findMany({
      where: { userId, hotelId },
      orderBy: { createdAt: "desc" },
      take: 20
    });
  }
}
