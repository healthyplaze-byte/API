
import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ShiftsService } from "./shifts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("shifts")
@UseGuards(JwtAuthGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get("current")
  getCurrentShift(@Request() req: any) {
    return this.shiftsService.getCurrentShift(req.user.id, req.user.hotelId);
  }

  @Post("open")
  openShift(@Request() req: any, @Body("startCash") startCash: number) {
    return this.shiftsService.openShift(req.user.id, req.user.hotelId, startCash);
  }

  @Post("close")
  closeShift(@Request() req: any, @Body() body: { endCash: number; notes?: string }) {
    return this.shiftsService.closeShift(req.user.id, req.user.hotelId, body.endCash, body.notes);
  }

  @Get("history")
  getHistory(@Request() req: any) {
    return this.shiftsService.getHistory(req.user.id, req.user.hotelId);
  }
}
