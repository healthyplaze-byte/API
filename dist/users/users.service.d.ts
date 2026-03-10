import { PrismaService } from "../prisma/prisma.service";
export declare class UsersService {
    private readonly prisma;
    private supabase;
    constructor(prisma: PrismaService);
    findStaffByHotel(hotelId: string): Promise<({
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
    inviteStaff(hotelId: string, email: string, roleKey: string): Promise<{
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
    }>;
    createStaff(hotelId: string, data: {
        email: string;
        password?: string;
        fullName: string;
        roleKey: string;
    }): Promise<{
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
    }>;
    updateStaffRole(hotelUserId: string, roleKey: string): Promise<{
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
    }>;
    removeStaff(hotelUserId: string): Promise<{
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
    }>;
}
