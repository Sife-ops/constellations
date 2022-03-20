import decode, { JwtPayload } from 'jwt-decode';

let accessToken: string = '';

export const getAccessToken = (): string => accessToken;

export const setAccessToken = (s: string): string => {
  accessToken = s;
  return accessToken;
};

export const isValid = (accessToken: string, millisOld?: number): boolean => {
  if (!accessToken) return false;
  const decoded = decode<JwtPayload>(accessToken);

  if (!decoded.iat) return false;
  const issuedAt = decoded.iat * 1000;

  if (!decoded.exp) return false;
  const expiration = decoded.exp * 1000;

  const now = new Date().getTime();
  const offset = 10000;

  if (millisOld) {
    if (now - issuedAt > millisOld) return false;
  }

  if (now + offset > expiration) return false;

  return true;
};
