import { CgFacebook } from '@react-icons/all-files/cg/CgFacebook';
import { CgGoogle } from '@react-icons/all-files/cg/CgGoogle';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';

const LoginForm = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  // States
  const router = useRouter();
  const [user]: any = usePocketBaseAuth();
  const [authList, setAuthList] = useState<any>([]);
  const redirectUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://mysoklin.com/redirect'
      : 'http://localhost:3000/redirect';

  useEffect(() => {
    if (user !== null && typeof window !== 'undefined') {
      router.push('/profile');
    }
  }, [user]);

  useEffect(() => {
    const fetchAuthMethods = async () => {
      try {
        const result = await pb.collection('users').listAuthMethods();
        setAuthList(result.authProviders);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchAuthMethods();
  }, []);

  const handleLocalStorage = (provider: any) => {
    localStorage.setItem('provider', JSON.stringify(provider));
  };

  return (
    <div
      className="rounded-xl px-10 py-14 text-center"
      style={{ background: '#EEF3F6', width: '100%', maxWidth: '500px' }}
    >
      <div className="mb-4 text-center">
        <img
          src="/assets/images/register.svg"
          className="inline-block"
          alt=""
        />
      </div>

      <h3 className="mb-10 text-3xl font-black text-gray-800">
        Sign In or Sign Up
      </h3>

      {authList.map((provider: any) => (
        <a
          href={provider.authUrl + redirectUrl}
          key={`provider-${provider.codeChallenge}`}
          className="mb-3 flex items-center gap-2 rounded-xl bg-white p-4 text-center text-lg shadow-lg hover:bg-gray-50"
          onClick={() => {
            handleLocalStorage(provider);
          }}
        >
          {provider.name === 'google' ? (
            <CgGoogle size={20} />
          ) : (
            <CgFacebook size={20} />
          )}{' '}
          <div className="ml-3 text-sm md:ml-10 md:text-lg">
            Continue with {provider.name}
          </div>
        </a>
      ))}
    </div>
  );
};

export default LoginForm;
