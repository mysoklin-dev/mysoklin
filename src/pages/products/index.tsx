import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import process from 'process';
import { useState } from 'react';
import useSWR from 'swr';

import Container from '@/components/Container';
import ProductButton from '@/components/ProductButton';
import ProductCard from '@/components/ProductCard';
import TipsAndTricks from '@/components/TipsAndTricks';

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('jcr07ajn17hdouj');
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
    },
  };
};

const Products: NextPage<any> = ({ og }) => {
  const [modal, setModal] = useState(false);
  const [brands, setBrands] = useState<[]>([]);
  const [modaltitle, setModaltitle] = useState('');
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/product_categories/records?sort=-created`
  );

  const getBrands = async (title: string, product_category_id: string) => {
    const records: any = await pb.collection('product_brands').getList(1, 50, {
      filter: `product_category_id ~ '${product_category_id}'`,
      sort: '+sequence',
    });
    setBrands(records.items);
    setModal(true);
    setModaltitle(title);
  };

  return (
    <>
      <Head>
        <title>{og?.og_title}</title>
        <meta
          name="description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta property="og:title" content={og?.og_title} />
        <meta property="og:description" content={og?.og_description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
        <meta
          property="og:test"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
      </Head>

      <div className="hero py-24 px-8 md:px-0">
        {/* Muqodimah */}
        <Container>
          <div className="grid grid-cols-2 justify-center">
            <div className="col-span-2 text-center">
              <h1 className="text-3xl font-black text-white md:text-6xl">
                We have it all,
                <br />
                pick and choose.
              </h1>

              <p
                className="mt-5 font-serif text-xl md:text-3xl"
                style={{ color: '#071789' }}
              >
                Select the category below and browse all of our products
              </p>
            </div>
          </div>
        </Container>

        {/* Product Grid */}
        <Container className="mt-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {data &&
              !error &&
              data.items.length > 0 &&
              data.items.map((item: any, i: number) => (
                <div className="col-span-1" key={`product-${i}`}>
                  <ProductCard
                    onClick={() => getBrands(item.title, item.id)}
                    thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                    title={item.title}
                  />
                </div>
              ))}
          </div>
        </Container>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-box">
            <div className="modal-header flex items-center justify-center font-black">
              {modaltitle}
              <div
                className="closer"
                onClick={() => {
                  setModal(false);
                }}
              >
                <img src="/assets/images/cross.svg" alt="close" />
              </div>
            </div>

            <div className="modal-content">
              {/* Brands item */}
              <div className="mb-3">
                {brands &&
                  brands.map((item: any, i: number) => (
                    <div className="col-span-1 my-3" key={`product-${i}`}>
                      <ProductButton
                        data={item}
                        title={item.title}
                        logo={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.logo}`}
                      />
                    </div>
                  ))}

                {brands.length === 0 && (
                  <h3 className="p-4 text-center text-xl">
                    No Products for this Category
                  </h3>
                )}

                {/* <pre>{JSON.stringify(brands, null, 2)}</pre> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <TipsAndTricks />

      <style jsx>{`
        .hero {
          width: 100%;
          height: auto;
          background: #61d9ff;
          position: relative;
          overflow: hidden;
          z-index: 0;
        }

        .hero:before {
          content: '';
          background: radial-gradient(
            50% 50% at 50% 50%,
            #02a1ff 0%,
            #39b6ff 53.12%,
            rgba(97, 217, 255, 0) 100%
          );
          width: 1419px;
          height: 1421px;
          position: absolute;
          top: -30%;
          left: -50%;
          z-index: -1;
        }

        .hero:after {
          content: '';
          background: radial-gradient(
            50% 50% at 50% 50%,
            #02a1ff 0%,
            #39b6ff 53.12%,
            rgba(97, 217, 255, 0) 100%
          );
          width: 1419px;
          height: 1421px;
          position: absolute;
          bottom: -30%;
          right: -50%;
          z-index: -1;
        }

        .timeline {
          padding-left: 30px;
          margin-left: 20px;
          border-left: 1px dashed #484848;
        }

        .closer {
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Products;
