import { ShiftsService } from "./shifts.service";
export declare class ShiftsController {
    private readonly shiftsService;
    constructor(shiftsService: ShiftsService);
    getCurrentShift(req: any): Promise<({
        transactions: {
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
        userId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    openShift(req: any, startCash: number): Promise<{
        id: string;
        hotelId: string;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    closeShift(req: any, body: {
        endCash: number;
        notes?: string;
    }): Promise<{
        id: string;
        hotelId: string;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getHistory(req: any): Promise<{
        id: string;
        hotelId: string;
        userId: string;
        startTime: Date;
        endTime: Date | null;
        startCash: import("@prisma/client/runtime/library").Decimal;
        endCash: import("@prisma/client/runtime/library").Decimal | null;
        systemCash: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
