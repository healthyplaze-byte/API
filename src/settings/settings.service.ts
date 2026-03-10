import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  getSettings(hotelId: string) {
    return this.prisma.hotelSettings.findUnique({
      where: { hotelId }
    });
  }

  updateSettings(hotelId: string, data: any) {
    return this.prisma.hotelSettings.upsert({
      where: { hotelId },
      update: data,
      create: {
        hotelId,
        checkinTime: "14:00",
        checkoutTime: "11:00",
        ...data
      }
    });
  }
}

