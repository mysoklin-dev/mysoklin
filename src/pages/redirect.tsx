/* eslint-disable no-alert */
/* eslint-disable no-console */
import Head from 'next/head';
// import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect } from 'react';

const RedirectAuth = () => {
  // load the previously stored provider's data
  // const router = useRouter();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const redirectUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://mysoklin.com/redirect'
      : 'http://localhost:3000/redirect';

  useEffect(() => {
    const provider =
      JSON.parse(localStorage.getItem('provider') as string) || {};

    const params = new URL(window.location as any).searchParams;

    if (provider.state !== params.get('state')) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw "State parameters don't match.";
    }

    // console.log(params.get('code'));

    pb.collection('users')
      .authWithOAuth2(
        provider.name,
        params.get('code') as string,
        provider.codeVerifier,
        redirectUrl,
        // pass optional user create data
        {
          emailVisibility: false,
        }
      )
      .then((authData: any) => {
        console.log(authData);
        pb.collection('users')
          .update(authData.record.id as string, {
            ...(authData.record.name === ''
              ? { name: authData.meta.name }
              : {}),
            avatarUrl: authData.meta.avatarUrl,
          })
          .then((res) => {
            console.log(' successfully updated profile', res);
            // router.push('/profile');
            window.location.href = '/profile';
          })
          .catch((e) => {
            console.log('error updating profile  == ', e);
          });
      })
      .catch((err: any) => {
        console.log(`Failed to exchange code.\n${err}`);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Signing In...</title>
      </Head>
      Redirecting...
    </>
  );
};

export default RedirectAuth;
