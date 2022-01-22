import * as t from "../utility/token";
import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Request, Response } from "express";
import { User } from "../entity/user";

interface AuthContext {
  req: Request;
  res: Response;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  helloWorld() {
    return "hello";
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find();
    if (!users) throw new Error("not found");
    return users;
  }

  @Mutation(() => User)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ): Promise<User> {
    try {
      const hashed = await argon2.hash(password);
      await User.create({
        email,
        username,
        password: hashed,
      }).save();
    } catch (e) {
      console.log(e);
      throw new Error("failed to create user");
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("failed to create user");
    }

    return user;
  }

  @Mutation(() => String)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req, res }: AuthContext
  ): Promise<string> {
    console.log("request cookies:", req.cookies);

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

    return t.newAccessToken({ id: user.id });
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
