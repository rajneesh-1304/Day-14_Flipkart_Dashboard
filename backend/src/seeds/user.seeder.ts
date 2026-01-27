import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'admin@gmail.com',
        password: '12345678',
        name: 'Admin',
        role: 'ADMIN',
      },
    ]);
  }
}
