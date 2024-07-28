import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema()
export class image extends Document{
    @Prop({
        type:String,
        required:true,
    })
    name:string
    @Prop({
        type:String,
        required:true
    })
    path:string


}
export const imageSchema=SchemaFactory.createForClass(image)

 