import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.guestProfile.findMany();
  }

  async findOne(id: string) {
    return this.prisma.guestProfile.findUnique({
      where: { id }
    });
  }

  async create(data: {
    userId?: string;
    fullName: string;
    email?: string;
    phone?: string;
  }) {
    return this.prisma.guestProfile.create({
      data
    });
  }

  async update(id: string, data: {
    fullName?: string;
    email?: string;
    phone?: string;
  }) {
    return this.prisma.guestProfile.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.guestProfile.delete({
      where: { id }
    });
  }
}
