import Link from 'next/link';
import { useState } from 'react';

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

const items = [
  {
    title: 'Powder Detergent',
    link: '#',
    img: '/assets/images/products/product-3.png',
  },
  {
    title: 'Liquid Detergent',
    link: '#',
    img: '/assets/images/products/product-5.png',
  },
  {
    title: 'Fabric Conditioner',
    link: '#',
    img: '/assets/images/products/product-4.png',
  },
  {
    title: 'Ironing Aid',
    link: '#',
    img: '/assets/images/products/product-6.png',
  },
  {
    title: 'Bleach',
    link: '#',
    img: '/assets/images/products/product-2.png',
  },
  {
    title: 'Floor Cleaner',
    link: '#',
    img: '/assets/images/products/product-1.png',
  },
];

const ProductButton = () => {
  return (
    <Link href="/product-detail">
      <div className="product-opt flex items-center gap-4 px-10">
        <div>
          <img src="/assets/images/logos/logo-1.png" loading="lazy" alt="" />
        </div>

        <div className="ml-10 text-xl font-black text-blue-400">
          SoKlin Smart
        </div>

        <div className="ml-auto">
          <img src="/assets/images/chevron-right.svg" loading="lazy" alt="" />
        </div>

        <style jsx>{`
          .product-opt {
            background: #ffffff;
            height: 80px;
            border: 0.5px solid #071789;
            border-radius: 20px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </Link>
  );
};

const Products = () => {
  const [modal, setModal] = useState(false);

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
            {items.map((item, i) => (
              <div className="col-span-1" key={`product-${i}`}>
                <ProductCard
                  onClick={() => setModal(true)}
                  thumbnail={item.img}
                  title={item.title}
                  link={item.link}
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
              Product Name Dummy
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
              {/* Product item */}
              <div className="mb-3">
                <ProductButton />
              </div>
              <div className="mb-3">
                <ProductButton />
              </div>
              <div className="mb-3">
                <ProductButton />
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
