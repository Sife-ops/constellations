import decode, { JwtPayload } from 'jwt-decode';

let token: string = '';

export const getAccessToken = (): string => token;

export const setAccessToken = (s: string): string => {
  token = s;
  return token;
};

export const isValid = (t: string): boolean => {
  if (!t) return false;
  const decoded = decode<JwtPayload>(t);
  const now = new Date().getTime();
  const offset = 1000;
  console.log(now)
  if (now + offset > decoded.exp! * 1000) return false;
  return true;
};
