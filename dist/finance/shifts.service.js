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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShiftsService = class ShiftsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentShift(userId, hotelId) {
        return this.prisma.shift.findFirst({
            where: {
                userId,
                hotelId,
                status: "OPEN"
            },
            include: {
                transactions: true
            }
        });
    }
    async openShift(userId, hotelId, startCash) {
        const existing = await this.getCurrentShift(userId, hotelId);
        if (existing)
            throw new Error("Shift already open");
        return this.prisma.shift.create({
            data: {
                userId,
                hotelId,
                startCash,
                status: "OPEN"
            }
        });
    }
    async closeShift(userId, hotelId, endCash, notes) {
        const shift = await this.getCurrentShift(userId, hotelId);
        if (!shift)
            throw new Error("No open shift found");
        const totalTransactions = shift.transactions.reduce((sum, tx) => {
            if (tx.type === "PAYMENT")
                return sum + Number(tx.amount);
            if (tx.type === "REFUND")
                return sum - Number(tx.amount);
            return sum;
        }, 0);
        const systemCash = Number(shift.startCash) + totalTransactions;
        return this.prisma.shift.update({
            where: { id: shift.id },
            data: {
                endTime: new Date(),
                endCash,
                systemCash,
                status: "CLOSED",
                notes
            }
        });
    }
    async getHistory(userId, hotelId) {
        return this.prisma.shift.findMany({
            where: { userId, hotelId },
            orderBy: { createdAt: "desc" },
            take: 20
        });
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map