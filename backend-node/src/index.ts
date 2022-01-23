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

(async () => {
  console.log(env);

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

  app.post("/refresh", (req: Request, res: Response) => {
    // todo: logging utility
    console.log("index.ts - request cookies:", req.cookies);

    const refreshToken = req.cookies.wg;
    const bad = { ok: false, accessToken: "" };

    if (!refreshToken) return res.json(bad);

    try {
      // throws if expired
      const payload = verify(
        refreshToken,
        env.secret.refreshToken
      ) as JwtPayload;

      // todo: debug mode
      // const now = new Date().getTime();
      // const exp = (payload.exp as number) * 1000;
      // console.log("index.ts - now:", now);
      // console.log("index.ts - exp:", exp);

      const newPayload = { id: payload.id };

      t.sendRefreshToken(res, newPayload);
      res.json({ ok: true, accessToken: t.newAccessToken(newPayload) });
    } catch (e) {
      console.log(e);
      return res.json(bad);
    }
  });

  // todo: rest register

  app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) return res.sendStatus(400);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    const bad = { ok: false, accessToken: "" };

    if (!user) return res.json(bad);

    const verified = await argon2.verify(user.password, password);

    if (!verified) return res.json(bad);

    t.sendRefreshToken(res, { id: user.id });

    const accessToken = t.newAccessToken({ id: user.id });
    res.json({
      ok: true,
      accessToken,
    });
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
