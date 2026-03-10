import { MarketingService } from "./marketing.service";
import { CampaignType, CampaignStatus } from "@prisma/client";
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    findAllCampaigns(req: any): Promise<{
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
    createCampaign(req: any, data: {
        name: string;
        type: CampaignType;
        subject?: string;
        content?: string;
        targetTier?: string;
        scheduledAt?: string;
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
        sentAt?: string;
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
