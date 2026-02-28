import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  AuthProvider,
  IEarnedBadge,
  IStreak,
  IUser,
  Roles,
} from '../interfaces/IUser.interface';
import {
  ISubscription,
  SubscriptionPlan,
} from '../interfaces/ISubscription.interface';

@Schema()
export class User implements Omit<IUser, '_id' | 'createdAt' | 'updatedAt'> {
  @Prop()
  avatar: string;

  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  xp: number;
  streak: IStreak;
  @Prop()
  badges: IEarnedBadge[];
  @Prop({
    type: {
      plan: {
        type: String,
        enum: SubscriptionPlan,
        default: SubscriptionPlan.FREE,
      },

      customerId: String,
      subscriptionId: String,
    },
  })
  subscription: {};
  @Prop()
  refreshToken: string;
  @Prop()
  isVerified: boolean;
  @Prop()
  role: Roles;
  @Prop()
  authProvider: AuthProvider;
}
