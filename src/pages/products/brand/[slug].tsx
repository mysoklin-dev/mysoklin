import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';
import { withCdn } from '@/helpers';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { slug } = context.params as any; // no longer causes error
  const record = await pb.collection('product_brands').getList(1, 1, {
    filter: `title ~ '${slug.replaceAll('-', ' ')}'`,
  });
  return {
    props: { og: JSON.parse(JSON.stringify(record.items[0])) },
    revalidate: 60,
  };
};

const ProductDetail: NextPage<any> = ({ og }) => {
  const router = useRouter();
  const { isFallback } = useRouter();

  const [brand, setBrand] = useState<any>();
  const [items, setProducts] = useState<any>();
  const [socials, setSocials] = useState<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { slug } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  useEffect(() => {
    const getBrand = async () => {
      try {
        const record = await pb.collection('product_brands').getList(1, 1, {
          filter: `title ~ '${(slug as string)?.replaceAll('-', ' ')}'`,
        });
        // console.log('fetc');
        setBrand(record.items[0]);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    if (slug) {
      getBrand();
      // getProducts();
      // getSocial();
    }
  }, [slug]);

  const getProducts = async (catId: string) => {
    try {
      const resultList = await pb.collection('products').getList(1, 50, {
        filter: `product_brand_id ~ '${catId}'`,
      });
      setProducts(resultList.items);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error) console.log(error);
    }
  };

  const getSocial = async (catId: string) => {
    try {
      const resultList = await pb.collection('social_group').getList(1, 50, {
        filter: `product_brand_id ~ '${catId}'`,
      });
      if (resultList.items.length > 0 && resultList.items[0]) {
        setSocials(resultList.items);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error) console.log(error);
    }
  };

  useEffect(() => {
    if (typeof og !== 'undefined' && og.id) {
      getProducts(og.id);
      getSocial(og.id);
    }
  }, [og]);

  if (isFallback) {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta name="description" content={og?.og_description} />
        <meta
          property="og:description"
          content={og?.og_description}
          key="desc"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og?.collectionId}/${og?.id}/${og?.logo}`}
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
                    src={withCdn({
                      img: `${process.env.NEXT_PUBLIC_API_URL}/files/${brand.collectionId}/${brand.id}/${brand.logo}`,
                      w: 200,
                      h: 200,
                      q: 100,
                    })}
                    alt=""
                    loading="eager"
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
    </>
  );
};

export default ProductDetail;
