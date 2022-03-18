import { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { dark } from '../themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
