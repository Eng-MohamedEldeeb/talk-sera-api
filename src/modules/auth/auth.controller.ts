import {
  Body,
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDt: RegisterDTO) {
    return this.authService.register(registerDt);
  }

  // POST /auth/login — LocalStrategy validates credentials first
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  login(@User() user: UserDocument) {
    return this.authService.login(user);
  }

  // POST /auth/refresh
  @Post('refresh')
  refresh(@Body() body: { userId: string; refreshToken: string }) {
    return this.authService.refresh(body.userId, body.refreshToken);
  }
}
