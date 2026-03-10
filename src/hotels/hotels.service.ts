import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HotelsService {
  constructor(private readonly prisma: PrismaService) {}

  findForUser(userId: string) {
    return this.prisma.hotelUser.findMany({
      where: { userId, isActive: true },
      include: { hotel: true, role: true }
    });
  }
}

