import { Controller, Get, UseGuards, Request, Query } from "@nestjs/common";
import { ReportingService } from "./reporting.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("reporting")
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get("occupancy")
  getOccupancyReport(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.reportingService.getOccupancyReport(hotelId);
  }

  @Get("revenue")
  getRevenueReport(
    @Request() req: any,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    const hotelId = req.user.payload.hotel_id;
    return this.reportingService.getRevenueReport(
      hotelId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }

  @Get("maintenance")
  getMaintenanceSummary(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.reportingService.getMaintenanceSummary(hotelId);
  }
}
