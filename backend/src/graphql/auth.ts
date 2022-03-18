import { JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { env } from '../utility/constant';

type AuthPayload = JwtPayload & { id: number };

// todo: remove 'Bearer'
export const auth_ = (req: Request): AuthPayload => {
  const auth = req.headers.authorization as string;
  if (!auth) throw new Error('no authorization header');
  const accessToken = auth.split(' ')[1];
  if (!accessToken) throw new Error('no token');
  try {
    const authPayload = verify(accessToken, env.secret.token.access) as AuthPayload;
    return authPayload;
  } catch (e) {
    throw new Error('bad/expired token');
  }
};
