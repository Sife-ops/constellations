import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { env } from "./constant";

export const newAccessToken = (payload: { id: number }): string => {
  return jwt.sign(payload, env.secret.accessToken, {
    expiresIn: env.prod ? "24h" : "15s",
  });
};

export const newRefreshToken = (payload: { id: number }): string => {
  return jwt.sign(payload, env.secret.refreshToken, {
    expiresIn: env.prod ? "7d" : "1h",
  });
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const sendRefreshToken = (res: Response, payload: { id: number }) => {
  res.cookie("wg", newRefreshToken(payload), cookieOptions);
};

export const clearRefreshToken = (res: Response) => {
  res.clearCookie("wg", cookieOptions);
};
