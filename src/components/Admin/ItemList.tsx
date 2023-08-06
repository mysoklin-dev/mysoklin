import Head from 'next/head';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';

import Button from '../Button';

type ItemListProps = {
  slug: string | null | undefined;
};

const ItemList = ({ slug }: ItemListProps) => {
  const [items, setItems] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
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
    } catch (error) {
      // eslint-disable-next-line no-console
      if (error) console.log(error);
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
        <title>
          {slug?.replaceAll('_', ' ') || ''} items | MySoklin Dashboard
        </title>
      </Head>

      <div className="pb-10">
        <h2 className="text-bold mb-10 text-lg capitalize">
          {slug?.replaceAll('_', ' ') || ''}
        </h2>

        <div className="mb-10 flex gap-4">
          <input
            key={`search-of-${slug}`}
            type="text"
            name="search"
            value={search}
            placeholder="Search..."
            className="block rounded-md bg-gray-200 px-6 py-2"
            onChange={(e: any) => {
              setSearch(() => e.target.value);
            }}
          />

          <Button onClick={handleSearch}>Search</Button>
        </div>

        {items && items.length > 0 && (
          <>
            <table className="border-1 w-full table-fixed overflow-hidden rounded-md">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Slug</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>

              <tbody className="text-md">
                {items.map((item: any) => (
                  <tr key={`${slug}-item-${item.id}`}>
                    <td className="border px-4 py-2 ">
                      <div>
                        <strong>{item.title}</strong>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <div>
                          <Link href={`/admin/${slug}/edit/${item.id}`}>
                            Edit
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="border px-4 py-2 italic">
                      {item.slug || 'not created'}
                    </td>
                    <td className="border px-4 py-2 ">
                      <div className="mb-1">Published: {item.created}</div>
                      <div>updated: {item.updated}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
