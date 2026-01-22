import { User } from "../../users/user.entity";
import { setSeederFactory } from "typeorm-extension";
export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = "12345678";
  user.role = "admin";
  return user;
});

