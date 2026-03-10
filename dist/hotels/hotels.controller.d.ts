import { HotelsService } from "./hotels.service";
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    list(req: any): Promise<({
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
        role: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            key: string;
            description: string | null;
            priority: number;
            isAssignableToStaff: boolean;
            isAssignableToGuests: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        hotelId: string;
        roleId: string;
        isActive: boolean;
        invitedEmail: string | null;
        invitedAt: Date | null;
        acceptedAt: Date | null;
        createdBy: string | null;
    })[]>;
}
