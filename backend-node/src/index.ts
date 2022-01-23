import "reflect-metadata";
import * as t from "./utility/token";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { Car } from "./entity/car";
import { CarResolver } from "./resolver/car";
import { User } from "./entity/user";
import { UserResolver } from "./resolver/user";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";
import { env } from "./utility/constant";
import { JwtPayload, verify } from "jsonwebtoken";

(async () => {
  console.log("prod:", env.prod);

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
      origin: ["https://studio.apollographql.com", "http://localhost:3001"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.post("/refresh", (req: Request, res: Response) => {
    console.log("request cookies:", req.cookies);

    const refreshToken = req.cookies.wg;
    const bad = { ok: false, accessToken: "" };

    if (!refreshToken) return res.json(bad);

    try {
      // throws if expired
      const payload = verify(refreshToken, env.secret.refreshToken) as JwtPayload;

      const now = new Date().getTime();
      const exp = (payload.exp as number) * 1000;

      console.log("now:", now);
      console.log("exp:", exp);

      const newPayload = { id: payload.id };

      t.sendRefreshToken(res, newPayload);
      res.json({ ok: true, accessToken: t.newAccessToken(newPayload) });
    } catch (e) {
      console.log(e);
      return res.json(bad);
    }
  });

  app.post("/logout", (_: Request, res: Response) => {
    t.clearRefreshToken(res);
    res.json({ ok: "true" });
  });

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
