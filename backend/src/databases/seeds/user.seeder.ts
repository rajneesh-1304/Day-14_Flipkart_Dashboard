import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../users/user.entity";
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: "admin@gmail.com",
        password: "12345678",
        name: "Admin",
        role: "admin",
      },
    ]);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}