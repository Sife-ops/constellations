import React from 'react';
import { Bookmark, useBookmarkDeleteMutation } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { OperationContext } from 'urql';

interface Props {
  bookmark: Bookmark | null;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

const BookmarkEdit: React.FC<Props> = (p) => {
  const [showUpdate, setShowUpdate] = React.useState<boolean>(false);
  const handleShowUpdate: React.MouseEventHandler = (e) => setShowUpdate((s) => !s);

  // const [showDelete, setShowDelete] = React.useState<boolean>(false);
  // const handleShowDelete: React.MouseEventHandler = (e) => setShowDelete((s) => !s);
  const [deleteResult, deleteMutation] = useBookmarkDeleteMutation();

  const handleDelete: React.MouseEventHandler = async (e) => {
    const res = await deleteMutation({ id: p.bookmark?.id });
    if (res.error) return;
    p.userReexec();
  };

  return (
    <div>
      <button onClick={handleShowUpdate}>Update</button>
      {showUpdate && (
        <BookmarkAddUpdateForm
          //
          bookmark={p.bookmark}
          type="update"
          userReexec={p.userReexec}
        />
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export const BookmarkRow: React.FC<Props> = (p) => {
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const handleShowEdit: React.MouseEventHandler = (e) => setShowEdit((s) => !s);

  return (
    <tr>
      <td>{p.bookmark?.description}</td>
      <td>
        <a href={p.bookmark?.url!} target="_blank">
          {p.bookmark?.url}
        </a>
      </td>
      <td>
        <button onClick={handleShowEdit}>Edit</button>
        {showEdit && (
          <BookmarkEdit
            //
            bookmark={p.bookmark}
            userReexec={p.userReexec}
          />
        )}
      </td>
    </tr>
  );
};
