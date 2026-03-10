"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const jwksClient = __importStar(require("jwks-rsa"));
let JwtAuthGuard = class JwtAuthGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers["authorization"];
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
            throw new common_1.UnauthorizedException("Missing authorization header");
        }
        const token = authHeader.slice("Bearer ".length);
        const secret = process.env.SUPABASE_JWT_SECRET;
        const supabaseUrl = process.env.SUPABASE_URL;
        if (!secret || !supabaseUrl) {
            throw new Error("SUPABASE_JWT_SECRET and SUPABASE_URL must be configured");
        }
        try {
            const payload = jwt.verify(token, secret, { algorithms: ["HS256"] });
            req.user = { id: payload.sub, payload };
            return true;
        }
        catch (hsError) {
            try {
                const decoded = jwt.decode(token, { complete: true });
                if (!decoded || !decoded.header.kid) {
                    throw hsError;
                }
                const client = jwksClient.default({
                    jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`
                });
                const key = await client.getSigningKey(decoded.header.kid);
                const signingKey = key.getPublicKey();
                const payload = jwt.verify(token, signingKey, { algorithms: ["RS256", "ES256"] });
                req.user = { id: payload.sub, payload };
                return true;
            }
            catch (jwksError) {
                console.error("Token verification failed (HS256):", hsError.message);
                console.error("Token verification failed (JWKS):", jwksError.message);
                throw new common_1.UnauthorizedException(`Invalid token: ${hsError.message} / ${jwksError.message}`);
            }
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map