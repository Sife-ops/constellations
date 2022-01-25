import argon2 from "argon2";
import { Car } from "../entity/car";
import { User } from "../entity/user";

export const seed = async () => {
  const password = await argon2.hash("pass");
  await User.create({
    email: "wyatt",
    username: "wyatt",
    password,
  }).save();

  const user = await User.findOne({
    where: {
      username: "wyatt",
    },
  });

  await Car.create({
    year: 1990,
    plate: "asdf",
    user,
  }).save();

  await Car.create({
    year: 1992,
    plate: "fdsa",
    user,
  }).save();
};
