import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';
import { LoadingSpinner } from './loading-spinner';
import { categories as categoriesQuery } from '../utility/request';
import { useQuery } from 'urql';

interface User {
  id: number;
  email?: string;
  username?: string;
  bookmarks?: Bookmark[];
  categories?: Category[];
}

interface Bookmark {
  id: number;
  url?: string;
  description?: string;
  categories?: Category[];
  user?: User;
}

interface Category {
  id: number;
  name?: string;
  bookmarks?: Bookmark[];
  user?: User;
}

interface Props {
  open: boolean;
  toggle: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const AppDrawer: React.FC<Props> = ({ open, toggle }) => {
  const [res, reexec] = useQuery({
    query: categoriesQuery,
  });

  if (res.fetching) return null;

  // error page?
  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  const categories = res.data.categories as Category[];

  const mapCategories = (category: Category): JSX.Element => (
    <ListItem button key={category.id}>
      {/* todo: add icon to datamodel */}
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={category.name} />
    </ListItem>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggle(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggle(false)}
        onKeyDown={toggle(false)}
      >
        <List>{categories.map(mapCategories)}</List>
      </Box>
    </Drawer>
  );
};
