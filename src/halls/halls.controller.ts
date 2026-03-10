import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common";
import { HallsService } from "./halls.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("halls")
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Get("public")
  async findPublicHalls() {
    // For now, return all halls
    return this.hallsService.findAll(undefined as any);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.hallsService.findAll(hotelId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() data: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.hallsService.create(hotelId, data);
  }

  @Get("my-bookings")
  @UseGuards(JwtAuthGuard)
  findMyBookings(@Request() req: any) {
    return this.hallsService.findMyBookings(req.user.id);
  }

  @Post("bookings")
  @UseGuards(JwtAuthGuard)
  createBooking(@Request() req: any, @Body() data: any) {
    const hotelId = req.user.payload?.hotel_id;
    return this.hallsService.createBooking(hotelId, data);
  }
}
