import { AuthService } from "./auth.service";
declare class LoginDto {
    email: string;
    password: string;
}
declare class RegisterGuestDto extends LoginDto {
    fullName: string;
}
declare class UpdatePasswordDto {
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        session: import("@supabase/auth-js").Session;
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
    register(body: RegisterGuestDto): Promise<{
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
    updatePassword(req: any, body: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
export {};
