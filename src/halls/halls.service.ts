import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HallsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(hotelId: string) {
    return this.prisma.hall.findMany({
      where: { hotelId }
    });
  }

  async findOne(id: string) {
    return this.prisma.hall.findUnique({
      where: { id }
    });
  }

  async create(hotelId: string, data: {
    name: string;
    description?: string;
    capacity: number;
    basePrice: number;
    image?: string;
  }) {
    return this.prisma.hall.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async createBooking(hotelId: string, data: {
    hallId: string;
    guestProfileId?: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalAmount: number;
  }) {
    return this.prisma.hallBooking.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async findMyBookings(userId: string) {
    const guest = await this.prisma.guestProfile.findFirst({
      where: { userId }
    });
    if (!guest) return [];

    return this.prisma.hallBooking.findMany({
      where: { guestProfileId: guest.id },
      include: { hall: true, hotel: true }
    });
  }
}
