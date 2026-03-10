import { PrismaService } from "../prisma/prisma.service";
export declare class HallsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(hotelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        basePrice: number;
        capacity: number;
        image: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        basePrice: number;
        capacity: number;
        image: string | null;
    } | null>;
    create(hotelId: string, data: {
        name: string;
        description?: string;
        capacity: number;
        basePrice: number;
        image?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        description: string | null;
        basePrice: number;
        capacity: number;
        image: string | null;
    }>;
    createBooking(hotelId: string, data: {
        hallId: string;
        guestProfileId?: string;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: number;
        hallId: string;
    }>;
    findMyBookings(userId: string): Promise<({
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
        hall: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            hotelId: string;
            description: string | null;
            basePrice: number;
            capacity: number;
            image: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        status: import(".prisma/client").$Enums.ReservationStatus;
        guestProfileId: string | null;
        checkInDate: Date;
        checkOutDate: Date;
        totalAmount: number;
        hallId: string;
    })[]>;
}
