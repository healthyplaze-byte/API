import { RoomsService } from "./rooms.service";
import { RoomStatus } from "@prisma/client";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findPublicRooms(from?: string, to?: string): Promise<({
        hotel: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            timezone: string;
            currency: string;
            isActive: boolean;
        };
        roomType: {
            id: string;
            hotelId: string;
            createdAt: Date;
            updatedAt: Date;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            name: string;
            description: string | null;
            capacity: number;
        };
    } & {
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAvailability(from?: string, to?: string): Promise<{
        roomType: any;
        rooms: any[];
    }[]>;
    findAllRoomTypes(req: any): Promise<{
        id: string;
        hotelId: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        name: string;
        description: string | null;
        capacity: number;
    }[]>;
    findAll(req: any): Promise<({
        roomType: {
            id: string;
            hotelId: string;
            createdAt: Date;
            updatedAt: Date;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            name: string;
            description: string | null;
            capacity: number;
        };
    } & {
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        roomType: {
            id: string;
            hotelId: string;
            createdAt: Date;
            updatedAt: Date;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            name: string;
            description: string | null;
            capacity: number;
        };
    } & {
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    create(req: any, data: {
        roomTypeId: string;
        roomNumber: string;
        floor?: string;
    }): Promise<{
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: {
        roomTypeId?: string;
        roomNumber?: string;
        floor?: string;
        status?: RoomStatus;
    }): Promise<{
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createRoomType(req: any, data: {
        name: string;
        description?: string;
        basePrice: number;
        capacity: number;
    }): Promise<{
        id: string;
        hotelId: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        name: string;
        description: string | null;
        capacity: number;
    }>;
}
