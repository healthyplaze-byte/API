import { Module } from "@nestjs/common";
import { HallsService } from "./halls.service";
import { HallsController } from "./halls.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HallsController],
  providers: [HallsService],
  exports: [HallsService]
})
export class HallsModule {}
