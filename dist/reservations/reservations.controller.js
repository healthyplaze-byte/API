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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    async findMyReservations(req) {
        const userId = req.user.id;
        return this.reservationsService.findByGuestUser(userId);
    }
    findAll(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.reservationsService.findAll(hotelId);
    }
    checkAvailability(req, roomTypeId, checkIn, checkOut) {
        const hotelId = req.user.payload.hotel_id;
        return this.reservationsService.checkAvailability(hotelId, roomTypeId, new Date(checkIn), new Date(checkOut));
    }
    findOne(id) {
        return this.reservationsService.findOne(id);
    }
    async create(req, data) {
        var _a;
        const hotelId = ((_a = req.user.payload) === null || _a === void 0 ? void 0 : _a.hotel_id) || data.hotelId;
        const guestProfile = await this.reservationsService.findGuestProfileByUserId(req.user.id);
        const guestProfileId = guestProfile === null || guestProfile === void 0 ? void 0 : guestProfile.id;
        if (!hotelId) {
            throw new common_1.BadRequestException("hotelId is required for this operation");
        }
        if (!guestProfileId) {
            throw new common_1.BadRequestException("A guest profile is required to create a reservation. Please complete your profile.");
        }
        return this.reservationsService.create(hotelId, {
            ...data,
            guestProfileId,
            checkInDate: new Date(data.checkInDate),
            checkOutDate: new Date(data.checkOutDate)
        });
    }
    update(id, data) {
        return this.reservationsService.update(id, {
            ...data,
            checkInDate: data.checkInDate ? new Date(data.checkInDate) : undefined,
            checkOutDate: data.checkOutDate ? new Date(data.checkOutDate) : undefined
        });
    }
    pay(id) {
        return this.reservationsService.pay(id);
    }
    remove(id) {
        return this.reservationsService.remove(id);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)("my"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findMyReservations", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("availability"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("roomTypeId")),
    __param(2, (0, common_1.Query)("checkIn")),
    __param(3, (0, common_1.Query)("checkOut")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "checkAvailability", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(":id/pay"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "pay", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "remove", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)("reservations"),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map