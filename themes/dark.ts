import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19874b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      // defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
        },
      },
    },
  },
});
