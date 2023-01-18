import Link from 'next/link';
import PocketBase from 'pocketbase';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';

import ArticleCard from '@/components/ArticleCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Main from '@/layouts/Main';

const Updates = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [posts, setPosts] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(10);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('articles').getList(current, 6);
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
          <div className="-mt-32 rounded-md border-2 border-gray-200 bg-white p-20 text-center">
            <h1 className="text-2xl font-black text-blue-400">
              {posts[0]?.title}
            </h1>

            <div className="mt-10">
              <div
                className="mb-10 font-sans text-xl"
                dangerouslySetInnerHTML={{ __html: posts[0]?.content }}
              ></div>

              <div className="flex justify-center">
                <Link href={`/updates/${posts[0]?.id}`}>
                  <Button variant="elevated">Read</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog */}
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <div className="mt-20 grid grid-cols-3 gap-10">
          {posts.map((item: any) => (
            <div className="col-span-1" key={`article-${item.id}`}>
              <ArticleCard
                title={item.title}
                text={item.content}
                link={`/articles/${item.id}`}
                thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
              />
            </div>
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

        .banner_image img {
          object-fit: cover;
        }
      `}</style>
    </Main>
  );
};

export default Updates;
