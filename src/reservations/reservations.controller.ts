import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, BadRequestException } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ReservationStatus } from "@prisma/client";

@Controller("reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get("my")
  @UseGuards(JwtAuthGuard)
  async findMyReservations(@Request() req: any) {
    const userId = req.user.id;
    // Find the GuestProfile linked to this Supabase user
    return this.reservationsService.findByGuestUser(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.reservationsService.findAll(hotelId);
  }

  @Get("availability")
  checkAvailability(
    @Request() req: any,
    @Query("roomTypeId") roomTypeId: string,
    @Query("checkIn") checkIn: string,
    @Query("checkOut") checkOut: string
  ) {
    const hotelId = req.user.payload.hotel_id;
    return this.reservationsService.checkAvailability(
      hotelId,
      roomTypeId,
      new Date(checkIn),
      new Date(checkOut)
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reservationsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any, @Body() data: {
    roomId: string;
    hotelId: string;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
  }) {
    const hotelId = req.user.payload?.hotel_id || data.hotelId;
    
    // Resolve GuestProfile from logged-in User ID
    const guestProfile = await this.reservationsService.findGuestProfileByUserId(req.user.id);
    const guestProfileId = guestProfile?.id;

    if (!hotelId) {
      throw new BadRequestException("hotelId is required for this operation");
    }
    if (!guestProfileId) {
      throw new BadRequestException("A guest profile is required to create a reservation. Please complete your profile.");
    }

    return this.reservationsService.create(hotelId, {
      ...data,
      guestProfileId,
      checkInDate: new Date(data.checkInDate),
      checkOutDate: new Date(data.checkOutDate)
    });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    roomId?: string;
    guestProfileId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    status?: ReservationStatus;
    totalAmount?: number;
    paidAmount?: number;
  }) {
    return this.reservationsService.update(id, {
      ...data,
      checkInDate: data.checkInDate ? new Date(data.checkInDate) : undefined,
      checkOutDate: data.checkOutDate ? new Date(data.checkOutDate) : undefined
    });
  }

  @Post(":id/pay")
  @UseGuards(JwtAuthGuard)
  pay(@Param("id") id: string) {
    return this.reservationsService.pay(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reservationsService.remove(id);
  }
}
