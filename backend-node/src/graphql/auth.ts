import { env } from "../utility/constant";
import { JwtPayload, verify } from "jsonwebtoken";

export const auth = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  const operation = context.req.body.operationName;
  if (
    //
    operation === "AuthTest" ||
    operation === "User"
  ) {
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
  }

  const result = await resolve(root, args, context, info);
  return result;
};
