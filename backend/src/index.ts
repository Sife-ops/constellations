import 'reflect-metadata';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Bookmark } from './entity/bookmark';
import { Category } from './entity/category';
import { User } from './entity/user';
import { createConnection } from 'typeorm';
import { env } from './utility/constant';
import { logout } from './rest/logout';
import { refresh } from './rest/refresh';
import { resolvers } from './graphql/resolver';
import { seed } from './utility/mock';
import { typeDefs } from './graphql/typedef';

(async () => {
  console.log(env);

  /*
   * Database
   */

  try {
    await createConnection({
      type: 'sqlite',
      database: './database/db.sqlite3',
      dropSchema: env.seed,
      entities: [User, Bookmark, Category],
      synchronize: true,
      logging: false,
    });
  } catch (e) {
    console.log(e);
    throw new Error("couldn't connect to database");
  }

  if (env.seed) await seed();

  /*
   * Express
   */

  const app = express();

  app.use(cors({ origin: env.origin, credentials: true }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(logout);

  /*
   * Graphql
   */

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  /*
   * Start
   */

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen(env.port, () => {
    console.log('Ready.');
  });
})();
