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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MaintenanceService = class MaintenanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hotelId) {
        return this.prisma.maintenanceRequest.findMany({
            where: { hotelId },
            include: {
                room: true
            }
        });
    }
    async findOne(id) {
        return this.prisma.maintenanceRequest.findUnique({
            where: { id },
            include: {
                room: true
            }
        });
    }
    async create(hotelId, data) {
        return this.prisma.maintenanceRequest.create({
            data: {
                ...data,
                hotelId
            }
        });
    }
    async update(id, data) {
        return this.prisma.maintenanceRequest.update({
            where: { id },
            data
        });
    }
    async remove(id) {
        return this.prisma.maintenanceRequest.delete({
            where: { id }
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map