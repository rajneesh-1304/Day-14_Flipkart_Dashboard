// import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { AppDataSource } from "./data-source";
// import UserSeeder from "./src/databases/seeds/user.seeder";
// import UserFactory from "./src/databases/factories/user.factory";
(async () => {
  await AppDataSource.initialize();
  await runSeeders(AppDataSource);
})();