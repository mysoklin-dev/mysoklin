import { CgAttachment } from '@react-icons/all-files/cg/CgAttachment';
import { CgFacebook } from '@react-icons/all-files/cg/CgFacebook';
import { CgGoogle } from '@react-icons/all-files/cg/CgGoogle';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Container from '@/components/Container';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import Main from '@/layouts/Main';

const Register: NextPage<any> = ({ og }) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  // States
  const [isSent, setIsSent] = useState<boolean>(false);
  const [authList, setAuthList] = useState<any>([]);
  const redirectUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://mysoklin.com/redirect'
      : 'http://localhost:3000/redirect';
  const [form, setForm] = useState<any>({
    username: '',
    email: '',
    emailVisibility: false,
    password: '',
    passwordConfirm: '',
    name: '',
  });

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('emailVisibility', form.emailVisibility);
    formData.append('password', form.password);
    formData.append('passwordConfirm', form.passwordConfirm);
    formData.append('name', form.name);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('avatar', fileInput.files[0]);
    }

    try {
      const record = await pb.collection('users').create(formData);
      setIsSent(true);
      // eslint-disable-next-line no-console
      console.log(record);
      setForm(() => ({
        username: '',
        email: '',
        emailVisibility: '',
        password: '',
        passwordConfirm: '',
        name: '',
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleLocalStorage = (provider: any) => {
    localStorage.setItem('provider', JSON.stringify(provider));
  };

  return (
    <Main>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta
          name="description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta
          property="og:description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
        <meta
          property="og:test"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
        <style>{`
          body {
            background: #fff;
          }
        `}</style>
      </Head>

      <Container className="my-4 p-8 md:my-10 md:py-10 md:px-0">
        <div className="flex justify-center gap-10">
          {/* Right */}
          <div
            className="rounded-xl py-14 px-10 text-center"
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
                <div className="ml-10">Continue with {provider.name}</div>
              </a>
            ))}

            <form onSubmit={handleSubmit} className="hidden">
              <div className="mt-8">
                <input
                  required
                  type="text"
                  className="formControl"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-10">
                <div>
                  <input
                    required
                    type="text"
                    className="formControl"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e: any) => {
                      setForm((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="mt-8">
                <input
                  required
                  type="email"
                  className="formControl"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-8">
                <input
                  className="formControl"
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-8">
                <input
                  className="formControl"
                  placeholder="Confirm Password"
                  type="password"
                  value={form.passwordConfirm}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      passwordConfirm: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <input
                  type="file"
                  id="file"
                  // value={form.attachment}
                  style={{ width: 0, height: 0, opacity: 0 }}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      avatar: e.target.value,
                    }));
                  }}
                />
                {form.attachment ? form.attachment : ''}
                <label htmlFor="file">
                  <Button variant="elevated" icon={<CgAttachment />}>
                    Avatar
                  </Button>
                </label>
              </div>

              <button
                type="submit"
                className="elevated  text-md flex w-full items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
                style={{ padding: '20px 25px', marginTop: 20 }}
              >
                Register
              </button>
            </form>
          </div>
        </div>

        {/* <pre>{JSON.stringify(authList, null, 2)}</pre> */}
      </Container>

      <ProductsCarousel />
      <LatestUpdates />

      {isSent && (
        <>
          <div
            onClick={() => {
              setIsSent(false);
            }}
            className="modal-overlay"
          ></div>
          <div className="modal-box rounded-md bg-white px-7 py-6 pb-10 text-center">
            <div className="text-right">
              <button
                onClick={() => {
                  setIsSent(false);
                }}
              >
                <img
                  src="/assets/images/close__1.svg"
                  alt="close"
                  loading="lazy"
                />
              </button>
            </div>

            <div className="mt-5 mb-8 text-center">
              <img
                src="/assets/images/amico.svg"
                style={{ display: 'inline-block' }}
                alt=""
              />

              <div className="mt-4 text-2xl font-black">
                Account Successfully Created
              </div>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </>
      )}

      <style jsx>
        {`
          .modal-box {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 400px;
            margin: 0 auto;
            left: 0;
            right: 0;
            background: #fff;
            z-index: 99999;
          }
          .modal-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9999;
          }
        `}
      </style>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('2693a7awa5aiep0');
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
    },
  };
};

export default Register;
