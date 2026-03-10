import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  listLogs(hotelId: string) {
    return this.prisma.auditLog.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }
}

