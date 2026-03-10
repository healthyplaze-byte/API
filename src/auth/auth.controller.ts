import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IsEmail, IsString, MinLength } from "class-validator";
import { JwtAuthGuard } from "./jwt-auth.guard";

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

class RegisterGuestDto extends LoginDto {
  @IsString()
  fullName!: string;
}

class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post("register")
  async register(@Body() body: RegisterGuestDto) {
    return this.authService.registerGuest(body);
  }

  @Post("update-password")
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Request() req: any, @Body() body: UpdatePasswordDto) {
    const userId = req.user.id;
    return this.authService.updatePassword(userId, body.password);
  }
}

