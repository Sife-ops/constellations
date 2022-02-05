import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';

interface Props {
  open: boolean;
  toggle: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const AppDrawer: React.FC<Props> = ({ open, toggle }) => {
  return (
    <Drawer
      //   anchor={anchor}
      anchor="left"
      //   open={state[anchor]}
      open={open}
      //   onClose={toggle(anchor, false)}
      onClose={toggle(false)}
    >
      {/* {list(anchor)} */}
      <Box
        // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggle(false)}
        onKeyDown={toggle(false)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
