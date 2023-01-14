import Link from 'next/link';
import useSWR from 'swr';

import ArticleCard from '../ArticleCard';
import Button from '../Button';

const LatestUpdates = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/updates/records?page=1&perPage=3`
  );

  const loading = !data && !error;
  const posts = data && data.items;

  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h2 className="text-blue-700">Our Latest Updates</h2>
          </div>
          <div className="col-span-1">
            <div className="mr-0 ml-auto text-right">
              <Link href="/updates">
                <Button
                  variant="outlined"
                  style={{ width: '170px', height: 40, marginLeft: 'auto' }}
                >
                  {'Show More'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-3 gap-10">
          {loading && <>Loading...</>}

          {!loading &&
            posts.map((item: any) => (
              <div className="col-span-1" key={`article-${item.id}`}>
                <ArticleCard
                  title={item.title}
                  text={item.content.substring(0, 50)}
                  link={`/articles/${item.id}`}
                  thumbnail={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                />
              </div>
            ))}

          {/* {posts.length === 0 && <div>No Content Available</div>} */}
        </div>
      </div>

      <style jsx>{`
        h2 {
          font-weight: 700;
          font-size: 30px;
        }
      `}</style>
    </section>
  );
};

export default LatestUpdates;
