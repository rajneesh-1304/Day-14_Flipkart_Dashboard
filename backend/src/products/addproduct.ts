import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';


export class AddProduct {
   @IsString()
   @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  rating: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  subcategory: string;
}