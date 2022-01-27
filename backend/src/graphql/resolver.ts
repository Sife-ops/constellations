import argon2 from "argon2";
import { AuthContext } from "./auth";
import { Car } from "../entity/car";
import { Request, Response } from "express";
import { User } from "../entity/user";

export const resolvers = {
  Query: {
    // todo: delete
    authTest: (_: any, __: any, context: AuthContext) => {
      console.log("authTest");
      console.log(context.payload);
      return `Hello "world"}!`;
    },

    cars: async (): Promise<Car[]> => {
      return await Car.find({ relations: ["user"] });
    },

    // todo: delete
    hello: () => {
      return "hello";
    },

    user: async (_: any, __: any, context: AuthContext): Promise<User> => {
      return await User.findOneOrFail(context.payload!.id);
    },

    // todo: delete
    users: async (): Promise<User[]> => {
      return await User.find({ relations: ["cars"] });
    },
  },
  Mutation: {
    register: async (
      _: any,
      {
        email,
        username,
        password,
      }: { email: string; username: string; password: string }
    ) => {
      if (!email || !username || !password)
        throw new Error("invalid arguments");

      const hashed = await argon2.hash(password);

      const user = await User.create({
        email,
        username,
        password: hashed,
      }).save();

      return { email: user.email, username: user.username };
    },

    userExists: async (
      _: any,
      { email, username }: { email: string; username: string }
    ): Promise<boolean> => {
      if (!email && !username) throw new Error("invalid arguments");

      const user = await User.findOne({
        where: email ? { email } : { username },
      });

      if (!user) return false;

      return true;
    },
  },
};
