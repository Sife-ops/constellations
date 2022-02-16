import React from 'react';
import { Bookmark as BookmarkType, useUserQuery } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { Box, Button, Input } from '@chakra-ui/react';
import { Category } from './category';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { useCategoriesState } from './use-categories-state';
import { BookmarkTable } from './bookmark-table';

export const Home: React.FC = () => {
  /**
   * User query
   */
  const [userRes, userReexec] = useUserQuery();

  const { data, fetching, error } = userRes;

  /**
   * Categories
   */
  const [categoryEditMode, setCategoryEditMode] = React.useState<boolean>(false);

  const [categoryForm, setCategoryForm] = React.useState<JSX.Element | null>(null);

  const { categories, toggleCategorySelected, updateCategories } = useCategoriesState(null);

  React.useEffect(() => {
    const categories = data?.user?.categories;
    if (!fetching && !error && categories) {
      updateCategories(categories);
    }
  }, [userRes.fetching]);

  const resetCategoryForm = () => {
    setCategoryForm(null);
    setCategoryEditMode(false);
  };

  const handleCategoryAdd = () => {
    if (categoryForm || categoryEditMode) {
      resetCategoryForm();
      return;
    }
    setCategoryForm(
      <CategoryAddUpdateForm
        //
        setCategoryForm={setCategoryForm}
        type="add"
        userReexec={userReexec}
      />
    );
  };

  const handleCategoryEdit = () => {
    if (categoryForm || categoryEditMode) {
      resetCategoryForm();
      return;
    }
    setCategoryEditMode(true);
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
    <div>
      <Box borderWidth="1px" borderRadius="lg" className="block categories">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button className="element" onClick={handleCategoryAdd}>
            Add
          </Button>
          <Button className="element" onClick={handleCategoryEdit}>
            Edit
          </Button>
        </div>

        {categoryForm ? (
          <>{categoryForm}</>
        ) : (
          <div
            style={{
              display: 'flex',
            }}
          >
            {Categories}
          </div>
        )}
      </Box>

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
        <BookmarkAddUpdateForm
          //
          categories={categories}
          setShowForm={setBookmarkAdd}
          type="add"
          userReexec={userReexec}
        />
      )}

      <BookmarkTable
        //
        categories={categories}
        userReexec={userReexec}
        bookmarks={filteredBookmarks}
      />
    </div>
  );
};
