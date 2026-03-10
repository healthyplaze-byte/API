import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuditService } from "./audit.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("audit-logs")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(":hotelId")
  @UseGuards(JwtAuthGuard)
  list(@Param("hotelId") hotelId: string) {
    return this.auditService.listLogs(hotelId);
  }
}

