import { PrismaService } from "../prisma/prisma.service";
export declare class HotelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findForUser(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
