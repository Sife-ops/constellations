import React from 'react';
import { Bookmark as BookmarkType, useUserQuery } from '../../generated/graphql';
import { Bookmark } from './bookmark';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { Category } from './category';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { useCategoriesState } from './use-categories-state';

export const Home: React.FC = () => {
  /**
   * User query
   */
  const [userRes, userReexec] = useUserQuery();
  const { data, fetching, error } = userRes;

  /**
   * Categories
   */
  const [showAddCategory, setShowAddCategory] = React.useState<boolean>(false);

  const {
    //
    categories,
    toggleCategorySelected,
    updateCategories,
  } = useCategoriesState(null);

  React.useEffect(() => {
    const categories = data?.user?.categories;
    if (!fetching && !error && categories) {
      updateCategories(categories);
    }
  }, [userRes.fetching]);

  const Categories = categories?.map((e) => (
    <Category
      //
      category={e}
      key={e?.id}
      toggleCategorySelected={toggleCategorySelected}
      userReexec={userReexec}
    />
  ));

  /**
   * Filter bar
   */
  const [searchBar, setSearchBar] = React.useState<string>('');

  /**
   * Add bookmark
   */
  const [showAddBookmark, setShowAddBookmark] = React.useState<boolean>(false);

  /**
   * Bookmark table
   */
  const [bookmarks, setBookmarks] = React.useState<(BookmarkType | null)[] | null>(null);

  React.useEffect(() => {
    const bookmarks = data?.user?.bookmarks;
    if (!fetching && !error && bookmarks) {
      setBookmarks(bookmarks);
    }
  }, [userRes.fetching]);

  // at least one category is selected
  const isCategorySelected = categories?.find((e) => e?.selected);

  const selectedCategories = categories?.filter((e) => e?.selected);

  // filter by category
  let filteredBookmarks = bookmarks?.filter((e) => {
    if (!isCategorySelected) return true;
    if (!e?.categories) return false;
    for (const bookmarkCategory of e?.categories) {
      const hasSelectedCategory = selectedCategories?.find((e) => e?.id === bookmarkCategory?.id);
      if (hasSelectedCategory) return true;
    }
    return false;
  });

  // filter by search bar
  filteredBookmarks = filteredBookmarks?.filter((e) => {
    if (searchBar === '') return true;
    return e?.description?.toLowerCase().includes(searchBar.toLowerCase());
  });

  const BookmarkRows = filteredBookmarks?.map((e) => (
    <Bookmark
      //
      bookmark={e}
      categories={categories}
      key={e?.id}
      userReexec={userReexec}
    />
  ));

  return (
    <div>
      {/* todo */}

      <button onClick={() => setShowAddCategory((s) => !s)}>Add Category</button>

      {showAddCategory && (
        <CategoryAddUpdateForm
          //
          setShowForm={setShowAddCategory}
          type="add"
          userReexec={userReexec}
        />
      )}

      {Categories && (
        <div
          style={{
            display: 'flex',
          }}
        >
          {/* // */}
          {Categories}
        </div>
      )}

      {/* todo */}

      {/* <label>Filter Type</label>
      <select>
        <option>AND</option>
        <option>OR</option>
      </select>
      <br /> */}

      <input
        //
        name="filter"
        onChange={(e) => setSearchBar(e.target.value)}
        placeholder="filter"
        value={searchBar}
      />
      <br />

      <button onClick={() => setShowAddBookmark((s) => !s)}>Add Bookmark</button>
      {showAddBookmark && (
        <BookmarkAddUpdateForm
          //
          categories={categories}
          setShowForm={setShowAddBookmark}
          type="add"
          userReexec={userReexec}
        />
      )}

      {BookmarkRows && (
        <table>
          <tbody>{BookmarkRows}</tbody>
        </table>
      )}
    </div>
  );
};
