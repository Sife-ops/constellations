import argon2 from 'argon2';
import { Bookmark } from '../entity/bookmark';
import { Category } from '../entity/category';
import { User } from '../entity/user';

export const seed = async () => {
  /*
   * playwright test users
   */
  const pwTestUser = {
    username: 'playwright00',
    password: await argon2.hash('testtest1!'),
  };

  const found = await User.findOne({
    where: {
      username: pwTestUser.username,
    },
  });

  if (found) {
    console.log(`found playwright test user: ${pwTestUser.username}`);
    return;
  }

  console.log(`creating playwright test user: ${pwTestUser.username}`);
  const category00 = await Category.create({ name: 'category00' }).save();
  const category01 = await Category.create({ name: 'category01' }).save();

  const bookmark00 = await Bookmark.create({
    url: 'http://bookmark00.com',
    description: 'bookmark00',
    categories: [category00],
  }).save();
  const bookmark01 = await Bookmark.create({
    url: 'http://bookmark01.com',
    description: 'bookmark01',
    categories: [category01],
  }).save();
  const bookmark02 = await Bookmark.create({
    url: 'http://bookmark02.com',
    description: 'bookmark02',
    categories: [category00, category01],
  }).save();
  const bookmark03 = await Bookmark.create({
    url: 'http://bookmark03.com',
    description: 'bookmark03',
  }).save();

  await User.create(pwTestUser).save();
  const user = await User.findOneOrFail({
    where: {
      username: pwTestUser.username,
    },
    relations: ['categories', 'bookmarks'],
  });
  user.categories = [category00, category01];
  user.bookmarks = [bookmark00, bookmark01, bookmark02, bookmark03];
  await user.save();
};
