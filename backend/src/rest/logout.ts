import * as t from '../utility/token';
import argon2 from 'argon2';
import { Request, Response, Router } from 'express';
import { User } from '../entity/user';

const logout = Router();

logout.post('/logout', (_: Request, res: Response) => {
  t.clearRefreshToken(res);
  res.sendStatus(200);
});

export { logout };
