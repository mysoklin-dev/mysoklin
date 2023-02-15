import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a8a8a8" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff"></meta>
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
