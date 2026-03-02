import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from 'src/config/env';
import { IJwtPayload, TokenType } from './types';
import { UserDocument } from 'src/db/models/User.model';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public readonly generateTokens = (user: UserDocument & JwtPayload) => {
    const accessToken = this.jwtService.sign(
      { sub: user._id, email: user.email, role: user.role },
      {
        secret: JWT_ACCESS_SECRET,
        expiresIn: '1h',
      },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user._id, email: user.email, role: user.role },
      {
        secret: JWT_REFRESH_SECRET,
        expiresIn: '1w',
      },
    );
    return { accessToken, refreshToken };
  };

  verifyToken({
    token,
    tokenType = TokenType.ACCESS,
  }: {
    token: string;
    tokenType: TokenType;
  }): IJwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret:
          tokenType === TokenType.ACCESS
            ? JWT_ACCESS_SECRET
            : JWT_REFRESH_SECRET,
      });
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException(error);
    }
  }
}
