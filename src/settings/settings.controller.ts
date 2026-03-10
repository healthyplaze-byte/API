import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("hotels/:hotelId/settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getSettings(@Param("hotelId") hotelId: string) {
    return this.settingsService.getSettings(hotelId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateSettings(
    @Param("hotelId") hotelId: string,
    @Body() body: Record<string, unknown>
  ) {
    return this.settingsService.updateSettings(hotelId, body);
  }
}

