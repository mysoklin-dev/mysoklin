import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import Head from 'next/head';
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
      <Head>
        <title>{brand?.title}</title>
        <meta property="og:title" content={brand?.title} />
        <meta name="description" content={brand?.description} key="desc" />
        <meta
          property="og:description"
          content={brand?.description}
          key="desc"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${brand?.collectionId}/${brand?.id}/${brand?.logo}`}
        />
      </Head>
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

                  {/* <pre>{JSON.stringify(socials, null, 2)}</pre> */}
                  {socials && socials.length > 0 && socials[0] && (
                    <div className="mt-5 gap-3 md:flex">
                      {socials[0].instagram && socials[0].instagram !== '' && (
                        <a
                          href={socials[0].instagram}
                          target="_BLANK"
                          rel="noreferrer"
                          className="mt-2 inline-block md:mt-0"
                        >
                          <Button icon={<FaInstagram />} variant="outlined">
                            {socials[0].instagram_label}
                          </Button>
                        </a>
                      )}

                      {socials[0].facebook && socials[0].facebook !== '' && (
                        <a
                          href={socials[0].facebook}
                          target="_BLANK"
                          rel="noreferrer"
                          className="mt-2 inline-block md:mt-0"
                        >
                          <Button icon={<FaFacebook />} variant="outlined">
                            {socials[0].facebook_label}
                          </Button>
                        </a>
                      )}

                      {socials[0].youtube && socials[0].youtube !== '' && (
                        <a
                          href={socials[0].youtube}
                          target="_BLANK"
                          rel="noreferrer"
                          className="mt-2 inline-block md:mt-0"
                        >
                          <Button icon={<FaYoutube />} variant="outlined">
                            {socials[0].youtube_label}
                          </Button>
                        </a>
                      )}

                      {socials[0].website_url &&
                        socials[0].website_url !== '' && (
                          <a
                            href={socials[0].website_url}
                            target="_BLANK"
                            rel="noreferrer"
                          >
                            <Button icon={<FaGlobe />} variant="outlined">
                              {'Website'}
                            </Button>
                          </a>
                        )}
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
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
