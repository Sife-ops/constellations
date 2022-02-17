import jwt from 'jsonwebtoken';
import { CookieOptions, Response } from 'express';
import { env } from './constant';

interface RefreshPayload {
  id: number;
  remember: boolean;
}

export const newAccessToken = (payload: { id: number }): string => {
  return jwt.sign(payload, env.secret.accessToken, {
    // expiresIn: env.prod ? '15m' : '15m',
    expiresIn: '15m',
  });
};

export const newRefreshToken = (payload: RefreshPayload): string => {
  return jwt.sign(payload, env.secret.refreshToken, {
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
