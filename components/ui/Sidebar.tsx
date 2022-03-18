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

const options: string[] = ['Inbox', 'Starred', 'Send email', 'Draft'];

export const Sidebar = () => {
  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={() => console.log('cerrando...')}
    >
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
