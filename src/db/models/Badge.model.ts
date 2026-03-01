import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BadgeConditionType, IBadge } from '../interfaces/IBadge.interface';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Badge implements Omit<IBadge, '_id' | 'createdAt' | 'updatedAt'> {
  @Prop({
    type: String,
    required: [true, "badge name can't be empty"],
    unique: [true, 'badge name must be unique'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, "badge description can't be empty"],
  })
  description: string;

  @Prop({
    type: String,
    required: [true, "badge icon can't be empty"],
  })
  icon_url: string;

  @Prop({
    type: {
      type: {
        type: String,
        enum: BadgeConditionType,
        required: [true, 'badge condition type is required'],
      },
      value: String,
    },
  })
  condition: {
    type: BadgeConditionType;
    value: number;
  };
}

export const badgeSchema = SchemaFactory.createForClass(Badge);

export const BadgeModel = MongooseModule.forFeature([
  { name: Badge.name, schema: badgeSchema },
]);
export type TBadgeDocument = HydratedDocument<Badge>;
