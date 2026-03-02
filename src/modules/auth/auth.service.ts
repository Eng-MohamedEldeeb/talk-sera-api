import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/common/services/hash/hash.service';
import { UserRepository } from 'src/db/repositories/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { UserDocument } from 'src/db/models/User.model';
import { TokenService } from 'src/common/services/token/jwt.service';
import { TokenType } from 'src/common/services/token/types';
import { generateCode } from 'src/common/utils/random-string';
// import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  public readonly validateUser = async (email: string, pass: string) => {
    const user = await this.userRepo.findOne({ filter: { email } });

    if (!user?.password) return null;

    const matchedPassword = await this.hashService.compare({
      hashedValue: user.password,
      comparedValue: pass,
    });

    return matchedPassword ? user : null;
  };

  public readonly register = async (registerDto: RegisterDTO) => {
    const exists = await this.userRepo.findOne({
      filter: { email: registerDto.email },
    });

    if (exists) throw new ConflictException('Email already registered');

    const hashed = await this.hashService.hash(registerDto.password, 12);

    const verifyToken = generateCode();

    await this.userRepo.create({
      ...registerDto,
      password: hashed,
      verifyToken,
    });

    // TODO: send email with verifyToken

    return { message: 'Registered! Check your email to verify.' };
  };

  public readonly login = async (user: UserDocument) => {
    const tokens = this.tokenService.generateTokens(user);

    const hash = await this.hashService.hash(tokens.refreshToken, 10);

    await this.userRepo.findByIdAndUpdate({
      id: user._id,
      data: { refreshToken: hash },
    });

    return tokens;
  };

  //TODO: Fix
  public readonly googleLogin = async (profile: UserDocument) => {
    let user = await this.userRepo.findOne({
      filter: { email: profile.email },
    });
    if (!user) {
      user = await this.userRepo.create({
        name: profile.name,
        email: profile.email,
        googleId: profile.googleId,
        avatar: profile.avatar,
        verifiedAt: new Date(Date.now()),
      });
    } else if (!user.googleId) {
      await user.updateOne({ googleId: profile.googleId });
    }
    return this.login(user);
  };

  public readonly refresh = async (userId: string, token: string) => {
    const user = await this.userRepo.findById({ id: userId });

    if (!user?.refreshToken)
      throw new UnauthorizedException('Re-login Is Required');

    const match = await this.hashService.compare({
      comparedValue: token,
      hashedValue: user.refreshToken,
    });

    if (!match) throw new UnauthorizedException('Refresh token invalid');

    return this.tokenService.generateTokens(user);
  };

  public readonly verifyEmail = async (token: string) => {
    const { sub } = this.tokenService.verifyToken({
      token,
      tokenType: TokenType.ACCESS,
    });

    const user = await this.userRepo.findOne({
      filter: { _id: sub, verifyToken: { $exists: true } },
    });

    if (!user) throw new BadRequestException('Invalid verification token');

    await user.updateOne({
      verifiedAt: new Date(Date.now()),
      $unset: { verifyToken: 1 },
    });
    return { message: 'Email verified! You can now log in.' };
  };

  public readonly forgotPassword = async (email: string) => {
    const user = await this.userRepo.findOne({ filter: { email } });

    if (!user) return { message: 'If email exists, reset link sent.' };

    const token = generateCode();
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await user.updateOne({ resetToken: token, resetTokenExpiry: expiry });
    // TODO: send email with token

    return { message: 'Password reset link sent to your email.' };
  };

  public readonly resetPassword = async (
    token: string,
    newPassword: string,
  ) => {
    const user = await this.userRepo.findOne({
      filter: { resetToken: token, resetTokenExpiry: { $gt: new Date() } },
    });

    if (!user) throw new BadRequestException('Token expired or invalid');

    const hashed = await this.hashService.hash(newPassword, 12);

    await user.updateOne({
      password: hashed,
      $unset: {
        resetToken: 1,
        resetTokenExpiry: 1,
        refreshToken: 1,
      },
    });

    return { message: 'Password updated. Please log in again.' };
  };

  public readonly logout = async (userId: string) => {
    await this.userRepo.findByIdAndUpdate({
      id: userId,
      data: { $unset: { refreshToken: 1 } },
    });

    return { message: 'Logged out successfully' };
  };
}
