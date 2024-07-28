import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { user } from 'src/auth/schemas/user.schema';
import { menu } from 'src/menu/schema/menu.schema';


@Schema()
export class review extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  reviewer: user;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'menu',
    required: true,
  })
  menuItem: menu;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 5,
  })
  rating: number;

  @Prop({
    type: String,
    required: true,
  })
  reviewText: string;

  @Prop({
    type: Date,
    default: () => new Date(),
  })
  reviewDate: Date;
}

export const reviewSchema = SchemaFactory.createForClass(review);