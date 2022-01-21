import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Request, Response } from "express";
import { User } from "../entities/user";

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

  @Mutation(() => String)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req, res }: AuthContext
  ): Promise<string> {
    console.log("request cookies:", req.cookies)

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

    // todo: token functions
    const refreshToken = jwt.sign({ id: user.id }, "refresh", {
      expiresIn: 6000,
    });
    res.cookie("wg", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    const accessToken = jwt.sign({ id: user.id }, "access", {
      expiresIn: 1500,
    });

    return accessToken;
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
}
