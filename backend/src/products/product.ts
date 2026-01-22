import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class ProductDefinition {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  rating: number;

  // @IsString()
  // @IsNotEmpty()
  image?: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;
}