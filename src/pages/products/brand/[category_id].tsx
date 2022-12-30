import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

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
  const [brand, setBrand] = useState<any>();
  const [items, setProducts] = useState<any>();
  const [socials, setSocials] = useState<any[]>([]);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category_id } = router.query;
  const pb = new PocketBase('https://mysoklin-dashboard.efectifity.com');

  useEffect(() => {
    const getBrand = async () => {
      try {
        const record = await pb
          .collection('product_brands')
          .getOne(category_id as string);
        // console.log('fetc');
        // console.log(record);
        setBrand(record);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    const getProducts = async () => {
      try {
        const resultList = await pb.collection('products').getList(1, 50, {
          filter: `product_brand_id ~ '${category_id}'`,
        });
        setProducts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    const getSocial = async () => {
      try {
        const resultList = await pb.collection('social_group').getList(1, 50, {
          filter: `product_brand_id ~ '${category_id}'`,
        });
        if (resultList.items.length > 0 && resultList.items[0]) {
          setSocials(resultList.items);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    if (category_id) {
      getBrand();
      getProducts();
      getSocial();
    }
  }, [category_id]);

  return (
    <Main>
      <div className="hero pt-56">
        {brand && (
          <Container>
            <div
              className="bg-white p-10 pb-4"
              style={{ borderRadius: '20px 20px 0 0' }}
            >
              <div className="grid grid-cols-12 gap-7">
                <div className="col-span-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/files/${brand.collectionId}/${brand.id}/${brand.logo}`}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="col-span-9">
                  <h1 className="text-3xl font-black text-blue-400">
                    {brand.title}
                  </h1>

                  <p className="mt-5 text-xl">{brand.description}</p>

                  {socials && socials.length > 0 && socials[0] && (
                    <div className="mt-5 flex gap-3">
                      {/* <pre>{JSON.stringify(socials[0], null, 2)}</pre> */}
                      <a href={socials[0].instagram}>
                        <Button icon={<FaInstagram />} variant="outlined">
                          {socials[0].instagram_label}
                        </Button>
                      </a>
                      <a href={socials[0].facebook}>
                        <Button icon={<FaFacebook />} variant="outlined">
                          {socials[0].facebook_label}
                        </Button>
                      </a>
                      <a href={socials[0].youtube}>
                        <Button icon={<FaYoutube />} variant="outlined">
                          {socials[0].youtube_label}
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-blue-400">
                    {items && items.length > 0 && items.length} Products
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
        )}
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-3 gap-10">
          {items &&
            items.length > 0 &&
            items.map((item: any, i: any) => (
              <div className="col-span-1 mb-10" key={`product-${i}`}>
                <ProductCardCircle
                  title={item.title}
                  img={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                />
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
