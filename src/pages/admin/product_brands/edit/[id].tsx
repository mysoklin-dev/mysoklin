/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch'

import Button from '@/components/Button';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const slug = 'product_brands';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({});
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
      pb.collection('product_categories')
        .getFullList(200 /* batch size */, {
          sort: '-created',
        })
        .then((res) => setBrands(res));
    }
  }, [id]);

  // Save
  const postSave = async () => {
    console.log('hit save');
    try { 
      if (typeof id !== 'undefined') {
        const res = await pb.collection('product_brands').update(id.toString(), record);
        console.log(res);
      }
    } catch {
      alert('an error occured')
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
        Edit {record?.collectionName?.replaceAll('_', ' ')}
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
                        setRecord(() => ({
                          ...record,
                          description: data,
                        }));
                        // eslint-disable-next-line no-console
                        console.log(data);
                      }}
                      editorLoaded={editorLoaded}
                      value={
                        record.description ? record.description : record.content
                      }
                    />
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
              <label htmlFor="brandId">Product Category</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
                value={record.product_category_id}
                onChange={(e) => {
                  setRecord(() => ({
                    ...record,
                    product_category_id: e.target.value
                  }))
                }}
              >
                {brands?.map((item: any) => (
                  <option key={`brand_id-${item.id}`} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>

              <div className="mt-6">
                 <label htmlFor="bannerHeaderType">Product Category</label>
                 <select
                    id="bannerHeaderType"
                    className="my-2 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
                    value={record.banner_header_type}
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        banner_header_type: e.target.value
                      }))
                    }}
                  >
                    <option value="color">
                      Color
                    </option>
                    <option value="image">
                      Image
                    </option>
                    <option value="video">
                      Vide
                    </option>
                  </select>
              </div>

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
                    checked={record.status ? record.status : false}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        og_title: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        og_description: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* color */}
              <div className="mt-6">
                <label>Header Color</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    className={inputStyle}
                    defaultValue={record.header_color}
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        header_color: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              
              {/* Sequence */}
              <div className="mt-6">
                <label>Sequence</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    defaultValue={record.sequence}
                    className={inputStyle}
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        sequence: e.target.value,
                      }));
                    }}
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
