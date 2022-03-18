import * as t from '../utility/token';
import { Request, Response, Router } from 'express';
import { env } from '../utility/constant';
import { verify, JwtPayload } from 'jsonwebtoken';

const refresh = Router();

refresh.post('/refresh', (req: Request, res: Response) => {
  // todo: logging utility
  console.log('refresh.ts - request cookies:', req.body.accessToken);
  // todo: use either 'token' or 'accessToken' consistently
  const accessToken = req.body.accessToken as string | undefined;
  if (!accessToken) return res.sendStatus(401);
  try {
    // throws if expired
    const { id, remember } = verify(
      accessToken,
      env.secret.token.access
    ) as JwtPayload & { id: number; remember: boolean };
    res.json({ accessToken: t.newAccessToken({ id, remember }) });
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
});

export { refresh };
