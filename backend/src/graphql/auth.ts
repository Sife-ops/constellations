import { env } from '../utility/constant';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

const operationsWithAuth = [
  'BookmarkAdd',
  'BookmarkDelete',
  'BookmarkUpdate',
  'Bookmarks',
  'Categories',
  'CategoryAdd',
  'CategoryDelete',
  'CategoryUpdate',
  'User',
  '_dev2',
];

// todo: use Array.prototype.find
const isOperationWithAuth = (s: string): boolean => {
  for (let i = 0; i < operationsWithAuth.length; i++) {
    if (s === operationsWithAuth[i]) return true;
  }
  return false;
};

export interface AuthContext {
  req: Request;
  res: Response;
  payload?: JwtPayload;
}

export const auth = async (
  resolve: any,
  root: any,
  args: any,
  context: AuthContext,
  info: any
) => {
  if (isOperationWithAuth(context.req.body.operationName)) {
    const auth = context.req.headers.authorization as string;
    if (!auth) throw new Error('no authorization header');

    const accessToken = auth.split(' ')[1];
    if (!accessToken) throw new Error('no token');

    try {
      // throws if expired
      const payload = verify(accessToken, env.secret.accessToken) as JwtPayload;
      context.payload = payload;
    } catch (e) {
      console.log(e);
      throw new Error('bad token');
    }
  }

  const result = await resolve(root, args, context, info);
  return result;
};
