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

  // Save
  const postSave = async () => {
    console.log('hit save');
    if (typeof id !== 'undefined') {
      const res = await pb.collection('products').update(id.toString(), record);
      console.log(res);
    }
  };

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
                  placeholder="Title"
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

              {/* Slug */}
              <label>Slug</label>
              <div className="mb-10">
                <input
                  type="text"
                  name="slug"
                  defaultValue={record.slug}
                  value={record.slug}
                  onChange={(e: any) => {
                    setRecord({
                      ...record,
                      slug: e.target.value,
                    });
                  }}
                  className={inputStyle}
                />
              </div>

              <div className="mb-3">
                {typeof window !== 'undefined' && (
                  <>
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

                    <div className="my-6">
                      <label>Feature</label>
                      <Editor
                        name="feature"
                        onChange={(data: any) => {
                          // eslint-disable-next-line no-console
                          console.log(data);
                        }}
                        editorLoaded={editorLoaded}
                        value={record.feature}
                      />
                    </div>

                    <div className="my-6">
                      <label>Specification</label>
                      <Editor
                        name="specification"
                        onChange={(data: any) => {
                          // eslint-disable-next-line no-console
                          console.log(data);
                        }}
                        editorLoaded={editorLoaded}
                        value={record.specification}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-4/12">
              <div className="mb-10">
                <Button square variant="contained-blue" onClick={postSave}>
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

              {/* SEO */}
              <div className="mt-6">
                <label>OG Title</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    defaultValue={record.og_title}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* SEO */}
              <div className="mt-6">
                <label>OG Description</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    defaultValue={record.og_description}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* tokped */}
              <div className="mt-6">
                <label>Tokopedia</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tokopedia"
                    defaultValue={record.tokopedia}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Shopee */}
              <div className="mt-6">
                <label>Shopee</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shopee"
                    defaultValue={record.shopee}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Shopee */}
              <div className="mt-6">
                <label>Blibli</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="blibli"
                    defaultValue={record.blibli}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* JD.iD */}
              <div className="mt-6">
                <label>JD.ID</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="jdid"
                    defaultValue={record.jdid}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* JD.iD */}
              <div className="mt-6">
                <label>Lazada</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lazada"
                    defaultValue={record.lazada}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* JD.iD */}
              <div className="mt-6">
                <label>Astro</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="astro"
                    defaultValue={record.astro}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ItemEdit;
