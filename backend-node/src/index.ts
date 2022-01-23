import "reflect-metadata";
import * as t from "./utility/token";
import argon2 from "argon2";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { Car } from "./entity/car";
import { CarResolver } from "./resolver/car";
import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "./entity/user";
import { UserResolver } from "./resolver/user";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";
import { env } from "./utility/constant";
import { login, logout } from "./rest/login";
import { register } from "./rest/register";
import { refresh } from "./rest/refresh";

(async () => {
  console.log(env);

  // todo: move orm config
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

  const password = await argon2.hash("pass");
  await User.create({
    email: "wyatt",
    username: "wyatt",
    password,
  }).save();

  const app = express();

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3001"],
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(refresh);
  app.use(register)
  app.use(login);
  app.use(logout);

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
