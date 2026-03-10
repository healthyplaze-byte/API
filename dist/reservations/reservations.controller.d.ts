import { ReservationsService } from "./reservations.service";
import { ReservationStatus } from "@prisma/client";
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    findMyReservations(req: any): Promise<({
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
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            hotelId: string;
            roomTypeId: string;
            roomNumber: string;
            floor: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findAll(req: any): Promise<({
        guestProfile: {
            email: string | null;
            id: string;
            fullName: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            loyaltyPoints: number;
            loyaltyTier: string;
        } | null;
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            hotelId: string;
            roomTypeId: string;
            roomNumber: string;
            floor: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    checkAvailability(req: any, roomTypeId: string, checkIn: string, checkOut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }[]>;
    findOne(id: string): Promise<({
        guestProfile: {
            email: string | null;
            id: string;
            fullName: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            loyaltyPoints: number;
            loyaltyTier: string;
        } | null;
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            hotelId: string;
            roomTypeId: string;
            roomNumber: string;
            floor: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    create(req: any, data: {
        roomId: string;
        hotelId: string;
        checkInDate: string;
        checkOutDate: string;
        totalAmount: number;
    }): Promise<{
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
        guestProfile: {
            email: string | null;
            id: string;
            fullName: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            loyaltyPoints: number;
            loyaltyTier: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: string, data: {
        roomId?: string;
        guestProfileId?: string;
        checkInDate?: string;
        checkOutDate?: string;
        status?: ReservationStatus;
        totalAmount?: number;
        paidAmount?: number;
    }): Promise<{
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
        guestProfile: {
            email: string | null;
            id: string;
            fullName: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            loyaltyPoints: number;
            loyaltyTier: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
    pay(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        roomId: string;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
}
