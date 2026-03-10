import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { ProcurementService } from "./procurement.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { OrderStatus } from "@prisma/client";

@Controller("procurement")
@UseGuards(JwtAuthGuard)
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Get("orders")
  findAllOrders(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.procurementService.findAllOrders(hotelId);
  }

  @Get("orders/:id")
  findOneOrder(@Param("id") id: string) {
    return this.procurementService.findOneOrder(id);
  }

  @Post("orders")
  createOrder(@Request() req: any, @Body() data: {
    supplierId: string;
    totalAmount: number;
    notes?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.procurementService.createOrder(hotelId, data);
  }

  @Patch("orders/:id")
  updateOrder(@Param("id") id: string, @Body() data: {
    status?: OrderStatus;
    notes?: string;
    orderedAt?: string;
    receivedAt?: string;
  }) {
    return this.procurementService.updateOrder(id, {
      ...data,
      orderedAt: data.orderedAt ? new Date(data.orderedAt) : undefined,
      receivedAt: data.receivedAt ? new Date(data.receivedAt) : undefined
    });
  }

  @Get("suppliers")
  findAllSuppliers(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.procurementService.findAllSuppliers(hotelId);
  }

  @Post("suppliers")
  createSupplier(@Request() req: any, @Body() data: {
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.procurementService.createSupplier(hotelId, data);
  }
}
