import jwt from 'jsonwebtoken';
import { env } from './constant';

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
