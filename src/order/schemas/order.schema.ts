import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { user } from "src/auth/schemas/user.schema";

@Schema()
export class order extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'user',
        required: true
    })
    customer: user;

    @Prop({
        type: [{ 
            item: { type: MongooseSchema.Types.ObjectId, ref: 'menu' },
            quantity: { type: Number, required: true },
        }],
        required: true
    })
    items: {
        item: MongooseSchema.Types.ObjectId;
        quantity: number; 
    }[];
    @Prop()
    totalCost:number


    @Prop({
        type: Date,
        default: () => new Date()
    })
    orderDate: Date;


    @Prop({
        type: String,
        required: false
    })
    specialInstructions?: string;
}

export const orderSchema = SchemaFactory.createForClass(order);
