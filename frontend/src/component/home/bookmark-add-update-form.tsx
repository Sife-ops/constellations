import React from 'react';
import { Bookmark, useBookmarkAddMutation, useBookmarkUpdateMutation } from '../../generated/graphql';
import { Box, Button, Input } from '@chakra-ui/react';
import { CategoriesStateType, useCategoriesState } from './use-categories-state';
import { Category } from './category';
import { Formik } from 'formik';
import { OperationContext } from 'urql';

interface Props {
  bookmark?: Bookmark | null;
  categories: CategoriesStateType;
  setShowForm: (value: React.SetStateAction<boolean>) => void;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const BookmarkAddUpdateForm: React.FC<Props> = (p) => {
  /**
   * categories
   */
  const initialCategories = (): CategoriesStateType => {
    if (p.categories) {
      return p.categories?.map((e1) => {
        const hasBookmarkCategory = p.bookmark?.categories?.find((e2) => e2?.id === e1?.id);
        return {
          ...e1,
          selected: hasBookmarkCategory ? true : false,
        };
      });
    }
    return null;
  };

  const {
    // todo: use normal names
    categories: bookmarkCategories,
    toggleCategorySelected: toggleBookmarkCategorySelected,
  } = useCategoriesState(initialCategories());

  const BookmarkCategories = bookmarkCategories?.map((e) => (
    <Category
      //
      category={e}
      key={e?.id}
      size="xs"
      toggleCategorySelected={toggleBookmarkCategorySelected}
    />
  ));

  /**
   * fields
   */
  const [_, bookmarkAddMutation] = useBookmarkAddMutation();
  const [__, bookmarkUpdateMutation] = useBookmarkUpdateMutation();

  return (
    <Formik
      initialValues={{ description: p.bookmark?.description || '', url: p.bookmark?.url || '' }}
      onSubmit={async ({ description, url }) => {
        const categoryIds = bookmarkCategories?.filter((e) => e?.selected).map((e) => e?.id) as number[];

        let res;
        if (p.bookmark) {
          res = await bookmarkUpdateMutation({ id: p.bookmark.id, description, url, categoryIds });
        } else {
          res = await bookmarkAddMutation({ description, url, categoryIds });
        }

        if (res?.error) {
          console.log(res.error);
          return;
        }

        p.userReexec();
        p.setShowForm(false);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {BookmarkCategories && <div>{BookmarkCategories}</div>}
          <Box className="element">
            <Input
              //
              name="description"
              onChange={handleChange}
              placeholder="description"
              value={values.description}
            />
          </Box>

          <Box className="element">
            <Input
              //
              name="url"
              onChange={handleChange}
              placeholder="url"
              value={values.url}
            />
          </Box>

          <Box className="element">
            <Button
              //
              colorScheme="green"
              isFullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
