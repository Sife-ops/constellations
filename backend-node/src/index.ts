import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
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
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  const port = 4000;
  app.listen(port, () => {
    console.log(`running on ${port}`);
  });
})();
