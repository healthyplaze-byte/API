import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from "@nestjs/common";
import { MarketingService } from "./marketing.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CampaignType, CampaignStatus } from "@prisma/client";

@Controller("marketing")
@UseGuards(JwtAuthGuard)
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get("campaigns")
  findAllCampaigns(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.marketingService.findAllCampaigns(hotelId);
  }

  @Post("campaigns")
  createCampaign(@Request() req: any, @Body() data: {
    name: string;
    type: CampaignType;
    subject?: string;
    content?: string;
    targetTier?: string;
    scheduledAt?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.marketingService.createCampaign(hotelId, {
      ...data,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined
    });
  }

  @Patch("campaigns/:id")
  updateCampaign(@Param("id") id: string, @Body() data: {
    status?: CampaignStatus;
    sentAt?: string;
  }) {
    return this.marketingService.updateCampaign(id, {
      ...data,
      sentAt: data.sentAt ? new Date(data.sentAt) : undefined
    });
  }
}
