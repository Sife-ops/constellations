import * as t from '../utility/token';
import { Request, Response, Router } from 'express';
import { env } from '../utility/constant';
import { verify, JwtPayload } from 'jsonwebtoken';

export const refresh = Router();

refresh.post('/refresh', (req: Request, res: Response) => {
  // todo: logging utility
  console.log('refresh.ts - request cookies:', req.cookies);

  const refreshToken = req.cookies.wg;

  if (!refreshToken) return res.sendStatus(401);

  try {
    // throws if expired
    const { id, remember } = verify(
      refreshToken,
      env.secret.token.refresh
    ) as JwtPayload;

    t.sendRefreshToken(res, { id, remember });

    res.json({ accessToken: t.newAccessToken({ id }) });
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
});
