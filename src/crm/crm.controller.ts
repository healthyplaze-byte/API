import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from "@nestjs/common";
import { CrmService } from "./crm.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("crm")
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get("guests")
  findAllGuests(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.crmService.findAllGuests(hotelId);
  }

  @Get("feedback")
  findFeedback(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.crmService.findGuestFeedback(hotelId);
  }

  @Post("feedback")
  createFeedback(@Request() req: any, @Body() data: {
    guestId: string;
    reservationId?: string;
    rating: number;
    comment?: string;
    category?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.crmService.createFeedback(hotelId, data);
  }

  @Patch("guests/:id/loyalty")
  updateLoyalty(@Param("id") id: string, @Body() data: {
    points: number;
    tier?: string;
  }) {
    return this.crmService.updateGuestLoyalty(id, data.points, data.tier);
  }
}
