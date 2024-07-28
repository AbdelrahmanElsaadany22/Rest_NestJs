import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { user } from "src/auth/schemas/user.schema";
import { image } from "src/image/schemas/image.schema";

export enum itemCategory {
    STARTERS = 'starters',
    DESSERTS = 'desserts',
    BEEF = 'beef' ,
    CHICKEN="chicken",
    DRINKS="drinks",
}

@Schema()
export class menu extends Document {
@Prop({
    type: String,
    enum: itemCategory,  // Specify the enum here
    required: true
})
category:itemCategory


@Prop({
    type: String,
    required: true
})
item:string


@Prop({
    type: Number, // Specify the enum here
    required: true
})
price:Number
}

export const menuSchema = SchemaFactory.createForClass(menu);


//to each item will added to the menu
// i need to know the category of it and the price