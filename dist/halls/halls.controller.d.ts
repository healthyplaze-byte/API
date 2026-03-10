import { HallsService } from "./halls.service";
export declare class HallsController {
    private readonly hallsService;
    constructor(hallsService: HallsService);
    findPublicHalls(): Promise<{
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
    findAll(req: any): Promise<{
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
    create(req: any, data: any): Promise<{
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
    findMyBookings(req: any): Promise<({
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
    createBooking(req: any, data: any): Promise<{
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
}
