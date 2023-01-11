import Link from 'next/link';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import ArticleCard from '@/components/ArticleCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import Main from '@/layouts/Main';

const Updates = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('updates').getList(1, 7);
        setPosts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getPosts();
  }, []);

  if (!posts && posts.length === 0) {
    return null;
  }

  return (
    <Main>
      <img
        src={posts[0].banner_image}
        alt={posts[0].title}
        style={{ zIndex: '-1', position: 'relative', width: '100%' }}
      />

      <Container className="px-5">
        <div className="-mt-32 rounded-md border-2 border-gray-200 bg-white p-20 text-center">
          <h1 className="text-2xl font-black text-blue-400">
            {posts[0].title}
          </h1>

          <div className="mt-10">
            <div
              className="mb-10 font-sans text-xl"
              dangerouslySetInnerHTML={{ __html: posts[0].content }}
            ></div>

            <div className="flex justify-center">
              <Link href={`/updates/${posts[0].id}`}>
                <Button variant="elevated">Read</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Blog */}
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <div className="mt-20 grid grid-cols-3 gap-10">
          {posts.map((item: any) => (
            <div className="col-span-1" key={`article-${item.id}`}>
              <ArticleCard
                title={item.title}
                text={item.content.substring(0, 50)}
                link={`/updates/${item.id}`}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center pb-20">
          <Pagination />
        </div>
      </Container>
    </Main>
  );
};

export default Updates;
