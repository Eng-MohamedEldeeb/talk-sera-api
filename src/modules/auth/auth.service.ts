import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { HashService } from 'src/common/services/hash/hash.service';
import { UserRepository } from 'src/db/repositories/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { UserDocument } from 'src/db/models/User.model';
import { TokenService } from 'src/common/services/token/jwt.service';
import { Profile } from 'passport-google-oauth20';

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
      hashedValue: pass,
      comparedValue: user.password,
    });

    return matchedPassword ? user : null;
  };

  public readonly register = async (registerDto: RegisterDTO) => {
    const exists = await this.userRepo.findOne({
      filter: { email: registerDto.email },
    });

    if (exists) throw new ConflictException('Email already registered');

    const hashed = await this.hashService.hash(registerDto.password, 12);

    const verifyToken = uuidv4();

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
    const user = await this.userRepo.findOne({
      filter: { verifyToken: token },
    });
    if (!user) throw new BadRequestException('Invalid verification token');
    await user.updateOne({ isVerified: true, verifyToken: null });
    return { message: 'Email verified! You can now log in.' };
  };

  public readonly forgotPassword = async (email: string) => {
    const user = await this.userRepo.findOne({ filter: { email } });

    if (!user) return { message: 'If email exists, reset link sent.' };

    const token = uuidv4();
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await user.updateOne({ resetToken: token, resetTokenExpiry: expiry });
    // TODO: send email with token

    return { message: 'Password reset link sent to your email.' };
  };

  public readonly googleLogin = async (profile: Profile) => {
    // let user = await this.userRepo.findOne({
    //   filter: { email: profile.email[0] as string },
    // });
    // if (!user) {
    //   user = await this.userRepo.create({
    //     name: profile.name as string,
    //     email: profile.email as string,
    //     googleId: profile.googleId as string,
    //     avatar: profile.avatar as string,
    //     verifiedAt: new Date(Date.now()),
    //   });
    // } else if (!user.googleId) {
    //   await user.updateOne({ googleId: profile.googleId });
    // }
    // return this.login(user);
  };
}
