import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title></title>
    </Head>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="position-relative">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  </>
);

export default MyApp;
