import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { HotelsService } from "./hotels.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Req() req: any) {
    const userId = req.user?.id;
    if (!userId) {
      return [];
    }
    return this.hotelsService.findForUser(userId);
  }
}

