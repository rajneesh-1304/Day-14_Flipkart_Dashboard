import { Module, Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cartitem.entity';
import { CartModule } from './cart/cart.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderTracking } from './orders/entities/order-tracking.entity';
import { OrderModule } from './orders/order.module';
import { Wishlist } from './wishlist/wishlist.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { Images } from './images/image.entity';
import { Coupons } from './coupons/coupon.entity';
import { ImageModule } from './images/image.module';
import { CouponModule } from './coupons/coupon.module';

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
      password: 'admin',
      database: 'auth_db',
      entities: [
        User,
        Products,
        Address,
        Cart,
        CartItem,
        Order,
        OrderItem,
        OrderTracking,
        Wishlist,
        Images,
        Coupons,
      ],
      synchronize: false,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    UserModule,
    ProductModule,
    AddressModule,
    CartModule,
    OrderModule,
    WishlistModule,
    ImageModule,
    CouponModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
