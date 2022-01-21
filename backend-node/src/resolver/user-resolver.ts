import argon2 from "argon2";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  helloWorld() {
    return "hello";
  }

  @Mutation(() => User)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ) {
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

    // todo: return token
    return user;
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
