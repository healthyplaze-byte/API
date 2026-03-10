import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class ProcurementService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllOrders(hotelId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { hotelId },
      include: {
        supplier: true
      }
    });
  }

  async findOneOrder(id: string) {
    return this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: true
      }
    });
  }

  async createOrder(hotelId: string, data: {
    supplierId: string;
    totalAmount: number;
    notes?: string;
  }) {
    return this.prisma.purchaseOrder.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async updateOrder(id: string, data: {
    status?: OrderStatus;
    notes?: string;
    orderedAt?: Date;
    receivedAt?: Date;
  }) {
    return this.prisma.purchaseOrder.update({
      where: { id },
      data
    });
  }

  // Suppliers
  async findAllSuppliers(hotelId: string) {
    return this.prisma.supplier.findMany({
      where: { hotelId }
    });
  }

  async createSupplier(hotelId: string, data: {
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
  }) {
    return this.prisma.supplier.create({
      data: {
        ...data,
        hotelId
      }
    });
  }
}
