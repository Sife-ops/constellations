import { env } from './constant';

export const apiUrl = (): string => {
  if (env.prod) return 'prod url';
  if (env.ngrok_url) return env.ngrok_url + '/api';
  return 'http://localhost:4000';
};

export const emailIsValid = (s: string): boolean => {
  const ex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return ex.test(s.toLowerCase());
};

export const usernameIsValid = (s: string): boolean => {
  if (s === '') return false;
  if (s.length < 5 || s.length > 15) return false;
  if (/\W/.test(s)) return false;
  return true;
};

export const passwordIsValid = (s: string): boolean => {
  if (s === '') return false;
  if (s.length < 8) return false;
  if (!/[0-9]/.test(s)) return false;
  if (!/[!@#\$%\^\&*\)\(+=._-]/.test(s)) return false;
  return true;
};
