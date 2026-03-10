"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RoomsService = class RoomsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hotelId) {
        return this.prisma.room.findMany({
            where: { hotelId },
            include: {
                roomType: true
            }
        });
    }
    async findAllAvailable(from, to) {
        console.log(`[RoomsService] Checking availability for range: ${from} to ${to}`);
        const where = {
            status: client_1.RoomStatus.AVAILABLE
        };
        if (from && to) {
            const startDate = new Date(from);
            const endDate = new Date(to);
            const overlappingReservations = await this.prisma.reservation.findMany({
                where: {
                    OR: [
                        {
                            AND: [
                                { checkInDate: { lte: startDate } },
                                { checkOutDate: { gte: startDate } }
                            ]
                        },
                        {
                            AND: [
                                { checkInDate: { lte: endDate } },
                                { checkOutDate: { gte: endDate } }
                            ]
                        },
                        {
                            AND: [
                                { checkInDate: { gte: startDate } },
                                { checkOutDate: { lte: endDate } }
                            ]
                        }
                    ]
                },
                select: { roomId: true }
            });
            const bookedRoomIds = overlappingReservations.map(r => r.roomId);
            if (bookedRoomIds.length > 0) {
                where.id = { notIn: bookedRoomIds };
            }
        }
        const rooms = await this.prisma.room.findMany({
            where,
            include: {
                roomType: true,
                hotel: true
            },
            orderBy: {
                roomType: {
                    basePrice: "asc"
                }
            }
        });
        console.log(`[RoomsService] Found ${rooms.length} available rooms for range ${from} - ${to}`);
        return rooms;
    }
    async findGroupedAvailability(from, to) {
        const rooms = await this.findAllAvailable(from, to);
        const grouped = rooms.reduce((acc, room) => {
            const typeId = room.roomTypeId;
            if (!acc[typeId]) {
                acc[typeId] = {
                    roomType: room.roomType,
                    rooms: []
                };
            }
            acc[typeId].rooms.push(room);
            return acc;
        }, {});
        return Object.values(grouped);
    }
    async findOne(id) {
        return this.prisma.room.findUnique({
            where: { id },
            include: {
                roomType: true
            }
        });
    }
    async create(hotelId, data) {
        return this.prisma.room.create({
            data: {
                ...data,
                hotelId
            }
        });
    }
    async update(id, data) {
        return this.prisma.room.update({
            where: { id },
            data
        });
    }
    async remove(id) {
        return this.prisma.room.delete({
            where: { id }
        });
    }
    async findAllRoomTypes(hotelId) {
        return this.prisma.roomType.findMany({
            where: { hotelId }
        });
    }
    async createRoomType(hotelId, data) {
        return this.prisma.roomType.create({
            data: {
                ...data,
                hotelId
            }
        });
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map