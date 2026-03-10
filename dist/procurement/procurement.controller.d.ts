import { ProcurementService } from "./procurement.service";
import { OrderStatus } from "@prisma/client";
export declare class ProcurementController {
    private readonly procurementService;
    constructor(procurementService: ProcurementService);
    findAllOrders(req: any): Promise<({
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
    createOrder(req: any, data: {
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
        orderedAt?: string;
        receivedAt?: string;
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
    findAllSuppliers(req: any): Promise<{
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
    createSupplier(req: any, data: {
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
