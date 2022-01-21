import { createConnection } from "typeorm";
import "reflect-metadata";
import { User } from "./entities/user";

(async () => {
  try {
    await createConnection({
      type: "sqlite",
      database: "./database/db.sqlite3",
      dropSchema: true,
      entities: [User],
      synchronize: true,
      logging: false,
    });
  } catch (e) {
    console.log(e);
    throw new Error("couldn't connect to database");
  }

  await User.create({
    email: "wyatt.goettsch@gmail.com",
    username: "wyatt",
    password: "pass",
  }).save();

  const user = await User.find({
    where: {
      username: "wyatt",
    },
  });

  console.log(user);
})();
