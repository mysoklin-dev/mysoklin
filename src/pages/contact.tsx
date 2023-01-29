import { CgAttachment } from '@react-icons/all-files/cg/CgAttachment';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import Main from '@/layouts/Main';

const Contact = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [contacts, setContacts] = useState<any[]>([]);

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

  return (
    <Main>
      <Head>
        <style>{`
          body {
            background: #EEF3F6;
          }
        `}</style>
      </Head>
      <Container className="my-20 py-20">
        <div className="grid grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <Card
              className="mb-8 py-16 px-14"
              style={{
                background:
                  '#fff url("/assets/images/contact-1.svg") no-repeat top right',
              }}
            >
              <div className="mb-3 text-3xl font-black">
                {contacts[0]?.title}
              </div>
              <div className="text-xl">{contacts[0].sub_title}</div>

              <div className="mr-20 mt-6 grid grid-cols-2 gap-4">
                <a href={`tel:${contacts[0].value_1}`}>
                  <Button variant="elevated">{contacts[0].value_1}</Button>
                </a>
                <a href={`tel:${contacts[0].value_2}`}>
                  <Button variant="elevated">{contacts[0].value_2}</Button>
                </a>
              </div>
              <div className="mr-20 mt-4 grid grid-cols-1 gap-4">
                <a
                  href="https://goo.gl/maps/r4UbWbFMVVvGgD73A"
                  target="_BLANK"
                  rel="noreferrer"
                >
                  <a href={`tel:${contacts[0].value_3}`}>
                    <Button variant="elevated">Direction</Button>
                  </a>
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
              <div className="text-xl">{contacts[1].sub_title}</div>

              <div className="mr-20 mt-6 grid grid-cols-2 gap-4">
                <a href={`tel:${contacts[1].value_1}`}>
                  <Button variant="elevated">{contacts[0].value_1}</Button>
                </a>
                <a href={`tel:${contacts[1].value_2}`}>
                  <Button variant="elevated">{contacts[0].value_2}</Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Right */}
          <div>
            <h3 className="mb-10 text-3xl font-black text-blue-400">
              We&apos;d love to hear
              <br />
              from you
            </h3>

            <form action="#">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <input
                    type="text"
                    className="formControl"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="formControl"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mt-8">
                <input
                  type="email"
                  className="formControl"
                  placeholder="Email"
                />
              </div>

              <div className="mt-8">
                <input
                  type="text"
                  className="formControl"
                  placeholder="Phone Number"
                />
              </div>

              <div className="mt-8">
                <textarea
                  className="formControl"
                  placeholder="Message"
                  rows={10}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="elevated" icon={<CgAttachment />}>
                  Attach File
                </Button>
              </div>

              <Button
                variant="elevated"
                style={{ padding: '25px', marginTop: 20 }}
              >
                SEND
              </Button>
            </form>
          </div>
        </div>
      </Container>

      <ProductsCarousel />
      <LatestUpdates />
    </Main>
  );
};

export default Contact;
