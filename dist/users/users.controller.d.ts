import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listForHotel(hotelId: string): Promise<({
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
    inviteStaff(body: {
        hotelId: string;
        email: string;
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
    createStaff(body: {
        hotelId: string;
        email: string;
        fullName: string;
        roleKey: string;
        password?: string;
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
    updateRole(id: string, body: {
        roleKey: string;
        hotelId: string;
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
    removeStaff(id: string, body: {
        hotelId: string;
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
}
