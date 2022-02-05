import argon2 from 'argon2';
import { Request, Response, Router } from 'express';
import { User } from '../entity/user';

export const register = Router();

register.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body as {
    email: string;
    username: string;
    password: string;
  };

  if (!email || !username || !password) return res.sendStatus(400);

  try {
    const hashed = await argon2.hash(password);

    const user = await User.create({
      email,
      username,
      password: hashed,
    }).save();

    res.json({
      email: user.email,
      username: user.username,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
});
