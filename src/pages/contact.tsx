import { CgAttachment } from '@react-icons/all-files/cg/CgAttachment';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';

const Contact: NextPage<any> = ({ og }) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    message: '',
    attachment: '',
  });

  useEffect(() => {
    const getContact = async () => {
      try {
        const resultList = await pb.collection('contact_box').getList(1, 6, {
          filter: `status = true`,
          sort: '-sequence',
        });
        setContacts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getContact();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('email', form.email);
    formData.append('phone_number', form.phone_number);
    formData.append('message', form.message);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('attachment', fileInput.files[0]);
    }

    try {
      const record = await pb.collection('contact_form').create(formData);
      setIsSent(true);
      // eslint-disable-next-line no-console
      console.log(record);
      setForm(() => ({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: '',
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta name="description" content={og?.og_description} />
        <meta property="og:description" content={og?.og_description} />
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
            background: #EEF3F6;
          }
        `}</style>
      </Head>

      <Container className="my-4 p-8 md:my-20 md:py-20 md:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left */}
          {contacts && contacts[0] && contacts[1] && (
            <div>
              <Card
                className="mb-8 py-16 px-6 md:px-14"
                style={{
                  background:
                    '#fff url("/assets/images/contact-1.svg") no-repeat top right',
                }}
              >
                <div className="mb-3 text-3xl font-black">
                  {contacts[0]?.title}
                </div>
                <div className="text-xl">{contacts[0]?.sub_title}</div>

                <div className="mt-6 grid grid-cols-2 gap-4 md:mr-20">
                  <a href={`tel:${contacts[0]?.value_1}`}>
                    <Button variant="elevated">{contacts[0]?.value_1}</Button>
                  </a>
                  <a href={`tel:${contacts[0]?.value_2}`}>
                    <Button variant="elevated">{contacts[0]?.value_2}</Button>
                  </a>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:mr-20">
                  <a
                    href="https://goo.gl/maps/r4UbWbFMVVvGgD73A"
                    target="_BLANK"
                    rel="noreferrer"
                  >
                    <Button variant="elevated">Direction</Button>
                  </a>
                </div>
              </Card>

              <Card
                className="py-20 px-14"
                style={{
                  background:
                    '#fff url("/assets/images/contact-2.svg") no-repeat top right',
                }}
              >
                <div className="mb-3 text-3xl font-black">
                  {contacts[1].title}
                </div>
                <div className="text-xl">{contacts[1]?.sub_title}</div>

                <div className="mt-6 grid gap-4 md:mr-20 md:grid-cols-2">
                  <a href={`tel:${contacts[1].value_1}`}>
                    <Button variant="elevated">{contacts[1]?.value_1}</Button>
                  </a>
                  <a href={`tel:${contacts[1].value_2}`}>
                    <Button variant="elevated">{contacts[1]?.value_2}</Button>
                  </a>
                </div>
              </Card>
            </div>
          )}

          {/* Right */}
          <div>
            <h3 className="mb-10 text-3xl font-black text-blue-400">
              We&apos;d love to hear
              <br />
              from you
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <input
                    required
                    type="text"
                    className="formControl"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={(e: any) => {
                      setForm((prev: any) => ({
                        ...prev,
                        first_name: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    className="formControl"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={(e: any) => {
                      setForm((prev: any) => ({
                        ...prev,
                        last_name: e.target.value,
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
                  required
                  type="text"
                  className="formControl"
                  placeholder="Phone Number"
                  value={form.phone_number}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-8">
                <textarea
                  className="formControl"
                  placeholder="Message"
                  rows={10}
                  value={form.message}
                  onChange={(e: any) => {
                    setForm((prev: any) => ({
                      ...prev,
                      message: e.target.value,
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
                      attachment: e.target.value,
                    }));
                  }}
                />
                {form.attachment ? form.attachment : ''}
                <label htmlFor="file">
                  <Button variant="elevated" icon={<CgAttachment />}>
                    Attach File
                  </Button>
                </label>
              </div>

              <button
                type="submit"
                className="elevated  text-md flex w-full items-center justify-center gap-2 rounded-full bg-blue-400 text-white"
                style={{ padding: '20px 25px', marginTop: 20 }}
              >
                SEND
              </button>
            </form>
          </div>
        </div>
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
                Message successfully Sent
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

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('z1h8bo6aojlh0vz');
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
    },
  };
};

export default Contact;
