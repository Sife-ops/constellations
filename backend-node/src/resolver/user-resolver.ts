import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";

@Resolver(User)
export class UserResolver {
  @Query((returns) => String)
  helloWorld() {
    return "hello world";
  }

  @Mutation((returns) => User)
  async login(@Arg("id") id: number) {
    const user = await User.findOne(id);
    if (!user) {
      throw new Error("username does not exist");
    }
    return user;
  }
}
