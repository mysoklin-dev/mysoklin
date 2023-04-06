import Head from 'next/head';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

type ItemListProps = {
  slug: string | null | undefined;
};

const ItemList = ({ slug }: ItemListProps) => {
  const [items, setItems] = useState<any>([]);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  useEffect(() => {
    const getItems = async () => {
      try {
        const resultList = await pb.collection(slug as string).getList(1, 20);
        setItems(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };
    if (slug && typeof slug !== 'undefined') {
      console.log(slug);
      getItems();
    }
  }, [slug]);

  if (!slug && typeof slug === 'undefined') {
    return <>Not Found</>;
  }

  return (
    <>
      <Head>
        <title>{slug || ''} items | MySoklin Dashboard</title>
      </Head>

      <div>
        <h2 className="text-bold mb-10 text-lg capitalize">{slug || ''}</h2>

        {items && items.length > 0 && (
          <table className="border-1 table-fixed overflow-hidden rounded-md">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Created Date</th>
                <th className="border px-4 py-2">Updated Date</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item: any) => (
                <tr key={`${slug}-item-${item.id}`}>
                  <td className="border px-4 py-2 ">{item.title}</td>
                  <td className="border px-4 py-2 ">{item.created}</td>
                  <td className="border px-4 py-2 ">{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default ItemList;
