import { env } from "./constant";

export const apiUrl = (): string => {
  if (env.prod) return "prod url";
  if (env.ngrok_url) return env.ngrok_url + "/api";
  return "http://localhost:4000";
};

export const validateEmail = (email: string): boolean => {
  const ex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return ex.test(email.toLowerCase());
};

export const validateUsername = (username: string): boolean => {
  if (username === "") return false;
  if (username.length < 5 || username.length > 15) return false;
  if (/\W/.test(username)) return false;
  return true;
};

export const validatePassword = (password: string): boolean => {
  if (password === "") return false;
  if (password.length < 8) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#\$%\^\&*\)\(+=._-]/.test(password)) return false;
  return true;
};
