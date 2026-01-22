import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDefinition } from './user';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(){
    return this.userService.getAll();
  }

  @Post() 
  loginUser(@Body() userData) { 
    console.log('Received Task:', userData);
    return this.userService.login(userData);
  }

  @Post('register') 
  registerUser(@Body() userData: UsersDefinition) { 
    console.log('Received Task:', userData);
    return this.userService.register(userData);
  }
}
