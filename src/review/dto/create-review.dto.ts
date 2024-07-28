import { IsNotEmpty, IsString, IsNumber, Min, Max, IsMongoId } from 'class-validator';

export class createReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly reviewer: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly menuItem: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  readonly reviewText: string;
}
