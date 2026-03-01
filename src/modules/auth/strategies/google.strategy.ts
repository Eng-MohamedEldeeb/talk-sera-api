import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(cfg: ConfigService) {
    super({
      clientID: cfg.get('GOOGLE_CLIENT_ID') as string,
      clientSecret: cfg.get('GOOGLE_CLIENT_SECRET') as string,
      callbackURL: cfg.get('GOOGLE_CALLBACK_URL') as string,
      scope: ['email', 'profile'],
    });
  }
  validate(_at: string, _rt: string, profile: Profile, done: VerifyCallback) {
    const { id, name, emails, photos } = profile;
    done(null, {
      googleId: id,
      email: emails && emails[0].value,
      name: name && `${name.givenName} ${name.familyName}`,
      avatar: photos && photos[0]?.value,
    });
  }
}
