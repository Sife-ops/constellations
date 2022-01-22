import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Car } from "../entity/car";
import { User } from "../entity/user";

@Resolver(Car)
export class CarResolver {
  @Query(() => [Car])
  async cars(): Promise<Car[]> {
    return await Car.find();
  }

  @Mutation(() => Car)
  async carCreate(
    //
    @Arg("userId") userId: number,
    @Arg("year") year: number,
    @Arg("plate") plate: string
  ): Promise<Car> {
    const user = await User.findOne(userId);
    if (!user) throw new Error("user not found");

    const car = await Car.create({
      year,
      plate,
      user,
    }).save()

    return car;
  }
}
