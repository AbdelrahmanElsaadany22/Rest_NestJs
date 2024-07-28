import { user } from "src/auth/schemas/user.schema";
import { Category } from "../schemas/restaurant.schema"
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsEnum, IsString, IsOptional, IsEmpty } from 'class-validator';
export class updateRestaurantDto{
    @IsString()
    @IsOptional()
    name:string;
    @IsString()
    @IsOptional()
    description:string
    @IsEmail({},{message:"Please Enter Valid  Address"})
    @IsOptional()
    email:string
    @IsPhoneNumber()
    @IsOptional()
    phone_number:string
    @IsEnum(Category)
    @IsOptional()
    category: Category;
    @IsEmpty({message:"you cannot assign or provide the id"})
    user:user
}