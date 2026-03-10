import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CrmService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllGuests(hotelId: string) {
    // In a multi-hotel setup, guests are linked to reservations in that hotel
    return this.prisma.guestProfile.findMany({
      where: {
        reservations: {
          some: { hotelId }
        }
      },
      include: {
        _count: {
          select: { reservations: true }
        }
      }
    });
  }

  async findGuestFeedback(hotelId: string) {
    return this.prisma.guestFeedback.findMany({
      where: { hotelId },
      include: {
        guest: true,
        reservation: true
      }
    });
  }

  async createFeedback(hotelId: string, data: {
    guestId: string;
    reservationId?: string;
    rating: number;
    comment?: string;
    category?: string;
  }) {
    return this.prisma.guestFeedback.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async updateGuestLoyalty(guestId: string, points: number, tier?: string) {
    return this.prisma.guestProfile.update({
      where: { id: guestId },
      data: {
        loyaltyPoints: { increment: points },
        ...(tier ? { loyaltyTier: tier } : {})
      }
    });
  }
}
