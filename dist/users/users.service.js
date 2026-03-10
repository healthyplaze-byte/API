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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_js_1 = require("@supabase/supabase-js");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");
    }
    async findStaffByHotel(hotelId) {
        return this.prisma.hotelUser.findMany({
            where: { hotelId, isActive: true },
            include: {
                role: true
            }
        });
    }
    async inviteStaff(hotelId, email, roleKey) {
        const role = await this.prisma.role.findUnique({ where: { key: roleKey } });
        if (!role)
            throw new Error('Role not found');
        return this.prisma.hotelUser.create({
            data: {
                hotelId,
                roleId: role.id,
                invitedEmail: email,
                userId: 'pending_' + Date.now(),
                isActive: false
            }
        });
    }
    async createStaff(hotelId, data) {
        const role = await this.prisma.role.findUnique({ where: { key: data.roleKey } });
        if (!role)
            throw new Error('Role not found');
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
            email: data.email,
            password: data.password || "Hotel123!",
            options: {
                data: { full_name: data.fullName }
            }
        });
        if (authError)
            throw new Error(`Supabase Auth Error: ${authError.message}`);
        if (!authData.user)
            throw new Error("User creation failed");
        const existing = await this.prisma.hotelUser.findFirst({
            where: { userId: authData.user.id, hotelId }
        });
        if (existing) {
            return this.prisma.hotelUser.update({
                where: { id: existing.id },
                data: { isActive: true, roleId: role.id }
            });
        }
        return this.prisma.hotelUser.create({
            data: {
                hotelId,
                userId: authData.user.id,
                roleId: role.id,
                isActive: true,
                invitedEmail: data.email
            }
        });
    }
    async updateStaffRole(hotelUserId, roleKey) {
        const role = await this.prisma.role.findUnique({ where: { key: roleKey } });
        if (!role)
            throw new Error('Role not found');
        return this.prisma.hotelUser.update({
            where: { id: hotelUserId },
            data: { roleId: role.id }
        });
    }
    async removeStaff(hotelUserId) {
        return this.prisma.hotelUser.update({
            where: { id: hotelUserId },
            data: { isActive: false }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map