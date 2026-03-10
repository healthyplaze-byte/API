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
exports.HallsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HallsService = class HallsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hotelId) {
        return this.prisma.hall.findMany({
            where: { hotelId }
        });
    }
    async findOne(id) {
        return this.prisma.hall.findUnique({
            where: { id }
        });
    }
    async create(hotelId, data) {
        return this.prisma.hall.create({
            data: {
                ...data,
                hotelId
            }
        });
    }
    async createBooking(hotelId, data) {
        return this.prisma.hallBooking.create({
            data: {
                ...data,
                hotelId
            }
        });
    }
    async findMyBookings(userId) {
        const guest = await this.prisma.guestProfile.findFirst({
            where: { userId }
        });
        if (!guest)
            return [];
        return this.prisma.hallBooking.findMany({
            where: { guestProfileId: guest.id },
            include: { hall: true, hotel: true }
        });
    }
};
exports.HallsService = HallsService;
exports.HallsService = HallsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HallsService);
//# sourceMappingURL=halls.service.js.map