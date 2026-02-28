import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AuthProvider,
  IEarnedBadge,
  IUser,
  Roles,
} from '../interfaces/IUser.interface';
import { SubscriptionPlan } from '../interfaces/ISubscription.interface';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User implements Omit<IUser, '_id' | 'createdAt' | 'updatedAt'> {
  @Prop()
  avatar: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, "name field can't be empty"],
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, "email field can't be empty"],
    unique: [true, 'email must be unique'],
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, "email field can't be empty"],
  })
  password: string;

  @Prop({
    type: Number,
    default: 0,
  })
  xp: number;

  @Prop({
    type: {
      current: Number,
      longest: Number,
      lastActive: Date,
    },
  })
  streak: {
    current: number;
    longest: number;
    lastActive: Date;
  };

  @Prop()
  googleId: string;

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
  subscription: {
    plan: SubscriptionPlan;

    customerId: string;
    subscriptionId: string;
  };

  @Prop()
  refreshToken: string;

  @Prop()
  verifiedAt: Date;

  @Prop({
    type: String,
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @Prop({ type: String, default: AuthProvider.SYSTEM })
  authProvider: AuthProvider;
}

export const userModel = SchemaFactory.createForClass(User);

export type TUserDocument = HydratedDocument<User>;
