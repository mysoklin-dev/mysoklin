import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import ArticleCard from '@/components/ArticleCard';
import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';

export const getServerSideProps: GetServerSideProps = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const record = await pb.collection('pages').getOne('jcr07ajn17hdouj');
  return {
    props: {
      og: JSON.parse(JSON.stringify(record)),
    },
  };
};

const Search: NextPage<any> = ({ og }) => {
  const router = useRouter();

  const [items, setProducts] = useState<any>([]);
  const [updates, setUpdates] = useState<any>([]);
  const [articles, setArticles] = useState<any>([]);
  const [tab, setTab] = useState<string>('products');

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { keyword } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  useEffect(() => {
    /**
     * Products
     */
    const getProducts = async () => {
      try {
        const resultList = await pb.collection('products').getList(1, 12, {
          filter: `title ~ "%${keyword}%" || description ~ "%${keyword}%"`,
        });
        setProducts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    /**
     * Updates
     */
    const getUpdates = async () => {
      try {
        const resultList = await pb.collection('updates').getList(1, 12, {
          filter: `title ~ "%${keyword}%" || content ~ "%${keyword}%"`,
        });
        setUpdates(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    /**
     * Articles
     */
    const getArticles = async () => {
      try {
        const resultList = await pb.collection('articles').getList(1, 12, {
          filter: `title ~ "%${keyword}%" || content ~ "%${keyword}%"`,
        });
        setArticles(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getProducts();
    getUpdates();
    getArticles();
  }, [keyword]);

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
      </Head>

      <div className="bg-gray-200">
        <Container className="pt-10">
          <h3 className="px-4 text-2xl font-bold text-blue-300 md:px-0">
            Keyword: &quot;{keyword ?? ''}&quot;
          </h3>

          <div className="mt-5 flex gap-3 text-blue-400">
            <button
              className={`block border-0 border-b-2 py-2 px-3 capitalize ${
                tab === 'products' ? 'border-orange-500' : 'border-transparent'
              }`}
              onClick={() => {
                setTab('products');
              }}
            >
              products ({items?.length.toString()})
            </button>
            <button
              className={`block border-0 border-b-2 py-2 px-3 capitalize ${
                tab === 'updates' ? 'border-orange-500' : 'border-transparent'
              }`}
              onClick={() => {
                setTab('updates');
              }}
            >
              updates ({updates?.length.toString()})
            </button>
            <button
              className={`block border-0 border-b-2 py-2 px-3 capitalize ${
                tab === 'articles' ? 'border-orange-500' : 'border-transparent'
              }`}
              onClick={() => {
                setTab('articles');
              }}
            >
              articles ({articles?.length.toString()})
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {tab === 'products' &&
            items &&
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
          {tab === 'products' && items.length === 0 && (
            <div>Item not found, please recheck the keyword</div>
          )}

          {tab === 'updates' &&
            updates &&
            updates.length > 0 &&
            updates.map((item: any, i: number) => (
              <div className="col-span-1" key={`update-${item.id}-${i}`}>
                <ArticleCard
                  title={item.title}
                  text={item.content}
                  link={`/updates/${item.id}/${item.title
                    .replaceAll(' ', '-')
                    .toLowerCase()}`}
                  thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                />
              </div>
            ))}
          {tab === 'updates' && updates.length === 0 && (
            <div>Item not found, please recheck the keyword</div>
          )}

          {tab === 'articles' &&
            articles &&
            articles.length > 0 &&
            articles.map((item: any, i: number) => (
              <div className="col-span-1" key={`article-${item.id}-${i}`}>
                <ArticleCard
                  title={item.title}
                  text={item.content}
                  link={`/articles/${item.id}/${item.title
                    .replaceAll(' ', '-')
                    .toLowerCase()}`}
                  thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                />
              </div>
            ))}
          {tab === 'articles' && articles.length === 0 && (
            <div>Item not found, please recheck the keyword</div>
          )}
        </div>
      </Container>

      <TipsAndTricks />
    </>
  );
};

export default Search;
