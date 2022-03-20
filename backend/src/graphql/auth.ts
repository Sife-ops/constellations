import { JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { env } from '../utility/constant';

type AuthPayload = JwtPayload & { id: number };

export const auth_ = (req: Request): AuthPayload => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new Error('no authorization header/token');
  try {
    const authPayload = verify(
      accessToken,
      env.secret.token.access
    ) as AuthPayload;
    return authPayload;
  } catch (e) {
    throw new Error('bad/expired token');
  }
};
