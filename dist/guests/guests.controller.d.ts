import { GuestsService } from "./guests.service";
export declare class GuestsController {
    private readonly guestsService;
    constructor(guestsService: GuestsService);
    findAll(): Promise<{
        email: string | null;
        id: string;
        fullName: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        loyaltyPoints: number;
        loyaltyTier: string;
    }[]>;
    findOne(id: string): Promise<{
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
    create(data: {
        userId?: string;
        fullName: string;
        email?: string;
        phone?: string;
    }): Promise<{
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
    update(id: string, data: {
        fullName?: string;
        email?: string;
        phone?: string;
    }): Promise<{
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
    remove(id: string): Promise<{
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
