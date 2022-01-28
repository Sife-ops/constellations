import * as t from "../utility/token";
import argon2 from "argon2";
import { Request, Response, Router } from "express";
import { User } from "../entity/user";

export const login = Router();

login.post("/login", async (req: Request, res: Response) => {
  const { email, password, remember } = req.body as {
    email: string;
    password: string;
    remember: boolean;
  };

  if (!email || !password || remember === undefined) {
    return res.sendStatus(400);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) return res.sendStatus(401);

  const verified = await argon2.verify(user.password, password);
  if (!verified) return res.sendStatus(401);

  // todo: implement 'remember me' for rest
  t.sendRefreshToken(res, { id: user.id, remember });
  const accessToken = t.newAccessToken({ id: user.id });

  res.json({ accessToken });
});

export const logout = Router();

logout.post("/logout", (_: Request, res: Response) => {
  t.clearRefreshToken(res);
  res.sendStatus(200);
});
