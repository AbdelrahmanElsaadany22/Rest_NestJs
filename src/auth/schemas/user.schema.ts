import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import {Document} from 'mongoose'
export enum userRoles{
ADMIN='admin',
USER='user'
}


@Schema()
export class user extends Document{
@Prop({
    required:true,
    minlength:4,
    maxlength:40,
    trim:true,
})
name:string


@Prop({
    unique:true,
    required:true,
})
@IsEmail()
email:string

@Prop({
select:false,//to be not selected when makeing query
required:true,
minlength:9,
})
password:string

@Prop({
    required:true,
    enum:userRoles
})
role:userRoles

}

export const userSchema=SchemaFactory.createForClass(user)