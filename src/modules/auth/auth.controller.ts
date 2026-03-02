import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user-param.decorator';
import type { UserDocument } from 'src/db/models/User.model';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ForgotPasswordDTO, ResetPasswordDTO } from './dto/forgot-password.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  // POST /auth/login — LocalStrategy validates credentials first
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  login(@User() user: UserDocument) {
    return this.authService.login(user);
  }

  // POST /auth/verify-email
  @Post('verify-email')
  verifyEmail(@Headers('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // POST /auth/refresh
  @Post('refresh')
  refresh(@Body() body: { userId: string; refreshToken: string }) {
    return this.authService.refresh(body.userId, body.refreshToken);
  }

  // POST /auth/forgot-password
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  // POST /auth/reset-password
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.resetPassword(
      resetPasswordDTO.token,
      resetPasswordDTO.newPassword,
    );
  }

  // POST /auth/logout
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@User('_id') userId: string) {
    console.log({ userId });
    return this.authService.logout(userId);
  }

  // GET /auth/google — Initiates Google OAuth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  // GET /auth/google/callback — Handles redirect from Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@User() user: UserDocument) {
    return this.authService.googleLogin(user);
  }
}
