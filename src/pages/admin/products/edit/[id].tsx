import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';

import Button from '@/components/Button';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const slug = 'products';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [brands, setBrands] = useState<any[] | null>(null);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2';

  useEffect(() => {
    const getDetail = async () => {
      try {
        const item = await pb.collection(slug as string).getOne(id as string);

        setRecord(item);
      } catch {
        // ignore
      }
    };

    if (id) {
      getDetail();
      pb.collection('product_brands')
        .getFullList(200 /* batch size */, {
          sort: '-created',
        })
        .then((res) => setBrands(res));
    }
  }, [id]);

  if (record === null) {
    return 'Loading...';
  }

  return (
    <>
      <Head>
        <title>Edit</title>
        <style>{`
          .main-header {
            display: none!important;
          }
        `}</style>
      </Head>
      <h2 className="text-bold mb-10 text-xl capitalize">
        Edit {record.collectionName}
      </h2>

      {record && (
        <form>
          <div className="flex gap-3">
            <div className="w-8/12">
              {/* Title */}
              <div className="mb-10">
                <input
                  type="text"
                  name="title"
                  defaultValue={record.title}
                  value={record.title}
                  onChange={(e: any) => {
                    setRecord({
                      ...record,
                      title: e.target.value,
                    });
                  }}
                  className={inputStyle}
                />
              </div>

              <div className="mb-3">
                {typeof window !== 'undefined' && (
                  <Editor
                    name="description"
                    onChange={(data: any) => {
                      // eslint-disable-next-line no-console
                      console.log(data);
                    }}
                    editorLoaded={editorLoaded}
                    value={
                      record.description ? record.description : record.content
                    }
                  />
                )}
              </div>
            </div>
            <div className="w-4/12">
              <div className="mb-10">
                <Button square variant="contained-blue">
                  Save
                </Button>
              </div>

              {/* Brands */}
              <label htmlFor="brandId">Product Brand</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
                defaultValue={record.product_brand_id}
              >
                {brands?.map((item: any) => (
                  <option key={`brand_id-${item.id}`} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>

              {/* Status */}
              <div className="mt-6">
                <label>Status</label>
                <div className="mt-2">
                  <Switch
                    onChange={() => {
                      setRecord({
                        ...record,
                        status: !record.status,
                      });
                    }}
                    checked={record.status}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
};

export default ItemEdit;
