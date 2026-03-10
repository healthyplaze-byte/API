import { PrismaService } from "../prisma/prisma.service";
import { RoomStatus } from "@prisma/client";
export declare class RoomsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(hotelId: string): Promise<({
        roomType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            description: string | null;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            capacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    })[]>;
    findAllAvailable(from?: string, to?: string): Promise<({
        hotel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            code: string;
            timezone: string;
            currency: string;
        };
        roomType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            description: string | null;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            capacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    })[]>;
    findGroupedAvailability(from?: string, to?: string): Promise<{
        roomType: any;
        rooms: any[];
    }[]>;
    findOne(id: string): Promise<({
        roomType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            description: string | null;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            capacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }) | null>;
    create(hotelId: string, data: {
        roomTypeId: string;
        roomNumber: string;
        floor?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }>;
    update(id: string, data: {
        roomTypeId?: string;
        roomNumber?: string;
        floor?: string;
        status?: RoomStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }>;
    findAllRoomTypes(hotelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        capacity: number;
    }[]>;
    createRoomType(hotelId: string, data: {
        name: string;
        description?: string;
        basePrice: number;
        capacity: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        capacity: number;
    }>;
}
