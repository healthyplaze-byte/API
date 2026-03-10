import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(hotelId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { hotelId }
    });
  }

  async findOne(id: string) {
    return this.prisma.inventoryItem.findUnique({
      where: { id }
    });
  }

  async create(hotelId: string, data: {
    name: string;
    description?: string;
    sku?: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
  }) {
    return this.prisma.inventoryItem.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    sku?: string;
    category?: string;
    quantity?: number;
    minQuantity?: number;
    unit?: string;
  }) {
    return this.prisma.inventoryItem.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.inventoryItem.delete({
      where: { id }
    });
  }
}
