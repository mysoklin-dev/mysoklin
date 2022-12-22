import type { ReactNode } from 'react';

import type { IFooterProps } from '@/components/Footer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type IMainLayout = {
  children: ReactNode;
  footerProps?: IFooterProps;
};

const Main = (props: IMainLayout) => {
  return (
    <>
      <Header />

      {props.children}

      <Footer {...props.footerProps} />
    </>
  );
};

export default Main;
