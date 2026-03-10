import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("inventory")
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Request() req: any) {
    const hotelId = req.user.payload.hotel_id;
    return this.inventoryService.findAll(hotelId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.inventoryService.findOne(id);
  }

  @Post()
  create(@Request() req: any, @Body() data: {
    name: string;
    description?: string;
    sku?: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
  }) {
    const hotelId = req.user.payload.hotel_id;
    return this.inventoryService.create(hotelId, data);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: {
    name?: string;
    description?: string;
    sku?: string;
    category?: string;
    quantity?: number;
    minQuantity?: number;
    unit?: string;
  }) {
    return this.inventoryService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.inventoryService.remove(id);
  }
}
