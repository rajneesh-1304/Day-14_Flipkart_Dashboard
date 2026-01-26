import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import userFactory from './databases/factory/user.factory';
import UserSeeder from './databases/seeds/user.seeder';
import { Address } from './address/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cartitem.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderTracking } from './orders/entities/order-tracking.entity';

const dataSource: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'auth_db',
  entities: [User, Products, Address, Cart, CartItem, Order, OrderItem, OrderTracking],
  migrations: ['src/migrations/*.ts'],
  seeds: [UserSeeder],
  factories: [userFactory],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSource);
