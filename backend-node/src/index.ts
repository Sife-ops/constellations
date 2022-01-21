import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entities/user";
import { UserResolver } from "./resolver/user-resolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

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
  console.log("hello");

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = 4000;
  app.listen(port, () => {
    console.log(`running on ${port}`);
  });
})();
