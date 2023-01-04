import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

const ProductDetail = () => {
  const [brand, setBrand] = useState<any>();
  const [items, setProducts] = useState<any>();
  const [socials, setSocials] = useState<any[]>([]);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category_id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

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
      {brand && (
        <div
          className="hero pt-56"
          style={{
            background: `${brand.header_color ? brand.header_color : '#f9c10f'}
            url('${process.env.NEXT_PUBLIC_API_URL}/files/${
              brand.collectionId
            }/${brand.id}/${brand.header_image}')
            no-repeat`,
          }}
        >
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
                    width="200"
                    height="200"
                    style={{ width: 200, height: 'auto' }}
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
        </div>
      )}

      <Container className="py-20">
        <div className="grid grid-cols-3 gap-10">
          {items &&
            items.length > 0 &&
            items.map((item: any, i: any) => (
              <div className="col-span-1 mb-10" key={`product-${i}`}>
                <ProductCardCircle
                  id={item.id}
                  title={item.title}
                  img={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                />
              </div>
            ))}
        </div>
      </Container>

      <TipsAndTricks />
    </Main>
  );
};

export default ProductDetail;
