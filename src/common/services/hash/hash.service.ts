import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/config/env';

@Injectable()
export class HashService {
  public readonly hash = (data: string, saltRound?: number) => {
    return bcrypt.hash(data, saltRound ?? Number(SALT_ROUNDS));
  };

  public readonly compare = ({
    hashedValue,
    comparedValue,
  }: {
    hashedValue: string;
    comparedValue: string;
  }) => {
    return bcrypt.compare(comparedValue, hashedValue);
  };
}
