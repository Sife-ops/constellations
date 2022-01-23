import * as t from "../utility/token";
import argon2 from "argon2";
import { auth } from "../utility/auth";
import { Request, Response } from "express";
import { User } from "../entity/user";

import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

interface Context {
  req: Request;
  res: Response;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User)
  @UseMiddleware(auth)
  async user(@Arg("id", () => Int) id: number): Promise<User> {
    return await User.findOneOrFail(id);
  }

  @Mutation(() => User)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ): Promise<User> {
    try {
      const hashed = await argon2.hash(password);

      const user = await User.create({
        email,
        username,
        password: hashed,
      }).save();

      // todo: object does not have id
      return user;
    } catch (e) {
      console.log(e);
      throw new Error("failed to create user");
    }
  }

  // todo: use findOneOrFail
  @Mutation(() => String)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req, res }: Context
  ): Promise<string> {
    console.log("user.ts - request cookies:", req.cookies);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("user does not exist");
    }

    const verified = await argon2.verify(user.password, password);
    if (!verified) {
      throw new Error("incorrect password");
    }

    t.sendRefreshToken(res, { id: user.id });

    return "ok";
  }

  // todo: query or mutation?
  @Mutation(() => Boolean)
  async userExists(
    @Arg("email", () => String, { nullable: true }) email?: string,
    @Arg("username", () => String, { nullable: true }) username?: string
  ): Promise<boolean> {
    if (!username && !email) {
      throw new Error("invalid query args");
    }

    const fieldIs = () => {
      if (username) return { username };
      return { email };
    };

    const user = await User.findOne({
      where: fieldIs(),
    });

    if (!user) return false;

    return true;
  }
}
