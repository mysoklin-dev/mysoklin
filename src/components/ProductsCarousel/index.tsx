/* eslint-disable array-callback-return */
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import Link from 'next/link';
import PocketBase from 'pocketbase';
import { useState } from 'react';
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

  const pb = new PocketBase('https://mysoklin-dashboard.efectifity.com');
  const getBrands = async (product_category_id: string) => {
    const records: any = await pb.collection('product_brands').getList(1, 50, {
      filter: `product_category_id ~ '${product_category_id}'`,
      sort: '-created_at',
    });
    setBrands(records.items);
    setModal(true);
  };

  return (
    <>
      <section className="pt-20 pb-10">
        <div className="container mx-auto mb-20 max-w-6xl">
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <h2>Find the right SoKlin Products</h2>
            </div>
            <div className="col-span-1">
              <div className="mr-0 ml-auto text-right">
                <Link href="/products">
                  <Button
                    style={{ width: '170px', height: 40, marginLeft: 'auto' }}
                  >
                    {'Show More'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ReactCarousel showThumbs={false} autoPlay swipeable>
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-20 pb-20">
            {data &&
              !error &&
              data.items.length > 0 &&
              data.items.map((item: any, i: number) => (
                <>
                  {i <= 2 && (
                    <div className="col-span-1" key={`product-${i}`}>
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
                </>
              ))}
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-20 pb-20">
            {data &&
              !error &&
              data.items.length > 0 &&
              data.items.map((item: any, i: number) => (
                <>
                  {i > 2 && (
                    <div className="col-span-1" key={`product-${i}`}>
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
                </>
              ))}
          </div>
        </ReactCarousel>
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
                    <div className="col-span-1" key={`product-${i}`}>
                      <ProductButton
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
        .modal {
          position: fixed;
          background: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow-y: auto;
          z-index: 9999;
        }

        .modal-box {
          background: #eef3f6;
          border-radius: 20px;
          width: 100%;
          max-width: 700px;
          height: auto;
          position: absolute;
          display: block;
          overflow: hidden;
          left: 0;
          right: 0;
          margin: 0 auto;
          top: 50%;
          transform: translateY(-50%);
        }

        .modal-header {
          background: #071789;
          border-radius: 20px 20px 0px 0px;
          font-size: 35px;
          color: #fff;
          text-align: center;
          height: 123px;
          margin-bottom: 40px;
          position: relative;
        }

        .modal-content {
          padding: 0 50px 50px;
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

export default ProductsCarousel;
