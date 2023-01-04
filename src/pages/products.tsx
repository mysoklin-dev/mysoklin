import PocketBase from 'pocketbase';
import process from 'process';
import { useState } from 'react';
import useSWR from 'swr';

import Container from '@/components/Container';
import ProductButton from '@/components/ProductButton';
import ProductCard from '@/components/ProductCard';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

const Products = () => {
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
    });
    setBrands(records.items);
    setModal(true);
    setModaltitle(title);
  };

  return (
    <Main>
      <div className="hero py-24">
        {/* Muqodimah */}
        <Container>
          <div className="grid grid-cols-2 justify-center">
            <div className="col-span-2 text-center">
              <h1 className="text-6xl font-black text-white">
                We have it all,
                <br />
                pick and choose.
              </h1>

              <p
                className="mt-5 font-serif text-3xl"
                style={{ color: '#071789' }}
              >
                Select the category below and browse all of our products
              </p>
            </div>
          </div>
        </Container>

        {/* Product Grid */}
        <Container className="mt-24">
          <div className="grid grid-cols-3 gap-10">
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
    </Main>
  );
};

export default Products;
