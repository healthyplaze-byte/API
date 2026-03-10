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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(hotelId) {
        const [totalRooms, occupiedRooms, pendingReservations, totalRevenue, openMaintenance, dirtyRooms] = await Promise.all([
            this.prisma.room.count({ where: { hotelId } }),
            this.prisma.room.count({ where: { hotelId, status: "OCCUPIED" } }),
            this.prisma.reservation.count({ where: { hotelId, status: "PENDING" } }),
            this.prisma.financialTransaction.aggregate({
                where: { hotelId, type: "PAYMENT" },
                _sum: { amount: true }
            }),
            this.prisma.maintenanceRequest.count({ where: { hotelId, status: "OPEN" } }),
            this.prisma.room.count({ where: { hotelId, status: "CLEANING" } })
        ]);
        return {
            occupancy: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
            activeReservations: occupiedRooms,
            pendingReservations,
            revenue: Number(totalRevenue._sum.amount || 0),
            maintenanceIssues: openMaintenance,
            dirtyRooms
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map