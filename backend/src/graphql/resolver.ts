import * as t from '../utility/token';
import argon2 from 'argon2';
import { AuthContext } from './auth';
import { Bookmark } from '../entity/bookmark';
import { Category } from '../entity/category';
import { User } from '../entity/user';

interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterInput {
  email: string;
  username: string;
  password: string;
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
      if (!context.payload) throw new Error('missing payload');
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
      if (!context.payload) throw new Error('missing payload');
      const user = await User.findOne(context.payload.id);
      if (!user) throw new Error('user not found');
      return await Bookmark.find({ where: { user } });
    },

    categories: async (
      _: any,
      __: any,
      context: AuthContext
    ): Promise<Category[]> => {
      if (!context.payload) throw new Error('missing payload');
      const user = await User.findOne(context.payload.id);
      if (!user) throw new Error('user not found');
      return await Category.find({ where: { user } });
    },

    user: async (_: any, __: any, context: AuthContext): Promise<User> => {
      if (!context.payload) throw new Error('missing payload');
      const user = await User.findOne(context.payload.id, {
        relations: ['bookmarks', 'categories'],
      });
      if (!user) throw new Error('user not found');
      return user;
    },
  },

  Mutation: {
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
      { email, username, password }: RegisterInput
    ): Promise<{ email: string; username: string }> => {
      if (!email || !username || !password) {
        throw new Error('invalid arguments');
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
