import { User } from "../entity/user";
import { auth } from "../utility/auth";

import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

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
