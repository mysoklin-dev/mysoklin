import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';

import ArticleCard from '@/components/ArticleCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Main from '@/layouts/Main';

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('j8tbtaznrqnb1f2');
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
    },
  };
};

const Articles: NextPage<any> = ({ og }) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [posts, setPosts] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(10);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('articles').getList(current, 7, {
          sort: '-created',
        });
        setPosts(resultList.items);
        setTotal(resultList.totalItems);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getPosts();
  }, [current]);

  const onChange = (page: any) => {
    setCurrent(page);
  };

  if (!posts && posts.length === 0) {
    return null;
  }

  return (
    <Main>
      <Head>
        <title>{og?.og_title}</title>
        <meta property="og:title" content={og?.og_title} />
        <meta
          name="description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta
          property="og:description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
        <meta
          property="og:test"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.og_image}`}
        />
      </Head>
      <div className="banner_image">
        {posts[0] && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${posts[0].collectionId}/${posts[0].id}/${posts[0]?.banner_image}`}
            alt={posts[0]?.title}
            style={{ zIndex: '-1', position: 'relative', width: '100%' }}
          />
        )}
      </div>

      <Container className="px-5">
        {posts[0] && (
          <div className="-mt-32 rounded-md border-2 border-gray-200 bg-white p-10 text-center md:p-20">
            <h1 className="text-2xl font-black text-blue-400">
              <span
                dangerouslySetInnerHTML={{
                  __html: posts[0]?.title.substring(0, 150),
                }}
              ></span>
              {posts[0].title.length > 150 ? '...' : ''}
            </h1>

            <div className="mt-10">
              <div
                className="mb-10 font-sans text-xl"
                dangerouslySetInnerHTML={{
                  __html: `${posts[0]?.content.substring(0, 200)}...`,
                }}
              ></div>

              <div className="flex justify-center">
                <Link
                  href={`/articles/${posts[0]?.id}/${posts[0].title
                    .replaceAll(' ', '-')
                    .toLowerCase()}`}
                >
                  <Button variant="elevated">Read</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog */}
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((item: any, i: number) => (
            <>
              {i > 0 && (
                <div className="col-span-1" key={`article-${item.id}`}>
                  <ArticleCard
                    title={item.title}
                    text={item.content}
                    link={`/articles/${item.id}/${item.title
                      .replaceAll(' ', '-')
                      .toLowerCase()}`}
                    thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                  />
                </div>
              )}
            </>
          ))}
        </div>

        <div className="mt-10 flex justify-center pb-20">
          <Pagination
            onChange={onChange}
            current={current}
            total={total}
            pageSize={6}
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
    </Main>
  );
};

export default Articles;
