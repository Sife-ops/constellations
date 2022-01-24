import { User } from "../entity/user";
import { auth, AuthContext } from "../utility/auth";

import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(auth)
  async user(@Ctx() { payload }: AuthContext): Promise<User> {
    return await User.findOneOrFail(payload.id);
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
