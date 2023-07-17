import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { Suspense, useEffect, useState } from 'react';

import DashboardMenu from '@/components/Dashboard/Menu';
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
  const router = useRouter();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    if (router && router.asPath.includes('admin')) {
      setIsDashboard(true);
    }
  }, [router]);

  return (
    <>
      {!isDashboard && (
        <>
          <Header />

          {props.children}
        </>
      )}

      {isDashboard && (
        <div className="flex min-h-screen w-full gap-4">
          <div className="w-2/12 bg-gray-200">
            <DashboardMenu />
          </div>
          <div className="w-10/12">
            <div className="p-6">{props.children}</div>
          </div>
        </div>
      )}

      <Suspense>
        <Footer {...props.footerProps} />
      </Suspense>
    </>
  );
};

export default Main;
