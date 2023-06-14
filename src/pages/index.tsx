import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PocketBase from 'pocketbase';
import LazyLoad from 'react-lazy-load';

import Carousel from '@/components/Carousel';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import TipsAndTricks from '@/components/TipsAndTricks';

const VideoCarousel = dynamic(() => import('@/components/VideoCarousel'));

const Index: NextPage<any> = ({ og, slides }) => {
  if (!og) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta name="description" content={og?.og_description} />
        <meta property="og:description" content={og?.og_description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
        <meta
          property="og:test"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
      </Head>

      <Carousel data={slides} />

      <LazyLoad height={698} key="ProductsCarousel">
        <ProductsCarousel />
      </LazyLoad>

      <LazyLoad height={542} key="VideoCarousel">
        <VideoCarousel />
      </LazyLoad>

      <LazyLoad height={904} key="LatestUpdates">
        <LatestUpdates />
      </LazyLoad>

      <LazyLoad height={904} key="TipsAndTricks">
        <TipsAndTricks />
      </LazyLoad>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('7y4tkpyyemu5m08');
  const slideRes = await pb.collection('hero_banner').getList(1, 50, {
    filter: 'status = true',
    sort: '+sequence',
  });
  const slides = await slideRes.items;
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
      slides: JSON.parse(JSON.stringify(slides)),
    },
  };
};

export default Index;
