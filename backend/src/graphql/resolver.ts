import * as t from '../utility/token';
import argon2 from 'argon2';
import fetch from 'cross-fetch';
import { AuthContext } from './auth';
import { Bookmark } from '../entity/bookmark';
import { Category } from '../entity/category';
import { User } from '../entity/user';
import { env } from '../utility/constant';

interface AddUpdateBookmarkInput {
  id?: number;
  categoryIds: number[];
  description: string;
  url: string;
}

interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterInput {
  email: string;
  username: string;
  password: string;
  captcha?: string;
}

interface UserExistsInput {
  email?: string;
  username?: string;
}

export const resolvers = {
  Bookmark: {
    // todo: use dataloader
    categories: async (parent: Bookmark) => {
      const bookmark = await Bookmark.findOne(parent.id, {
        relations: ['categories'],
      });
      if (!bookmark) return [];
      return bookmark.categories;
    },
  },

  Category: {
    bookmarks: async (parent: Category) => {
      const category = await Category.findOne(parent.id, {
        relations: ['bookmarks'],
      });
      if (!category) return [];
      return category.bookmarks;
    },
  },

  Query: {
    _dev0: () => 'hello',

    _dev1: async (): Promise<User[]> => {
      return await User.find({ relations: ['bookmarks', 'categories'] });
    },

    _dev2: async (_: any, __: any, context: AuthContext): Promise<User> => {
      if (!context.payload) throw new Error('missing token');
      return await User.findOneOrFail(context.payload.id);
    },

    _dev3: async (_: any, { id }: { id: number }): Promise<User> => {
      if (!id) throw new Error('invalid arguments');
      return await User.findOneOrFail(id);
    },

    bookmarks: async (
      _: any,
      __: any,
      context: AuthContext
    ): Promise<Bookmark[]> => {
      if (!context.payload) throw new Error('missing token');
      const user = await User.findOne(context.payload.id);
      if (!user) throw new Error('user not found');
      return await Bookmark.find({ where: { user } });
    },

    categories: async (
      _: any,
      __: any,
      context: AuthContext
    ): Promise<Category[]> => {
      if (!context.payload) throw new Error('missing token');
      const user = await User.findOne(context.payload.id);
      if (!user) throw new Error('user not found');
      return await Category.find({ where: { user } });
    },

    user: async (_: any, __: any, context: AuthContext): Promise<User> => {
      if (!context.payload) throw new Error('missing token');
      const user = await User.findOne(context.payload.id, {
        relations: ['bookmarks', 'categories'],
      });
      if (!user) throw new Error('user not found');
      return user;
    },
  },

  Mutation: {
    bookmarkAdd: async (
      _: any,
      { description, url, categoryIds }: AddUpdateBookmarkInput,
      { payload }: AuthContext
    ): Promise<Bookmark> => {
      if (!description || !url || !categoryIds)
        throw new Error('invalid arguments');
      if (!payload) throw new Error('missing token');

      const user = await User.findOne(payload.id, {
        relations: ['bookmarks'],
      });

      const categories = await Category.findByIds(categoryIds);

      const bookmark = await Bookmark.create({
        description,
        url,
        user,
        categories,
      }).save();

      return bookmark;
    },

    bookmarkDelete: async (
      _: any,
      { id }: { id: number }
    ): Promise<Bookmark> => {
      const bookmark = await Bookmark.findOne(id);
      if (!bookmark) throw new Error('bookmark not found');

      const result = await bookmark.remove();

      return result;
    },

    bookmarkUpdate: async (
      _: any,
      { id, description, url, categoryIds }: AddUpdateBookmarkInput
    ): Promise<Bookmark> => {
      const bookmark = await Bookmark.findOne(id);
      if (!bookmark) throw new Error('bookmark not found');

      const categories = await Category.findByIds(categoryIds);

      if (description) bookmark.description = description;
      if (url) bookmark.url = url;
      bookmark.categories = categories;
      const updated = bookmark.save();

      return updated;
    },

    categoryAdd: async (
      _: any,
      { name }: { name: string },
      { payload }: AuthContext
    ): Promise<Category> => {
      if (!name) throw new Error('invalid arguments');
      if (!payload) throw new Error('missing token');

      const user = await User.findOne(payload.id, {
        relations: ['categories'],
      });

      const category = await Category.create({
        name,
        user,
      }).save();

      return category;
    },

    categoryDelete: async (
      _: any,
      { id }: { id: number }
    ): Promise<Category> => {
      const category = await Category.findOne(id);
      if (!category) throw new Error('category not found');

      const result = await category.remove();

      return result;
    },

    categoryUpdate: async (
      _: any,
      { id, name }: { id: number; name: string }
    ): Promise<Category> => {
      if (!name) throw new Error('invalid arguments');

      const category = await Category.findOne(id);
      if (!category) throw new Error('category not found');

      category.name = name;
      const updated = category.save();

      return updated;
    },

    login: async (
      _: any,
      { email, password, remember }: LoginInput,
      { res }: AuthContext
    ): Promise<User> => {
      if (!email || !password || remember === undefined) {
        throw new Error('invalid arguments');
      }

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('user not found');

      const verified = await argon2.verify(user.password, password);
      if (!verified) throw new Error('wrong password');

      t.sendRefreshToken(res, { id: user.id, remember });

      return user;
    },

    register: async (
      _: any,
      { captcha, email, password, username }: RegisterInput
    ): Promise<{ email: string; username: string }> => {
      if (env.secret.captcha) {
        if (!captcha) throw new Error('no captcha');
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
    },

    userExists: async (
      _: any,
      { email, username }: UserExistsInput
    ): Promise<boolean> => {
      if (!email && !username) throw new Error('invalid arguments');

      const user = await User.findOne({
        where: email ? { email } : { username },
      });

      if (!user) return false;

      return true;
    },
  },
};
