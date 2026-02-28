import { Types } from 'mongoose';
import { ISubscription } from './ISubscription.interface';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AuthProvider {
  SYSTEM = 'system',
  GOOGLE = 'google',
}

export enum EnglishLevel {
  A1 = 'A1',
  B1 = 'B1',
  B2 = 'B2',
  B2P = 'B2P',
  C1 = 'C1',
  C2 = 'C2',
}

export interface IStreak {
  current: number;
  longest: number;
  lastActive: Date;
}

export interface IEarnedBadge {
  badge: Types.ObjectId;
  earnedAt: Date;
}

export interface IUser {
  _id: Types.ObjectId;
  avatar: string;
  name: string;
  email: string;
  password: string;

  xp: number;
  streak: IStreak;
  badges: IEarnedBadge[];

  subscription: ISubscription;
  refreshToken: string;

  isVerified: boolean;
  role: Roles;
  authProvider: AuthProvider;
  createdAt: Date;
  updatedAt: Date;
}
