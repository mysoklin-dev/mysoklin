import Link from 'next/link';
import useSWR from 'swr';

import ArticleCard from '../ArticleCard';
import Button from '../Button';

const LatestUpdates = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/updates/records?page=1&perPage=3&sort=-created`
  );

  const loading = !data && !error;
  const posts = data && data.items;

  return (
    <section className="pb-10 pt-20">
      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-3">
            <h2 className="text-center md:text-left">Update Produk SoKlin</h2>
          </div>
          <div className="col-span-1">
            <div className="ml-auto mr-0 mt-3 text-right md:mt-0">
              <Link href="/updates" className="hidden md:block">
                <Button
                  style={{ width: '170px', height: 40, marginLeft: 'auto' }}
                >
                  {'Show More'}
                </Button>
              </Link>
              <Link href="/updates" className="md:hidden">
                <Button
                  style={{ width: '170px', height: 40, margin: '0 auto' }}
                >
                  {'Show More'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-20 max-w-6xl px-8 md:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {loading && <>Loading...</>}

          {!loading &&
            posts.map((item: any) => (
              <div className="col-span-1" key={`article-${item.id}`}>
                <ArticleCard
                  title={item.title}
                  text={item.content}
                  link={`/updates/${item.slug}`}
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
