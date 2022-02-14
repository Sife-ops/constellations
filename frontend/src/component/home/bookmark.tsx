import React from 'react';
import { Bookmark as BookmarkType, useBookmarkDeleteMutation } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { OperationContext } from 'urql';
import { CategoriesStateType } from './use-categories-state';

interface Props {
  bookmark: BookmarkType | null;
  categories: CategoriesStateType;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const Bookmark: React.FC<Props> = (p) => {
  const [showEdit, setShowEdit] = React.useState<boolean>(false);

  const [_, deleteMutation] = useBookmarkDeleteMutation();

  const handleDelete: React.MouseEventHandler = async (e) => {
    const res = await deleteMutation({ id: p.bookmark?.id });
    if (res.error) return;
    p.userReexec();
  };

  return (
    <tr>
      <td>{p.bookmark?.description}</td>
      <td>
        <a href={p.bookmark?.url!} target="_blank">
          {p.bookmark?.url}
        </a>
      </td>
      <td>
        <button onClick={() => setShowEdit((s) => !s)}>Edit</button>
        {showEdit && (
          <BookmarkAddUpdateForm
            //
            bookmark={p.bookmark}
            categories={p.categories}
            setShowForm={setShowEdit}
            type="update"
            userReexec={p.userReexec}
          />
        )}
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};
