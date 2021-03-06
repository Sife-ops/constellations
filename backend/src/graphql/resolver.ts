import argon2 from 'argon2';
import fetch from 'cross-fetch';
import { Bookmark as BookmarkEntity } from '../entity/bookmark';
import { Category as CategoryEntity } from '../entity/category';
import { Request } from 'express';
import { User } from '../entity/user';
import { authorize } from './authorize';
import { captchaUrl } from '../utility/function';
import { env } from '../utility/constant';
import { newAccessToken } from '../utility/token';

/*
 * Loaders
 */

const Bookmark = {
  // todo: use dataloader
  categories: async (parent: BookmarkEntity) => {
    const bookmark = await BookmarkEntity.findOne(parent.id, {
      relations: ['categories'],
    });
    if (!bookmark) return [];
    return bookmark.categories;
  },
};

const Category = {
  bookmarks: async (parent: CategoryEntity) => {
    const category = await CategoryEntity.findOne(parent.id, {
      relations: ['bookmarks'],
    });
    if (!category) return [];
    return category.bookmarks;
  },
};

/*
 * Query
 */

const bookmarks = async (
  _: any,
  __: any,
  { req }: { req: Request }
): Promise<BookmarkEntity[]> => {
  const authPayload = authorize(req);
  const user = await User.findOneOrFail<User>(authPayload.id, {
    relations: ['bookmarks'],
  });
  return user.bookmarks;
};

const categories = async (
  _: any,
  __: any,
  { req }: { req: Request }
): Promise<CategoryEntity[]> => {
  const authPayload = authorize(req);
  const user = await User.findOneOrFail<User>(authPayload.id, {
    relations: ['categories'],
  });
  return user.categories;
};

const user = async (
  _: any,
  __: any,
  { req }: { req: Request }
): Promise<User> => {
  const authPayload = authorize(req);
  return await User.findOneOrFail<User>(authPayload.id, {
    relations: ['bookmarks', 'categories'],
  });
};

/*
 * Mutations
 */

/*
 * Bookmark Add
 */

interface BookmarkAddInput {
  categoryIds: number[];
  description: string;
  url: string;
}

const bookmarkAdd = async (
  _: any,
  { description, url, categoryIds }: BookmarkAddInput,
  { req }: { req: Request }
): Promise<BookmarkEntity> => {
  const authPayload = authorize(req);
  const user = await User.findOneOrFail<User>(authPayload.id, {
    relations: ['bookmarks'],
  });
  const categories = await CategoryEntity.findByIds(categoryIds);
  const bookmark = await BookmarkEntity.create({
    description,
    url,
    user,
    categories,
  }).save();
  return bookmark;
};

/*
 * Bookmark Delete
 */

interface BookmarkDeleteInput {
  id: number;
}

const bookmarkDelete = async (
  _: any,
  { id }: BookmarkDeleteInput,
  { req }: { req: Request }
): Promise<BookmarkEntity> => {
  authorize(req);
  const bookmark = await BookmarkEntity.findOneOrFail(id);
  // todo: returns garbage data
  return await bookmark.remove();
};

/*
 * Bookmark Update
 */

interface bookmarkUpdateInput {
  id: number;
  categoryIds?: number[];
  description?: string;
  url?: string;
}

const bookmarkUpdate = async (
  _: any,
  { id, description, url, categoryIds }: bookmarkUpdateInput,
  { req }: { req: Request }
): Promise<BookmarkEntity> => {
  authorize(req);

  if (!description && !url && !categoryIds)
    throw new Error('invalid arguments');

  const bookmark = await BookmarkEntity.findOneOrFail(id);

  if (description) bookmark.description = description;
  if (url) bookmark.url = url;
  if (categoryIds) {
    const categories = await CategoryEntity.findByIds(categoryIds);
    bookmark.categories = categories;
  }

  return await bookmark.save();
};

/*
 * Category Add
 */

interface CategoryAddInput {
  name: string;
}

const categoryAdd = async (
  _: any,
  { name }: CategoryAddInput,
  { req }: { req: Request }
): Promise<CategoryEntity> => {
  const authPayload = authorize(req);
  const user = await User.findOneOrFail<User>(authPayload.id, {
    relations: ['categories'],
  });
  const category = await CategoryEntity.create({
    name,
    user,
  }).save();
  return category;
};

/*
 * Category Delete
 */

interface CategoryDeleteInput {
  id: number;
}

const categoryDelete = async (
  _: any,
  { id }: CategoryDeleteInput,
  { req }: { req: Request }
): Promise<CategoryEntity> => {
  authorize(req);
  const category = await CategoryEntity.findOneOrFail(id);
  const result = await category.remove();
  return result;
};

/*
 * Category Update
 */

interface CategoryUpdateInput {
  id: number;
  name: string;
}

const categoryUpdate = async (
  _: any,
  { id, name }: CategoryUpdateInput,
  { req }: { req: Request }
): Promise<CategoryEntity> => {
  authorize(req);
  const category = await CategoryEntity.findOneOrFail(id);

  category.name = name;
  const updated = category.save();

  return updated;
};

/*
 * Login
 */

interface LoginInput {
  username: string;
  password: string;
  remember?: boolean;
}

const login = async (
  _: any,
  { username, password, remember }: LoginInput
): Promise<{ accessToken: string }> => {
  const user = await User.findOneOrFail({ where: { username } });

  const verified = await argon2.verify(user.password, password);
  if (!verified) throw new Error('wrong password');

  return {
    accessToken: newAccessToken({
      id: user.id,
      remember: remember ? remember : false,
    }),
  };
};

/*
 * pageTitle
 */

const pageTitle = async (
  _: any,
  i: { url: string },
  c: { req: Request }
): Promise<string> => {
  authorize(c.req);
  return await fetch(i.url).then((res) =>
    res.text().then((body) => {
      const match = body.match(/<title>([^<]*)<\/title>/);
      if (!match || typeof match[1] !== 'string') {
        throw new Error('Unable to parse the title tag');
      }
      return match[1];
    })
  );
};

/*
 * Register
 */

interface RegisterInput {
  username: string;
  password: string;
  captcha?: string;
}

interface RegisterResponse {
  username: string;
}

const register = async (
  _: any,
  { captcha, password, username }: RegisterInput
): Promise<RegisterResponse> => {
  if (env.secret.captcha) {
    if (!captcha) throw new Error('no captcha in request');
    const res = await fetch(captchaUrl(env.secret.captcha, captcha), {
      method: 'POST',
    });
    if (!res.ok) throw new Error('request to captcha service failed');
    // todo: use io-ts
    const json: { success: boolean } = await res.json();
    console.log('resolver.ts - captcha result', json);
    if (!json.success) throw new Error('failed captcha');
  }

  const found = await User.findOne({ where: { username } });
  if (found) throw new Error('username exists');

  const hashed = await argon2.hash(password);

  const user = await User.create({
    username,
    password: hashed,
  }).save();

  return { username: user.username };
};

/*
 * User Exists
 */

interface UserExistsInput {
  email?: string;
  username?: string;
}

const userExists = async (
  _: any,
  { email, username }: UserExistsInput
): Promise<boolean> => {
  if (!email && !username) throw new Error('invalid arguments');
  const user = await User.findOne({ where: email ? { email } : { username } });
  if (!user) return false;
  return true;
};

export const resolvers = {
  Bookmark,
  Category,

  Query: {
    bookmarks,
    categories,
    user,
  },

  Mutation: {
    bookmarkAdd,
    bookmarkDelete,
    bookmarkUpdate,
    categoryAdd,
    categoryDelete,
    categoryUpdate,
    login,
    pageTitle,
    register,
    userExists,
  },
};
