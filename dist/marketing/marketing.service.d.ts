import { PrismaService } from "../prisma/prisma.service";
import { CampaignType, CampaignStatus } from "@prisma/client";
export declare class MarketingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllCampaigns(hotelId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.CampaignStatus;
        type: import(".prisma/client").$Enums.CampaignType;
        subject: string | null;
        content: string | null;
        targetTier: string | null;
        scheduledAt: Date | null;
        sentAt: Date | null;
    }[]>;
    createCampaign(hotelId: string, data: {
        name: string;
        type: CampaignType;
        subject?: string;
        content?: string;
        targetTier?: string;
        scheduledAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.CampaignStatus;
        type: import(".prisma/client").$Enums.CampaignType;
        subject: string | null;
        content: string | null;
        targetTier: string | null;
        scheduledAt: Date | null;
        sentAt: Date | null;
    }>;
    updateCampaign(id: string, data: {
        status?: CampaignStatus;
        sentAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hotelId: string;
        status: import(".prisma/client").$Enums.CampaignStatus;
        type: import(".prisma/client").$Enums.CampaignType;
        subject: string | null;
        content: string | null;
        targetTier: string | null;
        scheduledAt: Date | null;
        sentAt: Date | null;
    }>;
}
