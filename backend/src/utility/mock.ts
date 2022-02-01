import { Bookmark } from "../entity/bookmark";
import { Category } from "../entity/category";
import { User } from "../entity/user";

const mockBookmarks = require("../../mock-data/bookmark.json").slice(
  0,
  100
) as Bookmark[];

const mockUsers = require("../../mock-data/user.json").slice(0, 3) as User[];
const mockCategories = require("../../mock-data/category.json") as Category[];

export const seed = async () => {
  for (const user of mockUsers) {
    await User.create(user).save();
  }

  let users = await User.find();

  for (const user of users) {
    let tries = randomInd(mockCategories, 1);
    if (tries < 3) tries = 3;

    let categoryInds: number[] = [];
    for (let i = 0; i < tries; i++) {
      while (true) {
        const ind = randomInd(mockCategories);
        const found = categoryInds.find((e) => e === ind);
        if (found) continue;
        categoryInds = categoryInds.concat(ind);
        break;
      }
    }

    let categories: Category[] = [];
    for (let i = 0; i < categoryInds.length; i++) {
      const { name } = mockCategories[categoryInds[i]];
      const category = await Category.create({ name }).save();
      categories = categories.concat(category);
    }

    user.categories = categories;
    await user.save();
  }

  for (const mockBookmark of mockBookmarks) {
    const user = await User.findOne(randomInd(mockUsers) + 1, {
      relations: ["categories", "bookmarks"],
    });
    if (!user) continue;

    const bookmark = await Bookmark.create(mockBookmark).save();
    user.bookmarks = user.bookmarks.concat(bookmark);
    await user.save();

    const tries = randomInd(user.categories, 1);
    let categoryIds: number[] = [];
    for (let i = 0; i < tries; i++) {
      while (true) {
        const category = user.categories[randomInd(user.categories)];
        const found = categoryIds.find((e) => e === category.id);
        if (found) continue;
        categoryIds = categoryIds.concat(category.id);
        break;
      }
    }

    for (const categoryId of categoryIds) {
      const category = await Category.findOne(categoryId, {
        relations: ["bookmarks"],
      });
      if (!category) continue;
      category.bookmarks = category.bookmarks.concat(bookmark);
      await category.save();
    }
  }

  console.log("finished seed");
};

const randomInd = (arr: any[], plus: number = 0) => {
  return Math.floor(Math.random() * (arr.length + plus));
};
