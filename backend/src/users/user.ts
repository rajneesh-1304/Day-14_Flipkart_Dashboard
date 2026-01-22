import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsIn, ArrayNotEmpty, IsNumber, ArrayMaxSize, IsDate } from 'class-validator';

export class UsersDefinition {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  password:string;

  @IsNotEmpty()
  role:string;
}