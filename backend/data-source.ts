import { User } from './src/users/user.entity';
import { Products } from './src/products/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import userFactory from './src/databases/factory/user.factory';
import UserSeeder from './src/databases/seeds/user.seeder';

const dataSource: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'auth_db',
  entities: [User, Products],
  migrations: ['src/migrations/*.ts'],
  seeds: [UserSeeder],
  factories: [userFactory],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSource);
