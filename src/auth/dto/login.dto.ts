import { IsEmail, isEmail, IsEnum, IsNotEmpty, IsString, MinLength, minLength } from "class-validator"
import { userRoles } from "../schemas/user.schema"

export class signinDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail({},{message:"Please Enter Valid Email Address"})
    email:string
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    password:string
}