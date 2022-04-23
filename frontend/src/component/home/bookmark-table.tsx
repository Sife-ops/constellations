import React from 'react';
import { Bookmark } from '../../generated/graphql';
import { BookmarkAddUpdateForm2 } from './bookmark-add-update-form2';
import { CategoriesStateType } from './use-categories-state';
import { HamburgerIcon } from '@chakra-ui/icons';
import { OperationContext } from 'urql';
import { Table, Tbody, Tr, Td, BoxProps, Box } from '@chakra-ui/react';

interface Props {
  categories: CategoriesStateType;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

interface TableProps {
  bookmarks: (Bookmark | null)[] | undefined;
}

export const BookmarkTable: React.FC<Props & TableProps & BoxProps> = (p) => {
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
    <Box className={p.className}>
      <Table className="bookmarkTable">
        <Tbody>{BookmarkRows}</Tbody>
      </Table>
    </Box>
  );
};

interface RowProps {
  bookmark: Bookmark | null;
}

export const BookmarkRow: React.FC<Props & RowProps> = (p) => {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  return (
    <>
      <Tr>
        <Td>
          <Box onClick={() => setShowForm((s) => !s)}>
            <HamburgerIcon
              color="lightgray"
              style={{
                marginRight: '.5rem',
              }}
            />
            {p.bookmark?.description}
          </Box>
        </Td>
        <Td>
          <a href={p.bookmark?.url!} target="_blank">
            {p.bookmark?.url}
          </a>
        </Td>
      </Tr>
      {showForm && (
        <Tr>
          <Td colSpan={2}>
            <BookmarkAddUpdateForm2
              //
              bookmark={p.bookmark}
              categories={p.categories}
              setShowForm={setShowForm}
              userReexec={p.userReexec}
            />
          </Td>
        </Tr>
      )}
    </>
  );
};
