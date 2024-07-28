import {  IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { itemCategory } from "../schema/menu.schema"


export class editItemDto{

@IsEnum(itemCategory)
@IsOptional()
category:itemCategory

@IsString()
item:string


@IsNumber()
price:number
}