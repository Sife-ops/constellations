import React from 'react';
import { Bookmark, useBookmarkDeleteMutation } from '../../generated/graphql';
import { BookmarkAddUpdateForm } from './bookmark-add-update-form';
import { Button, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { CategoriesStateType } from './use-categories-state';
import { OperationContext } from 'urql';

interface Props {
  categories: CategoriesStateType;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

interface TableProps {
  bookmarks: (Bookmark | null)[] | undefined;
}

export const BookmarkTable: React.FC<Props & TableProps> = (p) => {
  const BookmarkRows = p.bookmarks?.map((e) => (
    <BookmarkRow
      //
      bookmark={e}
      categories={p.categories}
      key={e?.id}
      userReexec={p.userReexec}
    />
  ));

  return (
    <Table className="bookmarkTable">
      <Tbody>{BookmarkRows}</Tbody>
    </Table>
  );
};

interface RowProps {
  bookmark: Bookmark | null;
}

export const BookmarkRow: React.FC<Props & RowProps> = (p) => {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const [_, deleteMutation] = useBookmarkDeleteMutation();

  const handleDelete: React.MouseEventHandler = async (e) => {
    const res = await deleteMutation({ id: p.bookmark?.id });
    if (res.error) return;
    p.userReexec();
  };

  return (
    <>
      <Tr>
        <Td>{p.bookmark?.description}</Td>
        <Td>
          <a href={p.bookmark?.url!} target="_blank">
            {p.bookmark?.url}
          </a>
        </Td>
        <Td
          // todo: td width to exact width of div
          style={{
            width: '150px',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <Button
              //   colorScheme="blue"
              onClick={() => setShowForm((s) => !s)}
              size="xs"
              style={{
                marginRight: '.5rem',
              }}
            >
              Edit
            </Button>
            <Button
              //
              colorScheme="red"
              onClick={handleDelete}
              size="xs"
            >
              Delete
            </Button>
          </div>
        </Td>
      </Tr>
      {showForm && (
        <Tr>
          <Td colSpan={3}>
            <BookmarkAddUpdateForm
              //
              bookmark={p.bookmark}
              categories={p.categories}
              setShowForm={setShowForm}
              type="edit"
              userReexec={p.userReexec}
            />
          </Td>
        </Tr>
      )}
    </>
  );
};
