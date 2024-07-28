import { IsNotEmpty, IsEmail, IsPhoneNumber, IsEnum, IsString, IsOptional, IsMongoId, ValidateNested, IsArray, IsEmpty } from 'class-validator';
import { Category } from '../schemas/restaurant.schema';
import { Type } from 'class-transformer';
import { user } from 'src/auth/schemas/user.schema';
export class ImageDto {
    @IsNotEmpty()
    @IsString()
    public_id: string;
  
    @IsNotEmpty()
    @IsString()
    secure_url: string;
  }
export class addRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail({},{message:"Please Enter Valid  Address"})
  email: string;

  @IsPhoneNumber('EG') 
  phone_number: string;

  @IsEnum(Category)
  category: Category;
  
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsEmpty({message:"you cannot assign or provide the id"})
  user:user
}
