/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
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
  const slug = 'product_brands';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [brands, setBrands] = useState<any[] | null>(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  useEffect(() => {
      pb.collection('product_categories')
        .getFullList(200 /* batch size */, {
          sort: '-created',
        })
        .then((res) => setBrands(res));
  }, [id]);

  // Save
  const postSave = async () => {
    console.log('hit save');
    try { 
        const res = await pb.collection('product_brands').create(record);
        console.log(res);
        router.push(`/admin/${slug}`)
    } catch {
      alert('an error occured')
    }
   
  };

  return (
    <>
      <Head>
        <title>Add New Brand</title>
        <style>{`
          .main-header {
            display: none!important;
          }
        `}</style>
      </Head>
      <h2 className="mb-10 text-2xl font-bold capitalize">
        Add New Brand
      </h2>

      {domLoaded && (
        <form>
          <div className="flex gap-3">
            <div className="w-8/12">
              {/* Title */}
              <div className="mb-10">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
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
                      value={record?.description ?? ""}
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
                className="my-2 block w-full rounded-md border-2 border-gray-300 bg-white p-3"
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
                    checked={record.status && record ? record.status : false}
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
