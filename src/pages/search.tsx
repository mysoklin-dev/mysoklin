import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

const Search: NextPage<any> = () => {
  const router = useRouter();
  const [items, setProducts] = useState<any>();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { keyword } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  useEffect(() => {
    console.log(keyword);
    const getProducts = async () => {
      try {
        const resultList = await pb.collection('products').getList(1, 12, {
          filter: `title ~ "%${keyword}%"`,
        });
        setProducts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getProducts();
  }, [keyword]);

  return (
    <Main>
      <Head>
        <title>Search | MySoklin</title>
        <meta property="og:title" content="Search" />
      </Head>

      <div className="bg-gray-200">
        <Container className="py-20">
          <h3 className="text-2xl font-bold text-blue-300">
            Keyword: &quot;{keyword ?? ''}&quot;
          </h3>
        </Container>
      </div>

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

export default Search;
