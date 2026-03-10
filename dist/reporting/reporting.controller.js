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
exports.ReportingController = void 0;
const common_1 = require("@nestjs/common");
const reporting_service_1 = require("./reporting.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ReportingController = class ReportingController {
    constructor(reportingService) {
        this.reportingService = reportingService;
    }
    getOccupancyReport(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.reportingService.getOccupancyReport(hotelId);
    }
    getRevenueReport(req, startDate, endDate) {
        const hotelId = req.user.payload.hotel_id;
        return this.reportingService.getRevenueReport(hotelId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    getMaintenanceSummary(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.reportingService.getMaintenanceSummary(hotelId);
    }
};
exports.ReportingController = ReportingController;
__decorate([
    (0, common_1.Get)("occupancy"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "getOccupancyReport", null);
__decorate([
    (0, common_1.Get)("revenue"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("startDate")),
    __param(2, (0, common_1.Query)("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "getRevenueReport", null);
__decorate([
    (0, common_1.Get)("maintenance"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "getMaintenanceSummary", null);
exports.ReportingController = ReportingController = __decorate([
    (0, common_1.Controller)("reporting"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reporting_service_1.ReportingService])
], ReportingController);
//# sourceMappingURL=reporting.controller.js.map