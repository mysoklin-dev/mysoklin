import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { Suspense, useEffect, useState } from 'react';

import DashboardMenu from '@/components/Dashboard/Menu';
import type { IFooterProps } from '@/components/Footer';
import Header from '@/components/Header';
import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';
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
  const [admin]: any = usePocketBaseAuth();
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
        <div
          className="flex min-h-screen w-full gap-4"
          style={{ background: '#f0f0f1' }}
        >
          {admin && (
            <div
              className="w-2/12"
              style={{ backgroundColor: '#071789', color: 'white' }}
            >
              <DashboardMenu />
            </div>
          )}

          <div className={admin ? 'w-10/12' : 'w-full'}>
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
