import React from 'react';
import { Category } from './category';
import { Formik } from 'formik';
import { OperationContext } from 'urql';

import { CategoriesStateType, useCategoriesState } from './use-categories-state';

import { Bookmark, useBookmarkAddMutation, useBookmarkUpdateMutation } from '../../generated/graphql';

interface Props {
  bookmark?: Bookmark | null;
  categories: CategoriesStateType;
  setShowForm: (value: React.SetStateAction<boolean>) => void;
  type: 'add' | 'update';
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
      toggleCategorySelected={toggleBookmarkCategorySelected}
    />
  ));

  /**
   * fields
   */
  const [_, bookmarkAddMutation] = useBookmarkAddMutation();
  const [__, bookmarkUpdateMutation] = useBookmarkUpdateMutation();

  return (
    <div>
      {BookmarkCategories && (
        <div
          style={{
            display: 'flex',
          }}
        >
          {BookmarkCategories}
        </div>
      )}
      <Formik
        initialValues={{ description: '', url: '' }}
        onSubmit={async ({ description, url }) => {
          const categoryIds = bookmarkCategories?.filter((e) => e?.selected).map((e) => e?.id) as number[];

          let res;
          if (p.type === 'add') {
            res = await bookmarkAddMutation({ description, url, categoryIds });
          }
          if (p.type === 'update') {
            res = await bookmarkUpdateMutation({ id: p.bookmark?.id, description, url, categoryIds });
          }
          if (res?.error) return;

          p.userReexec();
          p.setShowForm(false);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <input
              //
              name="description"
              onChange={handleChange}
              placeholder="description"
              value={values.description}
            />
            <br />

            <input
              //
              name="url"
              onChange={handleChange}
              placeholder="url"
              value={values.url}
            />
            <br />

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
