import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus } from "@prisma/client";
export declare class ProcurementService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllOrders(hotelId: string): Promise<({
        supplier: {
            email: string | null;
            id: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            contactName: string | null;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        supplierId: string;
        orderedAt: Date | null;
        receivedAt: Date | null;
    })[]>;
    findOneOrder(id: string): Promise<({
        supplier: {
            email: string | null;
            id: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            contactName: string | null;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        supplierId: string;
        orderedAt: Date | null;
        receivedAt: Date | null;
    }) | null>;
    createOrder(hotelId: string, data: {
        supplierId: string;
        totalAmount: number;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        supplierId: string;
        orderedAt: Date | null;
        receivedAt: Date | null;
    }>;
    updateOrder(id: string, data: {
        status?: OrderStatus;
        notes?: string;
        orderedAt?: Date;
        receivedAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
        supplierId: string;
        orderedAt: Date | null;
        receivedAt: Date | null;
    }>;
    findAllSuppliers(hotelId: string): Promise<{
        email: string | null;
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        contactName: string | null;
        address: string | null;
    }[]>;
    createSupplier(hotelId: string, data: {
        name: string;
        contactName?: string;
        email?: string;
        phone?: string;
        address?: string;
    }): Promise<{
        email: string | null;
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        contactName: string | null;
        address: string | null;
    }>;
}
