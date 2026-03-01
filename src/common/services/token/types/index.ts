import { JwtPayload } from 'jsonwebtoken';

export enum TokenType {
  REFRESH = 'refresh',
  ACCESS = 'access',
}

export interface IJwtPayload extends JwtPayload {
  id: string;
}
