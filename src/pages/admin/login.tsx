import type { NextPage } from 'next';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { setCookie } from 'typescript-cookie';

import Container from '@/components/Container';

const Register: NextPage<any> = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  // States
  const [isSent, setIsSent] = useState<boolean>(false);

  const [form, setForm] = useState<any>({
    username: '',
    email: '',
    emailVisibility: false,
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const record = await pb.admins.authWithPassword(
        form.email,
        form.password
      );
      setIsSent(true);
      // eslint-disable-next-line no-console
      console.log(record);
      if (record) {
        setCookie('token', record.token);
        setCookie('admin', JSON.stringify(record.admin));
      }
      setForm(() => ({
        email: '',
        password: '',
      }));
      window.location.href = '/admin';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
        <style>{`
          .main-header {
            display: none;
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
            <h3 className="mb-10 text-3xl font-black text-gray-800">
              Admin Login
            </h3>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="mt-8">
                <input
                  required
                  type="text"
                  name="email"
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
                  name="password"
                  value={form.password}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>

              <button
                type="submit"
                className="elevated  text-md flex w-full items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
                style={{ padding: '20px 25px', marginTop: 20 }}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>

        {/* <pre>{JSON.stringify(authList, null, 2)}</pre> */}
      </Container>

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
    </>
  );
};

export default Register;
