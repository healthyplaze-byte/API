import { PrismaService } from "../prisma/prisma.service";
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(hotelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        category: string;
        sku: string | null;
        quantity: number;
        minQuantity: number;
        unit: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        category: string;
        sku: string | null;
        quantity: number;
        minQuantity: number;
        unit: string;
    } | null>;
    create(hotelId: string, data: {
        name: string;
        description?: string;
        sku?: string;
        category: string;
        quantity: number;
        minQuantity: number;
        unit: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        category: string;
        sku: string | null;
        quantity: number;
        minQuantity: number;
        unit: string;
    }>;
    update(id: string, data: {
        name?: string;
        description?: string;
        sku?: string;
        category?: string;
        quantity?: number;
        minQuantity?: number;
        unit?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        category: string;
        sku: string | null;
        quantity: number;
        minQuantity: number;
        unit: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        category: string;
        sku: string | null;
        quantity: number;
        minQuantity: number;
        unit: string;
    }>;
}
