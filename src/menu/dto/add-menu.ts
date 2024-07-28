import {  IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { itemCategory } from "../schema/menu.schema"


export class addItemDto{
@IsNotEmpty()
@IsEnum(itemCategory)
category:itemCategory

@IsNotEmpty()
@IsString()
item:string


@IsNotEmpty()
@IsNumber()
price:number
}