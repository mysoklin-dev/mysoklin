import '../styles/global.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import Main from '@/layouts/Main';

// eslint-disable-next-line no-return-assign
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Main>
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
      <meta name="theme-color" content="#ffffff" />
      <title>My Soklin</title>
    </Head>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="position-relative">
        <Component {...pageProps} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </div>
    </SWRConfig>
    {/* eslint-disable-next-line @next/next/next-script-for-ga */}
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-B0Z9CEQSB9"
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B0Z9CEQSB9');`,
      }}
    ></script>
  </Main>
);

export default MyApp;
