import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { CategoriesStateType, useCategoriesState } from '../../hook/use-categories-state';
import { Category } from './category';
import { InputFeedback } from '../common/input-feedback';
import { OperationContext } from 'urql';
import { Spinner } from '@chakra-ui/react';
import { useAddUpdateForm } from '../../hook/use-add-update-form';

import {
  Bookmark,
  useBookmarkAddMutation,
  useBookmarkDeleteMutation,
  useBookmarkUpdateMutation,
} from '../../generated/graphql';

interface Props {
  bookmark?: Bookmark | null;
  categories: CategoriesStateType;
  setShowForm: (value: React.SetStateAction<boolean>) => void;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const BookmarkAddUpdateForm: React.FC<Props> = (p) => {
  /*
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

  /*
   * fields
   */
  // todo: pass in bookmark
  const f = useAddUpdateForm({
    description: p.bookmark?.description || '',
    url: p.bookmark?.url || '',
  });

  // todo: move to hook
  const [_, bookmarkAddMutation] = useBookmarkAddMutation();
  const [__, bookmarkUpdateMutation] = useBookmarkUpdateMutation();
  const [___, deleteMutation] = useBookmarkDeleteMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const categoryIds = bookmarkCategories?.filter((e) => e?.selected).map((e) => e?.id) as number[];

    let res;
    if (p.bookmark?.id) {
      res = await bookmarkUpdateMutation({
        categoryIds,
        description: f.description,
        id: p.bookmark.id,
        url: f.url,
      });
    } else {
      res = await bookmarkAddMutation({
        categoryIds,
        description: f.description,
        url: f.url,
      });
    }

    if (res?.error) {
      console.log(res.error);
      return;
    }

    p.userReexec();
    p.setShowForm(false);
  };

  const handleDelete: React.MouseEventHandler = async (e) => {
    const res = await deleteMutation({ id: p.bookmark?.id! });
    if (res.error) return;
    p.userReexec();
  };

  return (
    <form onSubmit={handleSubmit}>
      {BookmarkCategories && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {BookmarkCategories}
        </div>
      )}
      <Box className="element">
        <Input
          // todo: border color
          name="url"
          onChange={f.handleUrl}
          placeholder="url"
          value={f.url}
        />
      </Box>

      {/* todo: spinner inside description box */}
      {f.pageTitleRes.fetching && <Spinner />}
      {f.pageTitleRes.error && (
        <InputFeedback
          //
          className="block"
          msg="Description autofull does not work for this URL."
          type="warning"
        />
      )}

      <Box className="element">
        <Input
          //
          name="description"
          onChange={f.handleDescription}
          placeholder="description"
          value={f.description}
        />
      </Box>

      <Box
        className="element"
        style={{
          display: 'flex',
        }}
      >
        <Button
          colorScheme="blue"
          disabled={!f.isValidForm}
          isFullWidth
          style={{
            marginRight: '.5rem',
          }}
          type="submit"
        >
          Submit
        </Button>

        {/* todo: cancel button */}

        {p.bookmark && (
          <Button
            //
            colorScheme="red"
            isFullWidth
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </Box>
    </form>
  );
};
