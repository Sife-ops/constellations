import React from 'react';
import { BoxOutlined } from '../box-outlined';
import { Bookmark as BookmarkType, useUserQuery } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { BookmarkTable } from './bookmark-table';
import { Box, Button, Input, Text } from '@chakra-ui/react';
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

  const categoriesBlock = (): JSX.Element => {
    if (categoryForm) {
      return <BoxOutlined className="block">{categoryForm}</BoxOutlined>;
    }

    if (!categories || categories.length < 1) {
      return (
        <Box
          style={{
            display: 'flex',
            flexGrow: '1',
            justifyContent: 'center',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text color="gray.500">No Categories</Text>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        {categories?.map((e) => (
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
        ))}
      </Box>
    );
  };

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
      <BoxOutlined
        className="block"
        style={{
          display: 'flex',
        }}
      >
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

        {categoriesBlock()}
      </BoxOutlined>

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
        <BoxOutlined className="block">
          <BookmarkAddUpdateForm
            //
            categories={categories}
            setShowForm={setBookmarkAdd}
            userReexec={userReexec}
          />
        </BoxOutlined>
      )}

      {!filteredBookmarks || filteredBookmarks.length < 1 ? (
        <Box
          style={{
            display: 'flex',
            flex: '1 1 auto',
            justifyContent: 'center',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text color="gray.500">No Bookmarks</Text>
          </Box>
        </Box>
      ) : (
        <BookmarkTable
          //
          bookmarks={filteredBookmarks}
          categories={categories}
          className="element"
          userReexec={userReexec}
        />
      )}
    </>
  );
};
