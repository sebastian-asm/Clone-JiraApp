import { useContext } from 'react';

import {
  Box,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { InboxOutlined, EmailOutlined } from '@mui/icons-material';

import { UIContext } from '../../context/ui';

const options: string[] = ['Inbox', 'Starred', 'Send email', 'Draft'];

export const Sidebar = () => {
  const { showMenu, closeMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={showMenu} onClose={closeMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menú</Typography>
          <List>
            {options.map((option) => (
              <ListItem key={option} button>
                <ListItemIcon>
                  <InboxOutlined />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {options.map((option) => (
              <ListItem key={option} button>
                <ListItemIcon>
                  <EmailOutlined />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
