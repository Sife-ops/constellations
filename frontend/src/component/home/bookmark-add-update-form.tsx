import React from 'react';
import { Formik } from 'formik';
import { OperationContext } from 'urql';
import { useBookmarkAddMutation, useBookmarkUpdateMutation, Bookmark } from '../../generated/graphql';

interface Props {
  bookmark?: Bookmark | null;
  type: 'add' | 'update';
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const BookmarkAddUpdateForm: React.FC<Props> = (p) => {
  const [bookmarkAddResult, bookmarkAddMutation] = useBookmarkAddMutation();
  const [bookmarkUpdateResult, bookmarkUpdateMutation] = useBookmarkUpdateMutation();

  return (
    <Formik
      initialValues={{ description: '', url: '' }}
      onSubmit={async ({ description, url }) => {
        let res;
        if (p.type === 'add') {
          res = await bookmarkAddMutation({ description, url });
        }
        if (p.type === 'update') {
          res = await bookmarkUpdateMutation({ id: p.bookmark?.id, description, url });
        }
        if (res?.error) return;
        p.userReexec();
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
  );
};
