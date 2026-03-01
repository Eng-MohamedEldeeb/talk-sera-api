import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigService } from '@nestjs/config';
import { HashService } from 'src/common/services/hash/hash.service';
import { TokenService } from 'src/common/services/token/jwt.service';
import { UserRepository } from 'src/db/repositories/user.repository';
import { UserModel } from 'src/db/models/User.model';
@Module({
  imports: [
    PassportModule,
    UserModel,
    JwtModule.registerAsync({
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: cfg.get('JWT_ACCESS_EXPIRES') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    UserRepository,
    TokenService,
    HashService,
  ],
  exports: [AuthService, UserRepository, TokenService],
})
export class AuthModule {}
