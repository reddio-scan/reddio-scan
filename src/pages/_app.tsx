import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Head>
        <title>Reddio Scan</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
