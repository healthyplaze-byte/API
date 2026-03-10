import { Module } from "@nestjs/common";
import { FinanceService } from "./finance.service";
import { FinanceController } from "./finance.controller";
import { ShiftsController } from "./shifts.controller";
import { ShiftsService } from "./shifts.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FinanceController, ShiftsController],
  providers: [FinanceService, ShiftsService],
  exports: [FinanceService, ShiftsService]
})
export class FinanceModule {}
