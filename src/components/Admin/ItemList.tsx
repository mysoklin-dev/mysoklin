import Head from 'next/head';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { convertDate } from '@/helpers';

import Button from '../Button';

type ItemListProps = {
  slug: string | null | undefined;
};

const ItemList = ({ slug }: ItemListProps) => {
  const [items, setItems] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    totalItems: 0,
    totalPages: 1,
  });

  const getItems = async (page: number = 1, filter: string | null = null) => {
    try {
      const record = await pb
        .collection(slug as string)
        .getList(page, pagination.perPage, {
          sort: `-created`,
          ...(filter && { filter }),
        });
      setItems(record.items);

      setPagination({
        page: record.page,
        perPage: record.perPage,
        totalItems: record.totalItems,
        totalPages: record.totalPages,
      });
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error) console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && typeof slug !== 'undefined') {
      getItems();
    }
  }, [slug]);

  const handleSearch = async () => {
    getItems(1, `title ~ "${search}"`);
  };

  if (!slug && typeof slug === 'undefined') {
    return <>Not Found</>;
  }

  return (
    <>
      <Head>
        {slug && (
          <title>{`${slug.replaceAll('_', ' ')} | My Soklin Dashboard`}</title>
        )}
      </Head>

      <div className="pb-10">
        <h2 className="text-bold mb-10 text-2xl font-bold capitalize">
          {slug?.replaceAll('_', ' ') || <Skeleton />}
        </h2>

        <div className="mb-10 flex gap-4">
          <input
            key={`search-of-${slug}`}
            type="text"
            name="search"
            value={search}
            placeholder="Search..."
            className="block rounded-md bg-white px-6 py-3"
            style={{ width: 300 }}
            onChange={(e: any) => {
              setSearch(() => e.target.value);
            }}
          />

          <Button onClick={handleSearch} square style={{ minWidth: 150 }}>
            Search
          </Button>
        </div>

        {loading && items.length === 0 && <Skeleton count={10} />}

        {items && items.length > 0 && (
          <>
            <div className="overflow-hidden rounded border-b border-gray-200 shadow">
              <table className="border-1 w-full table-fixed overflow-hidden rounded-md">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    {(slug === 'hero_video' || slug === 'hero_banner') && (
                      <th className="border px-4 py-3" style={{ width: 100 }}>
                        Image
                      </th>
                    )}

                    <th className="border px-4 py-3">Title</th>

                    <th className="border px-4 py-3">
                      {slug !== 'social_main' &&
                        slug !== 'social_group' &&
                        'Slug'}
                      {slug === 'social_main' && 'URL'}
                      {slug === 'social_group' && 'Product Brand ID'}
                    </th>

                    <th className="border px-4 py-3">Date</th>

                    <th className="border px-4 py-3" style={{ width: 150 }}>
                      {slug !== 'articles' && 'Status'}
                      {slug === 'articles' && 'Type'}
                    </th>
                  </tr>
                </thead>

                <tbody className="text-md">
                  {items.map((item: any) => (
                    <tr key={`${slug}-item-${item.id}`}>
                      {(slug === 'hero_video' || slug === 'hero_banner') && (
                        <td className="border px-4 py-2">
                          {slug === 'hero_banner' && (
                            <figure className="relative max-w-sm cursor-pointer">
                              <img
                                className="rounded-lg"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.banner}?thumb=100x100`}
                                alt={item.title}
                              />
                            </figure>
                          )}

                          {slug === 'hero_video' && (
                            <figure className="relative max-w-sm cursor-pointer">
                              <img
                                className="rounded-lg"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.video_cover}?thumb=100x100`}
                                alt={item.title}
                              />
                            </figure>
                          )}
                        </td>
                      )}

                      <td className="border px-4 py-2 ">
                        <div>
                          <strong>
                            {item.title ??
                              item.platform_name ??
                              item.group_name}
                          </strong>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <div>
                            <Link
                              href={
                                slug !== 'hero_banner' && slug !== 'hero_video'
                                  ? `/admin/${slug}/edit/${item.id}`
                                  : `/admin/general/${slug}/edit/${item.id}`
                              }
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="text-ellipsis break-words border px-4 py-2 italic">
                        {item.slug ??
                          item.platform_url ??
                          item.product_brand_id ??
                          'n/a'}
                      </td>
                      <td className="border px-4 py-2 ">
                        <div className="mb-1">
                          Published: {convertDate(item.created)}
                        </div>
                        <div>Updated: {convertDate(item.updated)}</div>
                      </td>
                      <td className="border px-4 py-2">
                        {slug !== 'articles' && (
                          <>
                            {item.status === true ? (
                              <span className="text-lime-700">Active</span>
                            ) : (
                              <span className="text-red-800">Inactive</span>
                            )}
                          </>
                        )}

                        {slug === 'articles' && <span>{item.type}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <Pagination
                onChange={(p: any) => {
                  getItems(p, search);
                }}
                current={pagination.page}
                total={pagination.totalItems}
                pageSize={pagination.perPage}
                hideOnSinglePage
              />
            </div>
          </>
        )}
        {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default ItemList;
