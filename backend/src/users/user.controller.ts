import { Controller, Get, Post, Body, } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDefinition } from './DTO/user';
import { LoginUserDto } from './DTO/login';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch('ban/:id')
  banUser(@Param('id') id: string) {
    return this.userService.banUser(+id);
  }

  @Patch('unban/:id')
  unbanUser(@Param('id') id: string) {
    return this.userService.unbanUser(+id);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    console.log(loginDto)
    return this.userService.login(loginDto);
  }

  @Post('register')
  registerUser(@Body() userData: UsersDefinition) {
    return this.userService.register(userData);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }


}
