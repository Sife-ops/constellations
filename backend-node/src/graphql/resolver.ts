import { Car } from "../entity/car";
import { User } from "../entity/user";

export const resolvers = {
  Query: {
    authTest: (_: any, __: any, context: any) => {
      console.log("authTest");
      console.log(context.payload);
      return `Hello "world"}!`;
    },

    hello: () => {
      return "hello";
    },

    user: async (_: any, __: any, context: any): Promise<User> => {
      console.log(context.payload);
      return await User.findOneOrFail(context.payload.id);
    },

    users: async (): Promise<User[]> => {
      return await User.find({ relations: ["cars"] });
    },

    cars: async (): Promise<Car[]> => {
      return await Car.find({ relations: ["user"] });
    },
  },
};
