import { PrismaService } from "../prisma/prisma.service";
export declare class CrmService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllGuests(hotelId: string): Promise<({
        _count: {
            reservations: number;
        };
    } & {
        email: string | null;
        id: string;
        fullName: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        loyaltyPoints: number;
        loyaltyTier: string;
    })[]>;
    findGuestFeedback(hotelId: string): Promise<({
        reservation: {
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
        } | null;
        guest: {
            email: string | null;
            id: string;
            fullName: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            loyaltyPoints: number;
            loyaltyTier: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        category: string | null;
        reservationId: string | null;
        guestId: string;
        rating: number;
        comment: string | null;
        isResolved: boolean;
    })[]>;
    createFeedback(hotelId: string, data: {
        guestId: string;
        reservationId?: string;
        rating: number;
        comment?: string;
        category?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        category: string | null;
        reservationId: string | null;
        guestId: string;
        rating: number;
        comment: string | null;
        isResolved: boolean;
    }>;
    updateGuestLoyalty(guestId: string, points: number, tier?: string): Promise<{
        email: string | null;
        id: string;
        fullName: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        loyaltyPoints: number;
        loyaltyTier: string;
    }>;
}
