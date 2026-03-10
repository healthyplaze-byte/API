
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReservationStatus } from "@prisma/client";
import { AutomationService } from "../automation/automation.service";

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService
  ) {}

  async findAll(hotelId: string) {
    return this.prisma.reservation.findMany({
      where: { hotelId },
      include: {
        room: true,
        guestProfile: true
      }
    });
  }

  async findByGuestUser(userId: string) {
    // First, find the GuestProfile linked to this userId
    const guestProfile = await this.prisma.guestProfile.findFirst({
      where: { userId }
    });

    if (!guestProfile) return [];

    return this.prisma.reservation.findMany({
      where: { guestProfileId: guestProfile.id },
      include: {
        room: true,
        hotel: true
      }
    });
  }

  async findGuestProfileByUserId(userId: string) {
    return this.prisma.guestProfile.findFirst({
      where: { userId }
    });
  }

  async findOne(id: string) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        room: true,
        guestProfile: true
      }
    });
  }

  async create(hotelId: string, data: {
    roomId: string;
    guestProfileId?: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalAmount: number;
  }) {
    const reservation = await this.prisma.reservation.create({
      data: {
        ...data,
        hotelId
      },
      include: {
        guestProfile: true,
        hotel: true
      }
    });

    // Automate welcome communication
    if (reservation.guestProfile?.email) {
      await this.automation.sendEmail(
        reservation.guestProfile.email,
        `Booking Confirmed at ${reservation.hotel.name}`,
        `<h1>Welcome ${reservation.guestProfile.fullName}</h1><p>Your reservation is confirmed for ${reservation.checkInDate}.</p>`
      );
    }

    if (reservation.guestProfile?.phone) {
      await this.automation.sendWhatsApp(
        reservation.guestProfile.phone,
        `Hi ${reservation.guestProfile.fullName}, your booking at ${reservation.hotel.name} is confirmed!`
      );
    }

    return reservation;
  }

  async update(id: string, data: {
    roomId?: string;
    guestProfileId?: string;
    checkInDate?: Date;
    checkOutDate?: Date;
    status?: ReservationStatus;
    totalAmount?: number;
    paidAmount?: number;
  }) {
    const reservation = await this.prisma.reservation.update({
      where: { id },
      data,
      include: { guestProfile: true, hotel: true }
    });

    if (data.status === "CHECKED_IN") {
      await this.automation.sendWhatsApp(
        reservation.guestProfile?.phone || "",
        `Welcome to ${reservation.hotel.name}! Your check-in is complete. Enjoy your stay!`
      );
    }

    return reservation;
  }

  async remove(id: string) {
    return this.prisma.reservation.delete({
      where: { id }
    });
  }

  // Check availability
  async checkAvailability(hotelId: string, roomTypeId: string, checkIn: Date, checkOut: Date) {
    // Find all rooms of this type
    const rooms = await this.prisma.room.findMany({
      where: { hotelId, roomTypeId }
    });

    const roomIds = rooms.map(r => r.id);

    // Find reservations that overlap with these dates
    const conflictingReservations = await this.prisma.reservation.findMany({
      where: {
        roomId: { in: roomIds },
        status: { notIn: ["CANCELLED"] },
        OR: [
          {
            checkInDate: { lte: checkIn },
            checkOutDate: { gt: checkIn }
          },
          {
            checkInDate: { lt: checkOut },
            checkOutDate: { gte: checkOut }
          }
        ]
      }
    });

    const bookedRoomIds = conflictingReservations.map(res => res.roomId);
    const availableRooms = rooms.filter(room => !bookedRoomIds.includes(room.id));

    return availableRooms;
  }

  async pay(id: string) {
    const reservation = await this.prisma.reservation.findUnique({ 
      where: { id },
      include: { hotel: true, guestProfile: true }
    });
    
    if (!reservation) throw new Error("Reservation not found");

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        // Assuming paidAmount exists in schema, otherwise we just use status
        // paidAmount: reservation.totalAmount 
      }
    });

    // Send confirmation
    if (reservation.guestProfile?.email) {
      await this.automation.sendEmail(
        reservation.guestProfile.email,
        "Payment Successful",
        `<p>Thank you for your payment of $${reservation.totalAmount}. Your booking is confirmed.</p>`
      );
    }

    return updated;
  }
}
