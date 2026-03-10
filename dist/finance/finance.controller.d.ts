import { FinanceService } from "./finance.service";
import { ShiftsService } from "./shifts.service";
import { TransactionType, PaymentMethod } from "@prisma/client";
export declare class FinanceController {
    private readonly financeService;
    private readonly shiftsService;
    constructor(financeService: FinanceService, shiftsService: ShiftsService);
    findAllInvoices(req: any): Promise<({
        reservation: {
            guestProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                fullName: string;
                email: string | null;
                phone: string | null;
                loyaltyPoints: number;
                loyaltyTier: string;
            } | null;
        } & {
            id: string;
            hotelId: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.ReservationStatus;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            guestProfileId: string | null;
            checkInDate: Date;
            checkOutDate: Date;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        };
        payments: {
            id: string;
            hotelId: string;
            createdAt: Date;
            invoiceId: string | null;
            shiftId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            type: import(".prisma/client").$Enums.TransactionType;
            method: import(".prisma/client").$Enums.PaymentMethod;
            reference: string | null;
            description: string | null;
            transactionAt: Date;
        }[];
    } & {
        id: string;
        hotelId: string;
        reservationId: string;
        invoiceNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        dueDate: Date | null;
        issuedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOneInvoice(id: string): Promise<({
        reservation: {
            id: string;
            hotelId: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.ReservationStatus;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            guestProfileId: string | null;
            checkInDate: Date;
            checkOutDate: Date;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        };
        payments: {
            id: string;
            hotelId: string;
            createdAt: Date;
            invoiceId: string | null;
            shiftId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            type: import(".prisma/client").$Enums.TransactionType;
            method: import(".prisma/client").$Enums.PaymentMethod;
            reference: string | null;
            description: string | null;
            transactionAt: Date;
        }[];
    } & {
        id: string;
        hotelId: string;
        reservationId: string;
        invoiceNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        dueDate: Date | null;
        issuedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    createInvoice(req: any, data: {
        reservationId: string;
        invoiceNumber: string;
        totalAmount: number;
        taxAmount: number;
        dueDate?: string;
    }): Promise<{
        id: string;
        hotelId: string;
        reservationId: string;
        invoiceNumber: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        dueDate: Date | null;
        issuedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createTransaction(req: any, data: {
        invoiceId?: string;
        amount: number;
        type: TransactionType;
        method: PaymentMethod;
        reference?: string;
        description?: string;
    }): Promise<{
        id: string;
        hotelId: string;
        createdAt: Date;
        invoiceId: string | null;
        shiftId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        type: import(".prisma/client").$Enums.TransactionType;
        method: import(".prisma/client").$Enums.PaymentMethod;
        reference: string | null;
        description: string | null;
        transactionAt: Date;
    }>;
    getRevenueSummary(req: any): Promise<{
        totalRevenue: number;
        count: number;
    }>;
}
