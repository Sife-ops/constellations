import * as t from "../utility/token";
import { Request, Response, Router } from "express";
import { env } from "../utility/constant";
import { verify, JwtPayload } from "jsonwebtoken";

export const refresh = Router();

refresh.post("/refresh", (req: Request, res: Response) => {
  // todo: logging utility
  console.log("refresh.ts - request cookies:", req.cookies);

  const refreshToken = req.cookies.wg;
  const bad = { ok: false, accessToken: "" };

  // if (!refreshToken) return res.json(bad);
  if (!refreshToken) return res.sendStatus(401);

  try {
    // throws if expired
    const payload = verify(refreshToken, env.secret.refreshToken) as JwtPayload;

    const newPayload = { id: payload.id };

    t.sendRefreshToken(res, newPayload);
    res.json({ accessToken: t.newAccessToken(newPayload) });
  } catch (e) {
    console.log(e);
    // return res.json(bad);
    return res.sendStatus(401);
  }
});
