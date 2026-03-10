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
exports.HallsController = void 0;
const common_1 = require("@nestjs/common");
const halls_service_1 = require("./halls.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let HallsController = class HallsController {
    constructor(hallsService) {
        this.hallsService = hallsService;
    }
    async findPublicHalls() {
        return this.hallsService.findAll(undefined);
    }
    findAll(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.hallsService.findAll(hotelId);
    }
    create(req, data) {
        const hotelId = req.user.payload.hotel_id;
        return this.hallsService.create(hotelId, data);
    }
    findMyBookings(req) {
        return this.hallsService.findMyBookings(req.user.id);
    }
    createBooking(req, data) {
        var _a;
        const hotelId = (_a = req.user.payload) === null || _a === void 0 ? void 0 : _a.hotel_id;
        return this.hallsService.createBooking(hotelId, data);
    }
};
exports.HallsController = HallsController;
__decorate([
    (0, common_1.Get)("public"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HallsController.prototype, "findPublicHalls", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HallsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HallsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("my-bookings"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HallsController.prototype, "findMyBookings", null);
__decorate([
    (0, common_1.Post)("bookings"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HallsController.prototype, "createBooking", null);
exports.HallsController = HallsController = __decorate([
    (0, common_1.Controller)("halls"),
    __metadata("design:paramtypes", [halls_service_1.HallsService])
], HallsController);
//# sourceMappingURL=halls.controller.js.map