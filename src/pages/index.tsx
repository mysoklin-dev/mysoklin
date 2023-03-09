import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PocketBase from 'pocketbase';

import Carousel from '@/components/Carousel';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import TipsAndTricks from '@/components/TipsAndTricks';
import VideoCarousel from '@/components/VideoCarousel';

const Index: NextPage<any> = ({ og, slides }) => {
  if (!og) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta
          name="description"
          content={og?.og_description.substring(0, 100)}
        />
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

      <VideoCarousel />

      <ProductsCarousel />

      <LatestUpdates />

      <TipsAndTricks />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('7y4tkpyyemu5m08');
  const slideRes = await axios.get(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/hero_banner/records?page=1&perPage=3&sort=+sequence&filter=status%20%3D%20true`
  );
  const slides = await slideRes.data.items;
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
      slides,
    },
  };
};

export default Index;
