import React from 'react';
import { useCategoriesState } from './use-categories-state';
import { Bookmark as BookmarkType, useUserQuery } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { Bookmark } from './bookmark';
import { Category } from './category';

export const Home: React.FC = () => {
  /**
   * User query
   */
  const [userRes, userReexec] = useUserQuery();

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
    const categories = userRes.data?.user?.categories;
    if (!userRes.fetching && !userRes.error && categories) {
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
  const [filter, setFilter] = React.useState<string>('');

  /**
   * Add bookmark
   */
  const [showAddBookmark, setShowAddBookmark] = React.useState<boolean>(false);

  /**
   * Bookmark table
   */
  const [bookmarks, setBookmarks] = React.useState<(BookmarkType | null)[] | null>(null);

  React.useEffect(() => {
    const bookmarks = userRes.data?.user?.bookmarks;
    if (!userRes.fetching && !userRes.error && bookmarks) {
      setBookmarks(bookmarks);
    }
  }, [userRes.fetching]);

  const BookmarkRows = bookmarks?.map((e) => (
    <Bookmark
      //
      bookmark={e}
      key={e?.id}
      userReexec={userReexec}
    />
  ));

  return (
    <div>
      {/* todo */}
      <button>Add Category</button>

      {Categories && (
        <div>
          {/* // */}
          {Categories}
        </div>
      )}

      {/* todo */}
      <label>Filter Type</label>
      <select>
        <option>AND</option>
        <option>OR</option>
      </select>
      <br />

      <input
        //
        name="filter"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="filter"
        value={filter}
      />
      <br />

      <button onClick={() => setShowAddBookmark((s) => !s)}>Add Bookmark</button>
      {showAddBookmark && (
        <BookmarkAddUpdateForm
          //
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
