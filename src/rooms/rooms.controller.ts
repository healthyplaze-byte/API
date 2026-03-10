import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RoomStatus } from "@prisma/client";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get("public")
  async findPublicRooms(
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.roomsService.findAllAvailable(from, to);
  }

  @Get("availability")
  async findAvailability(
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.roomsService.findGroupedAvailability(from, to);
  }

  @Get("room-types")
  @UseGuards(JwtAuthGuard)
  findAllRoomTypes(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.roomsService.findAllRoomTypes(hotelId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.roomsService.findAll(hotelId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Post()
  create(@Request() req: any, @Body() data: {
    roomTypeId: string;
    roomNumber: string;
    floor?: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.roomsService.create(hotelId, data);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    roomTypeId?: string;
    roomNumber?: string;
    floor?: string;
    status?: RoomStatus;
  }) {
    return this.roomsService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(id);
  }

  @Post("room-types")
  @UseGuards(JwtAuthGuard)
  createRoomType(@Request() req: any, @Body() data: {
    name: string;
    description?: string;
    basePrice: number;
    capacity: number;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.roomsService.createRoomType(hotelId, data);
  }
}
