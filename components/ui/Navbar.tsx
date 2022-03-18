import { useContext } from 'react';

import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import { UIContext } from '../../context/ui';

export const Navbar = () => {
  const { openMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openMenu}>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6">JirApp</Typography>
      </Toolbar>
    </AppBar>
  );
};
