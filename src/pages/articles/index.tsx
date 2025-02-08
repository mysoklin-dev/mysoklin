import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';

import ArticleCard from '@/components/ArticleCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { withCdn } from '@/helpers';

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  try {
    const record = await pb.collection('pages').getOne('j8tbtaznrqnb1f2');
    return {
      props: {
        og: JSON.parse(JSON.stringify(record)),
      },
    };
  } catch (error) {
    console.error('Error fetching OG data:', error);
    return {
      props: {
        og: null, // Jika gagal, kembalikan null untuk mencegah error
      },
    };
  }
};

const Articles: NextPage<any> = ({ og }) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [posts, setPosts] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('articles').getList(current, 7, {
          sort: '-created',
        });
        setPosts(resultList.items);
        setTotal(resultList.totalItems);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    getPosts();
  }, [current]);

  const onChange = (page: number) => {
    setCurrent(page);
  };

  if (!posts || posts.length === 0) {
    return (
      <Container className="px-5">
        <h1>Tidak ada artikel ditemukan.</h1>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{og?.og_title || 'Articles'}</title>
        <meta property="og:title" content={og?.og_title || 'Articles'} />
        <meta
          name="description"
          content={og?.og_description || 'Daftar artikel terbaru'}
        />
        <meta
          property="og:description"
          content={og?.og_description || 'Daftar artikel terbaru'}
        />
        <meta
          property="og:image"
          content={
            og?.collectionId && og?.id && og?.og_image
              ? `${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`
              : '/default-og-image.png'
          }
        />
      </Head>

      <div className="banner_image">
        {posts[0] && (
          <img
            src={withCdn({
              img: `${process.env.NEXT_PUBLIC_API_URL}/files/${posts[0].collectionId}/${posts[0].id}/${posts[0]?.banner_image}`,
              w: 1440,
              h: 535,
              q: 100,
            })}
            alt={posts[0]?.title}
            style={{ zIndex: '-1', position: 'relative', width: '100%' }}
          />
        )}
      </div>

      <Container className="px-5">
        {posts[0] && (
          <div className="-mt-32 rounded-md border-2 border-gray-200 bg-white p-10 text-center md:p-20">
            <h1 className="-mt-10 mb-6 text-lg">Artikel Tips dan Trik</h1>

            <h2 className="text-2xl font-black text-blue-400">
              <span
                dangerouslySetInnerHTML={{
                  __html: posts[0]?.title.substring(0, 150),
                }}
              ></span>
              {posts[0].title.length > 150 ? '...' : ''}
            </h2>

            <div className="mt-10">
              <div
                className="mb-10 font-sans text-xl"
                dangerouslySetInnerHTML={{
                  __html: `${posts[0]?.content.substring(0, 200)}...`,
                }}
              ></div>

              <div className="flex justify-center">
                <Link href={`/articles/${posts[0].slug}`} passHref>
                  <Button variant="elevated">Read</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((item: any, i: number) => (
            <React.Fragment key={`article-${item.id}-${i + 1}`}>
              {i > 0 && (
                <div className="col-span-1">
                  <ArticleCard
                    title={item.title}
                    text={item.content}
                    link={`/articles/${item.slug}`}
                    thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 flex justify-center pb-20">
          <Pagination
            onChange={onChange}
            current={current}
            total={total}
            pageSize={7}
          />
        </div>
      </Container>

      <style jsx>{`
        .banner_image {
          height: 500px;
          overflow: hidden;
        }

        @media screen and (max-width: 500px) {
          .banner_image {
            height: 200px;
          }
        }

        .banner_image img {
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default Articles;
