import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CookieOptions, Request, Response } from "express";
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

    sendRefreshToken(res, { id: user.id });

    return newAccessToken({ id: user.id });
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

const newRefreshToken = (payload: { id: number }): string => {
  return jwt.sign(
    //
    payload,
    "refresh",
    {
      expiresIn: 6000,
    }
  );
};

const newAccessToken = (payload: { id: number }): string => {
  return jwt.sign(
    //
    payload,
    "access",
    {
      expiresIn: 1500,
    }
  );
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

const sendRefreshToken = (res: Response, payload: { id: number }) => {
  res.cookie("wg", newRefreshToken(payload), cookieOptions);
};
