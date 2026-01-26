import { Module } from "@nestjs/common"; 
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderTracking } from "./entities/order-tracking.entity";
import { OrderItem } from "./entities/order-item.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { CartItem } from "src/cart/entities/cartitem.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderTracking, OrderItem, Cart, CartItem])],
    controllers:[OrderController],
    providers:[OrderService],
})

export class OrderModule {}