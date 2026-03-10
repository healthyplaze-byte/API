import { PrismaService } from "../prisma/prisma.service";
interface LoginPayload {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prisma;
    private supabase;
    constructor(prisma: PrismaService);
    login(payload: LoginPayload): Promise<{
        session: import("@supabase/supabase-js").AuthSession;
        user: {
            id: string;
            email: string | undefined;
            profile: {
                id: string;
                fullName: string;
                phone: string | null;
                avatarUrl: string | null;
                defaultHotelId: string | null;
                preferredLanguage: string | null;
                preferredTimezone: string | null;
                createdAt: Date;
                updatedAt: Date;
            } | null;
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
        };
        memberships: ({
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
                rolePermissions: {
                    roleId: string;
                    permissionId: string;
                }[];
            } & {
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
        })[];
    }>;
    registerGuest(payload: LoginPayload & {
        fullName: string;
    }): Promise<{
        user: {
            id: string;
            email: string | undefined;
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
            };
        };
    }>;
    updatePassword(userId: string, password: string): Promise<{
        message: string;
    }>;
}
export {};
