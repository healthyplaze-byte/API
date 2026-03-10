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
exports.ReportingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportingService = class ReportingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOccupancyReport(hotelId) {
        const totalRooms = await this.prisma.room.count({
            where: { hotelId }
        });
        const occupiedRooms = await this.prisma.room.count({
            where: {
                hotelId,
                status: "OCCUPIED"
            }
        });
        return {
            totalRooms,
            occupiedRooms,
            occupancyPercentage: totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0
        };
    }
    async getRevenueReport(hotelId, startDate, endDate) {
        const transactions = await this.prisma.financialTransaction.findMany({
            where: {
                hotelId,
                type: "PAYMENT",
                transactionAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
        const revenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        return {
            totalRevenue: revenue,
            transactionCount: transactions.length
        };
    }
    async getMaintenanceSummary(hotelId) {
        const openRequests = await this.prisma.maintenanceRequest.count({
            where: {
                hotelId,
                status: "OPEN"
            }
        });
        const inProgressRequests = await this.prisma.maintenanceRequest.count({
            where: {
                hotelId,
                status: "IN_PROGRESS"
            }
        });
        return {
            openRequests,
            inProgressRequests
        };
    }
};
exports.ReportingService = ReportingService;
exports.ReportingService = ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportingService);
//# sourceMappingURL=reporting.service.js.map