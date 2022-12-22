import { CgAttachment } from '@react-icons/all-files/cg/CgAttachment';
import Head from 'next/head';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import Main from '@/layouts/Main';

const Contact = () => {
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
              <div className="mb-3 text-3xl font-black">Head Office</div>
              <div className="text-xl">
                Jl. Tipar cakung Kav. F 5-7 East Jakarta 13910 Indonesia
              </div>

              <div className="mr-20 mt-6 grid grid-cols-2 gap-4">
                <Button variant="elevated">021-4602696</Button>
                <Button variant="elevated">021-4602698</Button>
                <Button variant="elevated">Directions</Button>
                <Button variant="elevated">E-Mail</Button>
              </div>
            </Card>

            <Card
              className="py-20 px-14"
              style={{
                background:
                  '#fff url("/assets/images/contact-2.svg") no-repeat top right',
              }}
            >
              <div className="mb-3 text-3xl font-black">Consumer Voice</div>
              <div className="text-xl">
                Toll Free Phone Call Service for Customer
              </div>

              <div className="mr-20 mt-6 grid grid-cols-2 gap-4">
                <Button variant="elevated">0800-1818818</Button>
                <Button variant="elevated">031-5325005</Button>
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
