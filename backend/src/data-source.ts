import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { Address } from './address/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cartitem.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderTracking } from './orders/entities/order-tracking.entity';
import { Wishlist } from './wishlist/wishlist.entity';

const rawDataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'auth_db',
  synchronize: false,
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
  ],
  seeds: ['dist/src/seeds/**/*.js'],
  migrations: ['dist/src/migrations/*.js'],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
