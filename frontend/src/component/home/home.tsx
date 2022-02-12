import React from 'react';
import { Bookmark, useUserQuery } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { BookmarkRow } from './bookmark-row';

export const Home: React.FC = () => {
  /**
   * User query
   */
  const [userRes, userReexec] = useUserQuery();

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
  const [bookmarkRows, setBookmarkRows] = React.useState<(Bookmark | null)[] | null>(null);

  React.useEffect(() => {
    const bookmarks = userRes.data?.user?.bookmarks;
    if (!userRes.fetching && !userRes.error && bookmarks) {
      setBookmarkRows(bookmarks);
    }
  }, [userRes.fetching]);

  const BookmarkRows = bookmarkRows?.map((e) => (
    <BookmarkRow
      //
      bookmark={e}
      key={e?.id}
      userReexec={userReexec}
    />
  ));

  return (
    <div>
      <h1>home</h1>
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
