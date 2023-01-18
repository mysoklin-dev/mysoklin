import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import type { IFooterProps } from '@/components/Footer';
import Header from '@/components/Header';

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
});

type IMainLayout = {
  children: ReactNode;
  footerProps?: IFooterProps;
};

const Main = (props: IMainLayout) => {
  return (
    <>
      <Header />

      {props.children}

      <Suspense>
        <Footer {...props.footerProps} />
      </Suspense>
    </>
  );
};

export default Main;
