import * as t from '../utility/token';
import { Request, Response, Router } from 'express';

const logout = Router();

logout.post('/logout', (_: Request, res: Response) => {
  t.clearRefreshToken(res);
  res.sendStatus(200);
});

export { logout };
