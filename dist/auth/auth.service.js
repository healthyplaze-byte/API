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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) {
            throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured");
        }
        this.supabase = (0, supabase_js_1.createClient)(url, key);
    }
    async login(payload) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        });
        if (error || !data.session || !data.user) {
            throw error !== null && error !== void 0 ? error : new Error("Invalid credentials");
        }
        const userId = data.user.id;
        const profile = await this.prisma.profile.findUnique({
            where: { id: userId }
        });
        const guestProfile = await this.prisma.guestProfile.findFirst({
            where: { userId }
        });
        const memberships = await this.prisma.hotelUser.findMany({
            where: { userId, isActive: true },
            include: { hotel: true, role: { include: { rolePermissions: true } } }
        });
        return {
            session: data.session,
            user: {
                id: userId,
                email: data.user.email,
                profile,
                guestProfile
            },
            memberships
        };
    }
    async registerGuest(payload) {
        console.log("Registering guest:", payload.email);
        const { data, error } = await this.supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                emailRedirectTo: "http://localhost:3002/login",
                data: {
                    full_name: payload.fullName
                }
            }
        });
        if (error) {
            console.error("Supabase signUp error:", error);
            throw error;
        }
        if (!data.user) {
            console.error("Supabase signUp returned no user");
            throw new Error("Signup failed - no user returned");
        }
        const userId = data.user.id;
        console.log("Supabase user created:", userId);
        try {
            const guestProfile = await this.prisma.guestProfile.create({
                data: {
                    userId,
                    fullName: payload.fullName,
                    email: payload.email,
                    loyaltyPoints: 0,
                    loyaltyTier: "BRONZE"
                }
            });
            console.log("GuestProfile created:", guestProfile.id);
            return {
                user: {
                    id: userId,
                    email: data.user.email,
                    guestProfile
                }
            };
        }
        catch (dbError) {
            console.error("Database error creating GuestProfile:", dbError);
            throw new Error(`Registration failed during profile creation: ${dbError.message}`);
        }
    }
    async updatePassword(userId, password) {
        const { data, error } = await this.supabase.auth.admin.updateUserById(userId, {
            password: password
        });
        if (error) {
            throw error;
        }
        return { message: "Password updated successfully" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map