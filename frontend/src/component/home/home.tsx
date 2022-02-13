import React from 'react';
import { useCategoriesState } from './use-categories-state';
import { Bookmark, useUserQuery, Category } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { BookmarkRow } from './bookmark-row';

export const Home: React.FC = () => {
  /**
   * User query
   */
  const [userRes, userReexec] = useUserQuery();

  /**
   * Categories
   */
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
    <div key={e?.id}>
      <input type="checkbox" checked={e?.selected} />
      <label>{e?.name}</label>
    </div>
  ));

  /**
   * Filter bar
   */
  const [filter, setFilter] = React.useState<string>('');
  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => setFilter(e.target.value);

  /**
   * Add bookmark
   */
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const handleShowAdd: React.MouseEventHandler = (e) => setShowAdd((s) => !s);

  /**
   * Bookmark table
   */
  const [bookmarks, setBookmarks] = React.useState<(Bookmark | null)[] | null>(null);

  React.useEffect(() => {
    const bookmarks = userRes.data?.user?.bookmarks;
    if (!userRes.fetching && !userRes.error && bookmarks) {
      setBookmarks(bookmarks);
    }
  }, [userRes.fetching]);

  const BookmarkRows = bookmarks?.map((e) => (
    <BookmarkRow
      //
      bookmark={e}
      key={e?.id}
      userReexec={userReexec}
    />
  ));

  return (
    <div>
      {Categories && (
        <div>
          {/* // */}
          {Categories}
        </div>
      )}
      <input
        //
        name="filter"
        onChange={handleFilter}
        placeholder="filter"
        value={filter}
      />
      <br />
      <button onClick={handleShowAdd}>Add Bookmark</button>
      {showAdd && (
        <BookmarkAddUpdateForm
          //
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
