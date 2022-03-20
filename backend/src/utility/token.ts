import jwt from 'jsonwebtoken';
import { CookieOptions, Response } from 'express';
import { env } from './constant';

interface RefreshPayload {
  id: number;
  remember: boolean;
}

export const newAccessToken = (payload: {
  id: number;
  remember: boolean;
}): string => {
  const time = (): string => {
    if (env.prod) {
      if (payload.remember) return '7d';
      return '1d';
    }
    if (payload.remember) return '120s';
    return '60s';
  };
  return jwt.sign(payload, env.secret.token.access, {
    expiresIn: time(),
  });
};

export const newRefreshToken = (payload: RefreshPayload): string => {
  return jwt.sign(payload, env.secret.token.refresh, {
    expiresIn: payload.remember ? '7d' : '1h',
  });
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

export const sendRefreshToken = (res: Response, payload: RefreshPayload) => {
  res.cookie('wg', newRefreshToken(payload), cookieOptions);
};

export const clearRefreshToken = (res: Response) => {
  res.clearCookie('wg', cookieOptions);
};
