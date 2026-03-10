
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { InvoiceStatus, TransactionType, PaymentMethod } from "@prisma/client";

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllInvoices(hotelId: string) {
    return this.prisma.invoice.findMany({
      where: { hotelId },
      include: {
        reservation: {
          include: {
            guestProfile: true
          }
        },
        payments: true
      }
    });
  }

  async findOneInvoice(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        reservation: true,
        payments: true
      }
    });
  }

  async createInvoice(hotelId: string, data: {
    reservationId: string;
    invoiceNumber: string;
    totalAmount: number;
    taxAmount: number;
    dueDate?: Date;
  }) {
    return this.prisma.invoice.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async createTransaction(hotelId: string, data: {
    invoiceId?: string;
    shiftId?: string;
    amount: number;
    type: TransactionType;
    method: PaymentMethod;
    reference?: string;
    description?: string;
  }) {
    // If payment for invoice, update invoice status
    if (data.invoiceId && data.type === "PAYMENT") {
      await this.prisma.invoice.update({
        where: { id: data.invoiceId },
        data: { status: "PAID" } // Simplified logic
      });
    }

    return this.prisma.financialTransaction.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async getRevenueSummary(hotelId: string) {
    const transactions = await this.prisma.financialTransaction.findMany({
      where: {
        hotelId,
        type: "PAYMENT"
      }
    });

    const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    return {
      totalRevenue,
      count: transactions.length
    };
  }
}
