import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';

import Button from '@/components/Button';
import Container from '@/components/Container';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

type IProductCardCircleProps = {
  img: string;
  title: string;
};

const ProductCardCircle = ({ img, title }: IProductCardCircleProps) => {
  return (
    <div className="text-center">
      <div className="thumb mb-10">
        <div className="radial"></div>
        <img src={img} alt="" />
      </div>

      <div className="text-xl font-bold text-blue-400">{title}</div>

      <style jsx>{`
        .thumb {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .thumb {
          display: inline-block;
        }
        .radial {
          position: absolute;
          width: 192px;
          height: 192px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #00a0ff 0%,
            #31b2ff 44.79%,
            #bce6ff 100%
          );
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          right: 0;
          margin: 0 auto;
          border-radius: 192px;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

const ProductDetail = () => {
  const items = [
    {
      title: 'SoKlin Rapika Sparkling Water',
      img: '/assets/images/product-detail/sub-product-6.png',
    },
    {
      title: 'SoKlin Rapika Green Meadow',
      img: '/assets/images/product-detail/sub-product-1.png',
    },
    {
      title: 'SoKlin Rapika Forever Blossom',
      img: '/assets/images/product-detail/sub-product-2.png',
    },
    {
      title: 'SoKlin Rapika Lavender Splash',
      img: '/assets/images/product-detail/sub-product-3.png',
    },
    {
      title: 'SoKlin Rapika Korean Camellia',
      img: '/assets/images/product-detail/sub-product-4.png',
    },
    {
      title: 'SoKlin Rapika Sakura Strawberry',
      img: '/assets/images/product-detail/sub-product-5.png',
    },
  ];

  return (
    <Main>
      <div className="hero pt-56">
        <Container>
          <div
            className="bg-white p-10 pb-4"
            style={{ borderRadius: '20px 20px 0 0' }}
          >
            <div className="grid grid-cols-12 gap-7">
              <div className="col-span-3">
                <img src="/assets/images/logos/product-detail.png" alt="" />
              </div>

              <div className="col-span-9">
                <h1 className="text-3xl font-black text-blue-400">
                  SoKlin Rapika
                </h1>

                <p className="mt-5 text-xl">
                  Soklin Rapika, produk pelicin pakaian yang memiliki fungsi
                  3-in-1, yaitu sebagai pelicin, pewangi dan pelembut pakaian.
                  Kini hadir dengan teknologi fast smoothing action, yang dapat
                  melicinkan pakaian secara instan, menghilangkan kusut hanya
                  dalam 1 Detik.
                </p>

                <div className="mt-5 flex gap-3">
                  <Button icon={<FaInstagram />} variant="outlined">
                    soklinrapikaid
                  </Button>
                  <Button icon={<FaFacebook />} variant="outlined">
                    So-Klin-Rapika
                  </Button>
                  <Button icon={<FaYoutube />} variant="outlined">
                    SoKlinDetergent
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="text-xl font-black text-blue-400">
                  6 Products
                </div>

                <div className="font-black text-blue-400">
                  Sort by:
                  <select name="" id="">
                    <option value="">Name A-Z</option>
                    <option value="">Name Z-A</option>
                    <option value="">Newest</option>
                    <option value="">Oldest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div className="col-span-1 mb-10" key={`product-${i}`}>
              <ProductCardCircle title={item.title} img={item.img} />
            </div>
          ))}
        </div>
      </Container>

      <TipsAndTricks />

      <style jsx>{`
        .hero {
          background: #f9c10f;
        }
      `}</style>
    </Main>
  );
};

export default ProductDetail;
