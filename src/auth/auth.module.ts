import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({
      global: true
      // The actual secret/verification will rely on Supabase configuration.
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

