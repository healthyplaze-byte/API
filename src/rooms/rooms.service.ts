import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RoomStatus } from "@prisma/client";

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(hotelId: string) {
    return this.prisma.room.findMany({
      where: { hotelId },
      include: {
        roomType: true
      }
    });
  }

  async findAllAvailable(from?: string, to?: string) {
    console.log(`[RoomsService] Checking availability for range: ${from} to ${to}`);
    const where: any = {
      status: RoomStatus.AVAILABLE
    };

    if (from && to) {
      // Find all room IDs that are already booked for these dates
      const startDate = new Date(from);
      const endDate = new Date(to);

      const overlappingReservations = await this.prisma.reservation.findMany({
        where: {
          OR: [
            {
              AND: [
                { checkInDate: { lte: startDate } },
                { checkOutDate: { gte: startDate } }
              ]
            },
            {
              AND: [
                { checkInDate: { lte: endDate } },
                { checkOutDate: { gte: endDate } }
              ]
            },
            {
              AND: [
                { checkInDate: { gte: startDate } },
                { checkOutDate: { lte: endDate } }
              ]
            }
          ]
        },
        select: { roomId: true }
      });

      const bookedRoomIds = overlappingReservations.map(r => r.roomId);
      if (bookedRoomIds.length > 0) {
        where.id = { notIn: bookedRoomIds };
      }
    }

    const rooms = await this.prisma.room.findMany({
      where,
      include: {
        roomType: true,
        hotel: true
      },
      orderBy: {
        roomType: {
          basePrice: "asc"
        }
      }
    });

    console.log(`[RoomsService] Found ${rooms.length} available rooms for range ${from} - ${to}`);
    return rooms;
  }

  async findGroupedAvailability(from?: string, to?: string) {
    const rooms = await this.findAllAvailable(from, to);
    
    // Group by Room Type
    const grouped = rooms.reduce((acc, room) => {
      const typeId = room.roomTypeId;
      if (!acc[typeId]) {
        acc[typeId] = {
          roomType: room.roomType,
          rooms: []
        };
      }
      acc[typeId].rooms.push(room);
      return acc;
    }, {} as Record<string, { roomType: any; rooms: any[] }>);

    return Object.values(grouped);
  }

  async findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        roomType: true
      }
    });
  }

  async create(hotelId: string, data: {
    roomTypeId: string;
    roomNumber: string;
    floor?: string;
  }) {
    return this.prisma.room.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async update(id: string, data: {
    roomTypeId?: string;
    roomNumber?: string;
    floor?: string;
    status?: RoomStatus;
  }) {
    return this.prisma.room.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.room.delete({
      where: { id }
    });
  }

  // Room Types
  async findAllRoomTypes(hotelId: string) {
    return this.prisma.roomType.findMany({
      where: { hotelId }
    });
  }

  async createRoomType(hotelId: string, data: {
    name: string;
    description?: string;
    basePrice: number;
    capacity: number;
  }) {
    return this.prisma.roomType.create({
      data: {
        ...data,
        hotelId
      }
    });
  }
}
