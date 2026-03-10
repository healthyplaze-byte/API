import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { FinanceService } from "./finance.service";
import { ShiftsService } from "./shifts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { InvoiceStatus, TransactionType, PaymentMethod } from "@prisma/client";

@Controller("finance")
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(
    private readonly financeService: FinanceService,
    private readonly shiftsService: ShiftsService
  ) {}

  @Get("invoices")
  findAllInvoices(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.financeService.findAllInvoices(hotelId);
  }

  @Get("invoices/:id")
  findOneInvoice(@Param("id") id: string) {
    return this.financeService.findOneInvoice(id);
  }

  @Post("invoices")
  createInvoice(@Request() req: any, @Body() data: {
    reservationId: string;
    invoiceNumber: string;
    totalAmount: number;
    taxAmount: number;
    dueDate?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.financeService.createInvoice(hotelId, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    });
  }

  @Post("transactions")
  async createTransaction(@Request() req: any, @Body() data: {
    invoiceId?: string;
    amount: number;
    type: TransactionType;
    method: PaymentMethod;
    reference?: string;
    description?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    const userId = req.user.id;

    // Check for open shift
    const shift = await this.shiftsService.getCurrentShift(userId, hotelId);
    if (!shift) {
      throw new Error("You must have an OPEN SHIFT to process transactions.");
    }

    return this.financeService.createTransaction(hotelId, {
      ...data,
      shiftId: shift.id
    });
  }

  @Get("revenue-summary")
  getRevenueSummary(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.financeService.getRevenueSummary(hotelId);
  }
}
