import { PrismaService } from "../prisma/prisma.service";
export declare class ShiftsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCurrentShift(userId: string, hotelId: string): Promise<({
        transactions: {
            id: string;
            createdAt: Date;
            hotelId: string;
            description: string | null;
            method: import(".prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client/runtime/library").Decimal;
            type: import(".prisma/client").$Enums.TransactionType;
            reference: string | null;
            transactionAt: Date;
            invoiceId: string | null;
            shiftId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
    }) | null>;
    openShift(userId: string, hotelId: string, startCash: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    closeShift(userId: string, hotelId: string, endCash: number, notes?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    getHistory(userId: string, hotelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
}
