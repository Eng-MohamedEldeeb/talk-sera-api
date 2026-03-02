import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AuthProvider,
  EnglishLevel,
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
    required: [
      function (this: UserDocument) {
        return Boolean(this.googleId);
      },
      'password is required',
    ],
  })
  password: string;

  @Prop({
    type: Number,
    default: 0,
  })
  xp: number;

  @Prop({
    type: String,
    enum: EnglishLevel,
    required: [true, 'english level is required'],
  })
  level: EnglishLevel;

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

  @Prop({ type: Date })
  verifiedAt: Date;

  @Prop()
  verifyToken?: string;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpiry?: Date;

  @Prop({
    type: String,
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @Prop({ type: String, default: AuthProvider.SYSTEM })
  authProvider: AuthProvider;
}

export const userSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);

export type UserDocument = HydratedDocument<User>;
