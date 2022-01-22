import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { Car } from "./entity/car";
import { CarResolver } from "./resolver/car";
import { User } from "./entity/user";
import { UserResolver } from "./resolver/user";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";

(async () => {
  try {
    await createConnection({
      type: "sqlite",
      database: "./database/db.sqlite3",
      dropSchema: true,
      entities: [User, Car],
      synchronize: true,
      logging: false,
    });
  } catch (e) {
    console.log(e);
    throw new Error("couldn't connect to database");
  }

  const app = express();

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CarResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  const port = 4000;
  app.listen(port, () => {
    console.log(`running on ${port}`);
  });
})();
