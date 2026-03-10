import { PrismaService } from "../prisma/prisma.service";
import { ReservationStatus } from "@prisma/client";
import { AutomationService } from "../automation/automation.service";
export declare class ReservationsService {
    private readonly prisma;
    private readonly automation;
    constructor(prisma: PrismaService, automation: AutomationService);
    findAll(hotelId: string): Promise<({
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
    findByGuestUser(userId: string): Promise<({
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
    findGuestProfileByUserId(userId: string): Promise<{
        email: string | null;
        id: string;
        fullName: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        loyaltyPoints: number;
        loyaltyTier: string;
    } | null>;
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
    create(hotelId: string, data: {
        roomId: string;
        guestProfileId?: string;
        checkInDate: Date;
        checkOutDate: Date;
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
        checkInDate?: Date;
        checkOutDate?: Date;
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
    checkAvailability(hotelId: string, roomTypeId: string, checkIn: Date, checkOut: Date): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        roomTypeId: string;
        roomNumber: string;
        floor: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
    }[]>;
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
}
