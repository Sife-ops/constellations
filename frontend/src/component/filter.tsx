import React from 'react';
import { Formik } from 'formik';
import { UseQueryResponse } from 'urql';

import {
  UserQuery,
  Bookmark,
  useBookmarkAddMutation,
} from '../generated/graphql';

interface Props {
  userQuery: UseQueryResponse<UserQuery, object>;
  bookmarks?: (Bookmark | null)[];
}

export const Filter: React.FC<Props> = ({
  userQuery: [{ data }, userReexec],
}) => {
  const bookmarks = data?.user?.bookmarks;

  const [bookmarkAddResult, bookmarkAddMutation] = useBookmarkAddMutation();

  const bookmarkList = bookmarks?.map((e) => (
    <tr key={e?.id}>
      <td>{e?.description}</td>
      <td>
        <a href={e?.url!} target="_blank">
          {e?.url}
        </a>
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>filter</h1>
      <Formik
        initialValues={{ description: '', url: '' }}
        onSubmit={async ({ description, url }) => {
          const res = await bookmarkAddMutation({ description, url });
          if (res.error) return;
          userReexec();
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="description"
              onChange={handleChange}
              placeholder="description"
              value={values.description}
            />
            <br />
            <input
              name="url"
              onChange={handleChange}
              placeholder="url"
              value={values.url}
            />
            <br />
            <button type="submit">Add</button>
          </form>
        )}
      </Formik>
      <table>
        <tbody>{bookmarkList}</tbody>
      </table>
    </div>
  );
};
