import { Module, Controller, Get } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';

@Controller() 
class AppController {
  @Get()
  root() {
    return { message: 'NestJS Todo Backend is running!' };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'auth_db',
      entities: [User, Products],
      synchronize: false,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
  ],
  controllers: [UserController, ProductController, AppController],
  providers: [UserService, ProductService],
})
export class AppModule {}
