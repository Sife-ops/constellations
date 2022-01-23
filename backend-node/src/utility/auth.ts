import { MiddlewareFn } from "type-graphql";
import { Request, Response } from "express";
import { env } from "./constant";
import { JwtPayload, verify } from "jsonwebtoken";

export interface AuthContext {
  req: Request;
  res: Response;
  payload: JwtPayload;
}

export const auth: MiddlewareFn<AuthContext> = async ({ context }, next) => {
  console.log("auth.ts - request headers:", context.req.headers.authorization);

  const auth = context.req.headers.authorization as string;
  if (!auth) throw new Error("no authorization header");
  const accessToken = auth.split(" ")[1];
  if (!accessToken) throw new Error("no token");

  try {
    const payload: JwtPayload = verify(
      accessToken,
      env.secret.accessToken
    ) as JwtPayload;
    context.payload = payload;
  } catch (e) {
    console.log(e);
    throw new Error("bad token");
  }

  return next();
};
