import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { user } from "src/auth/schemas/user.schema";
import { image } from "src/image/schemas/image.schema";

export enum Category {
    FAST_FOOD = 'Fast Food',
    CAFE = 'Cafe',
    FINE_DINING = 'Fine Dining'  // Corrected typo here
}

@Schema()
export class restaurant extends Document {
    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    })
    name: string;

    @Prop()
    description: string;

    @Prop()
    email: string;

    @Prop()
    phone_number: string;

    @Prop()
    address: string;

    @Prop({
        type: String,
        enum: Category,  // Specify the enum here
        required: true
    })
    category: Category;

    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'image' }]  // Assuming 'Image' is the referenced model
    })
    images: image

    //to ssave current users 
    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'user' }]
    })
    users:user
}

export const restaurantSchema = SchemaFactory.createForClass(restaurant);


 