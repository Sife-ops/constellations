import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  helloWorld() {
    return "hello";
  }

  @Mutation(() => User)
  async login(@Arg("id") id: number) {
    const user = await User.findOne(id);
    if (!user) {
      throw new Error("username does not exist");
    }
    return user;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ): Promise<boolean> {
    try {
      await User.create({
        email,
        username,
        password,
      }).save();
      return true;
    } catch (e) {
      throw new Error("failed to create user");
    }
  }
}
