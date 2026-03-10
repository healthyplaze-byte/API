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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const shifts_service_1 = require("./shifts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FinanceController = class FinanceController {
    constructor(financeService, shiftsService) {
        this.financeService = financeService;
        this.shiftsService = shiftsService;
    }
    findAllInvoices(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.financeService.findAllInvoices(hotelId);
    }
    findOneInvoice(id) {
        return this.financeService.findOneInvoice(id);
    }
    createInvoice(req, data) {
        const hotelId = req.user.payload.hotel_id;
        return this.financeService.createInvoice(hotelId, {
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined
        });
    }
    async createTransaction(req, data) {
        const hotelId = req.user.payload.hotel_id;
        const userId = req.user.id;
        const shift = await this.shiftsService.getCurrentShift(userId, hotelId);
        if (!shift) {
            throw new Error("You must have an OPEN SHIFT to process transactions.");
        }
        return this.financeService.createTransaction(hotelId, {
            ...data,
            shiftId: shift.id
        });
    }
    getRevenueSummary(req) {
        const hotelId = req.user.payload.hotel_id;
        return this.financeService.getRevenueSummary(hotelId);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)("invoices"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findAllInvoices", null);
__decorate([
    (0, common_1.Get)("invoices/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findOneInvoice", null);
__decorate([
    (0, common_1.Post)("invoices"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)("transactions"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Get)("revenue-summary"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getRevenueSummary", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)("finance"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [finance_service_1.FinanceService,
        shifts_service_1.ShiftsService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map