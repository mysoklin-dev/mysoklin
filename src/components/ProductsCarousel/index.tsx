import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import ProductCard from '@/components/ProductCard';

import Button from '../Button';

const ProductsCarousel = () => {
  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h2>Find the right SoKlin Products</h2>
          </div>
          <div className="col-span-1">
            <div className="mr-0 ml-auto text-right">
              <Button style={{ width: '170px', height: 40 }}>
                {'Read More'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ReactCarousel showThumbs={false}>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-20 pb-20">
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-20 pb-20">
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
          <div className="col-span-1">
            <ProductCard
              title="Powder Detergent"
              thumbnail="/assets/images/wb-1.png"
              link="#"
            />
          </div>
        </div>
      </ReactCarousel>

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
        }
      `}</style>
    </section>
  );
};

export default ProductsCarousel;
