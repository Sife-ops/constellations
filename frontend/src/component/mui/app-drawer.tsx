import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useCategoriesQuery } from '../../generated/graphql';

interface Props {
  open: boolean;
  toggle: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const AppDrawer: React.FC<Props> = ({ open, toggle }) => {
  const [res, reexec] = useCategoriesQuery();

  if (res.fetching) return null;

  // error page?
  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  const categoryList = res.data?.categories?.map((e) => (
    <ListItem button key={e?.id}>
      {/* todo: add icon to datamodel */}
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={e?.id} />
    </ListItem>
  ));

  return (
    <Drawer anchor="left" open={open} onClose={toggle(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggle(false)} onKeyDown={toggle(false)}>
        <List>{categoryList}</List>
      </Box>
    </Drawer>
  );
};
