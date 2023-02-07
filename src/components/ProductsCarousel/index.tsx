/* eslint-disable array-callback-return */
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import Link from 'next/link';
import PocketBase from 'pocketbase';
import React, { useState } from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import useSWR from 'swr';

import ProductCard from '@/components/ProductCard';

import Button from '../Button';
import ProductButton from '../ProductButton';

const ProductsCarousel = () => {
  const [brands, setBrands] = useState<[]>([]);
  const [modal, setModal] = useState(false);
  const [modaltitle, setModalTitle] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/product_categories/records?sort=-created`
  );

  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const getBrands = async (product_category_id: string) => {
    const records: any = await pb.collection('product_brands').getList(1, 50, {
      filter: `product_category_id ~ '${product_category_id}'`,
      sort: '+sequence',
    });
    setBrands(records.items);
    setModal(true);
  };

  return (
    <>
      <section className="pt-20 pb-10">
        <div className="container mx-auto mb-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-3">
              <h2 className="text-center md:text-left">
                Find the right SoKlin Products
              </h2>
            </div>
            <div className="col-span-1">
              <div className="mr-0 ml-auto mt-3 text-right md:mt-0">
                <Link href="/products" className="hidden md:block">
                  <Button
                    style={{ width: '170px', height: 40, marginLeft: 'auto' }}
                  >
                    {'Show More'}
                  </Button>
                </Link>
                <Link href="/products" className="md:hidden">
                  <Button
                    style={{ width: '170px', height: 40, margin: '0 auto' }}
                  >
                    {'Show More'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <ReactCarousel showThumbs={false} autoPlay swipeable>
            {data &&
              !error &&
              data.items.length > 0 &&
              data.items.map((item: any) => (
                <div
                  key={`product-${item.id}`}
                  className="mx-auto grid max-w-6xl grid-cols-1 gap-20 pb-20 md:grid-cols-3"
                >
                  <div className="col-span-1 px-9">
                    <ProductCard
                      onClick={() => {
                        getBrands(item.id);
                        setModalTitle(item.title);
                      }}
                      thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                      title={item.title}
                    />
                  </div>
                </div>
              ))}
          </ReactCarousel>
        </div>

        <div className="hidden md:block">
          <ReactCarousel showThumbs={false} autoPlay swipeable>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-20 pb-20 md:grid-cols-3">
              {data &&
                !error &&
                data.items.length > 0 &&
                data.items.map((item: any, i: number) => (
                  <React.Fragment key={`product-${item.id}`}>
                    {i <= 2 && (
                      <div className="col-span-1">
                        <ProductCard
                          onClick={() => {
                            getBrands(item.id);
                            setModalTitle(item.title);
                          }}
                          thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                          title={item.title}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-20 pb-20 md:grid-cols-3">
              {data &&
                !error &&
                data.items.length > 0 &&
                data.items.map((item: any, i: number) => (
                  <React.Fragment key={`product-${item.id}-${i}`}>
                    {i > 2 && (
                      <div className="col-span-1">
                        <ProductCard
                          onClick={() => {
                            getBrands(item.id);
                            setModalTitle(item.title);
                          }}
                          thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                          title={item.title}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </ReactCarousel>
        </div>
      </section>

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

      <style jsx>{`
        h2 {
          font-weight: 700;
          font-size: 30px;
          color: #ffffff;
        }
        section {
          background: linear-gradient(
            130.91deg,
            #02a1ff 0%,
            #98d9ff 45.31%,
            #02a1ff 96.88%
          );

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

export default ProductsCarousel;
