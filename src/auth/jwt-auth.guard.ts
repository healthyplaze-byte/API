import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers["authorization"] as string | undefined;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing authorization header");
    }

    const token = authHeader.slice("Bearer ".length);
    const secret = process.env.SUPABASE_JWT_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;

    if (!secret || !supabaseUrl) {
      throw new Error("SUPABASE_JWT_SECRET and SUPABASE_URL must be configured");
    }

    // Attempt HS256 first (symmetric key)
    try {
      const payload = jwt.verify(token, secret, { algorithms: ["HS256"] }) as { sub?: string; [k: string]: unknown };
      req.user = { id: payload.sub, payload };
      return true;
    } catch (hsError: any) {
      // If HS256 fails, try verifying via JWKS (for RS256/ES256)
      try {
        const decoded = jwt.decode(token, { complete: true });
        // @ts-ignore
        if (!decoded || !decoded.header.kid) {
          throw hsError; // Can't verify without kid
        }

        const client = jwksClient.default({
          jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`
        });

        // @ts-ignore
        const key = await client.getSigningKey(decoded.header.kid);
        const signingKey = key.getPublicKey();

        const payload = jwt.verify(token, signingKey, { algorithms: ["RS256", "ES256"] }) as { sub?: string; [k: string]: unknown };
        req.user = { id: payload.sub, payload };
        return true;
      } catch (jwksError: any) {
        console.error("Token verification failed (HS256):", hsError.message);
        console.error("Token verification failed (JWKS):", jwksError.message);
        throw new UnauthorizedException(`Invalid token: ${hsError.message} / ${jwksError.message}`);
      }
    }
  }
}

