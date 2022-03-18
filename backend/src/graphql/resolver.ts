import * as t from '../utility/token';
import argon2 from 'argon2';
import fetch from 'cross-fetch';
import { Bookmark as BookmarkEntity } from '../entity/bookmark';
import { Category as CategoryEntity } from '../entity/category';
import { Request, Response } from 'express';
import { User } from '../entity/user';
import { auth_ } from './auth';
import { env } from '../utility/constant';

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

const _dev0 = () => 'hello';

const _dev1 = async (): Promise<User[]> => {
  return await User.find({ relations: ['bookmarks', 'categories'] });
};

const _dev2 = async (
  _: any,
  __: any,
  { req }: { req: Request }
): Promise<User> => {
  const authPayload = auth_(req);
  return await User.findOneOrFail<User>(authPayload.id);
};

const _dev3 = async (_: any, { id }: { id: number }): Promise<User> => {
  return await User.findOneOrFail(id);
};

const bookmarks = async (
  _: any,
  __: any,
  { req }: { req: Request }
): Promise<BookmarkEntity[]> => {
  const authPayload = auth_(req);
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
  const authPayload = auth_(req);
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
  const authPayload = auth_(req);
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
  const authPayload = auth_(req);
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
  { id }: BookmarkDeleteInput
): Promise<BookmarkEntity> => {
  const bookmark = await BookmarkEntity.findOneOrFail(id);
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
  { id, description, url, categoryIds }: bookmarkUpdateInput
): Promise<BookmarkEntity> => {
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
  const authPayload = auth_(req);
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
  { id }: CategoryDeleteInput
): Promise<CategoryEntity> => {
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
  { id, name }: CategoryUpdateInput
): Promise<CategoryEntity> => {
  const category = await CategoryEntity.findOneOrFail(id);

  category.name = name;
  const updated = category.save();

  return updated;
};

/*
 * Login
 */

interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

const login = async (
  _: any,
  { email, password, remember }: LoginInput
): Promise<{ token: string }> => {
  const user = await User.findOneOrFail({ where: { email } });

  const verified = await argon2.verify(user.password, password);
  if (!verified) throw new Error('wrong password');

  return {
    token: t.newAccessToken({ id: user.id, remember }),
  };
};

/*
 * Register
 */

interface RegisterInput {
  email: string;
  username: string;
  password: string;
  captcha?: string;
}

interface RegisterResponse {
  email: string;
  username: string;
}

const register = async (
  _: any,
  { captcha, email, password, username }: RegisterInput
): Promise<RegisterResponse> => {
  if (env.secret.captcha) {
    if (!captcha) throw new Error('invalid captcha');
    // todo: move to constant.ts
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${env.secret.captcha}&response=${captcha}`;
    const res = await fetch(url, { method: 'POST' });
    const json: { success: boolean } = await res.json();
    console.log('resolver.ts - captcha result', json);
    if (!json.success) throw new Error('failed captcha');
  }

  {
    const found = await User.findOne({ where: { email } });
    if (found) throw new Error('email exists');
  }

  {
    const found = await User.findOne({ where: { username } });
    if (found) throw new Error('username exists');
  }

  const hashed = await argon2.hash(password);

  const user = await User.create({
    email,
    username,
    password: hashed,
  }).save();

  return { email: user.email, username: user.username };
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
    _dev0,
    _dev1,
    _dev2,
    _dev3,
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
    register,
    userExists,
  },
};
