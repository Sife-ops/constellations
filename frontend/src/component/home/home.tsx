import React from 'react';
import { BlockBox } from '../block-box';
import { Bookmark as BookmarkType, useUserQuery } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { BookmarkTable } from './bookmark-table';
import { Box, Button, Input } from '@chakra-ui/react';
import { Category } from './category';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { HandleCategory } from '../../utility/type';
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
  const [categoryAddMode, setCategoryAddMode] = React.useState<boolean>(false);

  const [categoryEditMode, setCategoryEditMode] = React.useState<boolean>(false);

  const [categoryForm, setCategoryForm] = React.useState<JSX.Element | null>(null);

  const { categories, toggleCategorySelected, updateCategories } = useCategoriesState(null);

  React.useEffect(() => {
    const categories = data?.user?.categories;
    if (!fetching && !error && categories) {
      updateCategories(categories);
    }
  }, [userRes.fetching]);

  const handleCategory: HandleCategory = (args) => {
    return () => {
      if (categoryForm || categoryEditMode) {
        setCategoryForm(null);
        setCategoryEditMode(false);
        setCategoryAddMode(false);
        return;
      }
      if (args.type === 'add') {
        setCategoryAddMode(true);
        setCategoryForm(
          <CategoryAddUpdateForm
            //
            setCategoryForm={setCategoryForm}
            type="add"
            userReexec={userReexec}
          />
        );
        return;
      }
      setCategoryEditMode(true);
    };
  };

  const Categories = categories?.map((e) => (
    <Category
      key={e?.id}
      //
      category={e}
      toggleCategorySelected={toggleCategorySelected}
      //
      categoryEdit={{
        categoryEditMode,
        setCategoryForm,
        userReexec,
      }}
    />
  ));

  /**
   * Filter bar
   */
  const [searchBar, setSearchBar] = React.useState<string>('');

  /**
   * Add bookmark
   */
  const [bookmarkAdd, setBookmarkAdd] = React.useState<boolean>(false);

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

  return (
    <>
      <BlockBox className="block categories">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            //
            className="element"
            onClick={handleCategory({ type: 'add' })}
            variant={categoryAddMode ? 'solid' : 'outline'}
          >
            Add
          </Button>
          <Button
            //
            className="element"
            onClick={handleCategory({ type: 'edit' })}
            variant={categoryEditMode ? 'solid' : 'outline'}
          >
            Edit
          </Button>
        </div>

        {categoryForm ? (
          <BlockBox className="block">
            {/* //  */}
            {categoryForm}
          </BlockBox>
        ) : (
          <div>{Categories}</div>
        )}
      </BlockBox>

      <Box className="element">
        <Input
          //
          name="filter"
          onChange={(e) => setSearchBar(e.target.value)}
          placeholder="filter"
          value={searchBar}
        />
      </Box>

      <Box className="element">
        <Button
          //
          colorScheme="green"
          isFullWidth
          onClick={() => setBookmarkAdd((s) => !s)}
        >
          Add Bookmark
        </Button>
      </Box>

      {bookmarkAdd && (
        <BlockBox className="block">
          <BookmarkAddUpdateForm
            //
            categories={categories}
            setShowForm={setBookmarkAdd}
            type="add"
            userReexec={userReexec}
          />
        </BlockBox>
      )}

      <BookmarkTable
        //
        bookmarks={filteredBookmarks}
        categories={categories}
        className="element"
        userReexec={userReexec}
      />
    </>
  );
};
