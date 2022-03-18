import { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { dark } from '../themes';
import { UIProvider } from '../context/ui';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
