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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const automation_service_1 = require("../automation/automation.service");
let ReservationsService = class ReservationsService {
    constructor(prisma, automation) {
        this.prisma = prisma;
        this.automation = automation;
    }
    async findAll(hotelId) {
        return this.prisma.reservation.findMany({
            where: { hotelId },
            include: {
                room: true,
                guestProfile: true
            }
        });
    }
    async findByGuestUser(userId) {
        const guestProfile = await this.prisma.guestProfile.findFirst({
            where: { userId }
        });
        if (!guestProfile)
            return [];
        return this.prisma.reservation.findMany({
            where: { guestProfileId: guestProfile.id },
            include: {
                room: true,
                hotel: true
            }
        });
    }
    async findGuestProfileByUserId(userId) {
        return this.prisma.guestProfile.findFirst({
            where: { userId }
        });
    }
    async findOne(id) {
        return this.prisma.reservation.findUnique({
            where: { id },
            include: {
                room: true,
                guestProfile: true
            }
        });
    }
    async create(hotelId, data) {
        var _a, _b;
        const reservation = await this.prisma.reservation.create({
            data: {
                ...data,
                hotelId
            },
            include: {
                guestProfile: true,
                hotel: true
            }
        });
        if ((_a = reservation.guestProfile) === null || _a === void 0 ? void 0 : _a.email) {
            await this.automation.sendEmail(reservation.guestProfile.email, `Booking Confirmed at ${reservation.hotel.name}`, `<h1>Welcome ${reservation.guestProfile.fullName}</h1><p>Your reservation is confirmed for ${reservation.checkInDate}.</p>`);
        }
        if ((_b = reservation.guestProfile) === null || _b === void 0 ? void 0 : _b.phone) {
            await this.automation.sendWhatsApp(reservation.guestProfile.phone, `Hi ${reservation.guestProfile.fullName}, your booking at ${reservation.hotel.name} is confirmed!`);
        }
        return reservation;
    }
    async update(id, data) {
        var _a;
        const reservation = await this.prisma.reservation.update({
            where: { id },
            data,
            include: { guestProfile: true, hotel: true }
        });
        if (data.status === "CHECKED_IN") {
            await this.automation.sendWhatsApp(((_a = reservation.guestProfile) === null || _a === void 0 ? void 0 : _a.phone) || "", `Welcome to ${reservation.hotel.name}! Your check-in is complete. Enjoy your stay!`);
        }
        return reservation;
    }
    async remove(id) {
        return this.prisma.reservation.delete({
            where: { id }
        });
    }
    async checkAvailability(hotelId, roomTypeId, checkIn, checkOut) {
        const rooms = await this.prisma.room.findMany({
            where: { hotelId, roomTypeId }
        });
        const roomIds = rooms.map(r => r.id);
        const conflictingReservations = await this.prisma.reservation.findMany({
            where: {
                roomId: { in: roomIds },
                status: { notIn: ["CANCELLED"] },
                OR: [
                    {
                        checkInDate: { lte: checkIn },
                        checkOutDate: { gt: checkIn }
                    },
                    {
                        checkInDate: { lt: checkOut },
                        checkOutDate: { gte: checkOut }
                    }
                ]
            }
        });
        const bookedRoomIds = conflictingReservations.map(res => res.roomId);
        const availableRooms = rooms.filter(room => !bookedRoomIds.includes(room.id));
        return availableRooms;
    }
    async pay(id) {
        var _a;
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: { hotel: true, guestProfile: true }
        });
        if (!reservation)
            throw new Error("Reservation not found");
        const updated = await this.prisma.reservation.update({
            where: { id },
            data: {
                status: "CONFIRMED",
            }
        });
        if ((_a = reservation.guestProfile) === null || _a === void 0 ? void 0 : _a.email) {
            await this.automation.sendEmail(reservation.guestProfile.email, "Payment Successful", `<p>Thank you for your payment of $${reservation.totalAmount}. Your booking is confirmed.</p>`);
        }
        return updated;
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        automation_service_1.AutomationService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map