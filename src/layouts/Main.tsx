import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import type { IFooterProps } from '@/components/Footer';
import Header from '@/components/Header';
// const Header = dynamic(() => import('@/components/Header'), {
//   ssr: false,
// });

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
      {/* <Suspense
        fallback={<div style={{ background: '#fff', height: 197.36 }} />}
      >
        
      </Suspense> */}
      <Header />

      {props.children}

      <Suspense>
        <Footer {...props.footerProps} />
      </Suspense>
    </>
  );
};

export default Main;
