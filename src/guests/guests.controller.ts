import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("guests")
@UseGuards(JwtAuthGuard)
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get()
  findAll() {
    return this.guestsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.guestsService.findOne(id);
  }

  @Post()
  create(@Body() data: {
    userId?: string;
    fullName: string;
    email?: string;
    phone?: string;
  }) {
    return this.guestsService.create(data);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    fullName?: string;
    email?: string;
    phone?: string;
  }) {
    return this.guestsService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.guestsService.remove(id);
  }
}
