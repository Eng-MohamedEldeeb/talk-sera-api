import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_SECRET } from 'src/config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_SECRET as string,
    });
  }
  validate(payload: { sub: string; email: string; role: string }) {
    console.log({ payload });

    return { _id: payload.sub, email: payload.email, role: payload.role };
  }
}
