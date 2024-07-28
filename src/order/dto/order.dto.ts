import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsMongoId, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsMongoId()
  @IsNotEmpty()
  item: string;


  @Min(1)
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];


  @IsString()
  @IsOptional()
  specialInstructions?: string;
}
