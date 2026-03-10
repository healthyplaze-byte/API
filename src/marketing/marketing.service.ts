import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CampaignType, CampaignStatus } from "@prisma/client";

@Injectable()
export class MarketingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCampaigns(hotelId: string) {
    return this.prisma.marketingCampaign.findMany({
      where: { hotelId }
    });
  }

  async createCampaign(hotelId: string, data: {
    name: string;
    type: CampaignType;
    subject?: string;
    content?: string;
    targetTier?: string;
    scheduledAt?: Date;
  }) {
    return this.prisma.marketingCampaign.create({
      data: {
        ...data,
        hotelId
      }
    });
  }

  async updateCampaign(id: string, data: {
    status?: CampaignStatus;
    sentAt?: Date;
  }) {
    return this.prisma.marketingCampaign.update({
      where: { id },
      data
    });
  }
}
