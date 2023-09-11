import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';

import ImagePreview from '@/components/Admin/ImagePreview';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { getFormData } from '@/helpers';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({
    description: '',
    feature: '',
  });
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [brands, setBrands] = useState<any[] | null>(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [imgPreview, setImgPreview] = useState<any>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  useEffect(() => {
    pb.collection('product_brands')
      .getFullList(200 /* batch size */, {
        sort: '-created',
      })
      .then((res) => setBrands(res));
  }, []);

  // Preview image
  const handleUpload = () => {
    const fileInput: any = document.getElementById('file');
    const file = fileInput.files[0];

    setImgPreview(file);
  };

  // Save Post
  const postSave = async () => {
    console.log('hit save');

    const formData = getFormData(record);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
    }

    try {
      const res = await pb.collection('products').create(formData);
      if (res) {
        router.push('/admin/products/items');
      }
    } catch {
      // test
    }
  };

  return (
    <>
      <Head>
        <title>Add New Product</title>
        <style>{`
          .main-header {
            display: none!important;
          }
        `}</style>
      </Head>
      <h2 className="mb-10 text-2xl font-bold capitalize">Add New Product</h2>

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
                      }}
                      editorLoaded={editorLoaded}
                      value={record.description}
                    />

                    <div className="my-6">
                      <label>Feature</label>
                      <Editor
                        name="feature"
                        onChange={(data: any) => {
                          setRecord(() => ({
                            ...record,
                            feature: data,
                          }));
                        }}
                        editorLoaded={editorLoaded}
                        value={record.feature ?? ''}
                      />
                    </div>

                    <div className="my-6">
                      <label>Specification</label>
                      <Editor
                        name="specification"
                        onChange={(data: any) => {
                          setRecord(() => ({
                            ...record,
                            specification: data,
                          }));
                        }}
                        editorLoaded={editorLoaded}
                        value={record.specification ?? ''}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-4/12">
              {/* Publish Box */}
              <div className="mb-10">
                <Card className="rounded-md">
                  <div className="p-3">
                    <strong>Publish</strong>
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <div className="flex items-center gap-3">
                      {/* Status */}
                      <label>Status</label>
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

                    <hr />

                    <div>
                      <Button
                        square
                        variant="contained-blue"
                        onClick={postSave}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mb-10">
                <Card className="rounded-md">
                  <div className="p-3">
                    <strong>Image</strong>
                  </div>
                  <hr />
                  <div className="overflow-hidden text-ellipsis p-3 text-center">
                    {imgPreview && <ImagePreview file={imgPreview} />}

                    <div>
                      <label
                        htmlFor="file"
                        className="labelnomargin"
                        style={{ margin: '0!important' }}
                      >
                        <Button variant="outlined">
                          {imgPreview ? 'Replace image' : 'Upload'}
                        </Button>
                      </label>
                    </div>

                    <input
                      type="file"
                      id="file"
                      // value={form.attachment}
                      style={{ width: 0, height: 0, opacity: 0 }}
                      onChange={() => {
                        handleUpload();
                      }}
                    />
                  </div>
                </Card>
              </div>

              {/* Brands */}
              <label htmlFor="brandId">Product Brand</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border border-gray-300 bg-white p-3"
                onChange={(e) => {
                  setRecord(() => ({
                    ...record,
                    product_brand_id: e.target.value,
                  }));
                }}
              >
                {brands?.map((item: any) => (
                  <option key={`brand_id-${item.id}`} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>

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

              {/* tokped */}
              <div className="mt-6">
                <label>Tokopedia</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tokopedia"
                    defaultValue={record.tokopedia}
                    className={inputStyle}
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        tokopedia: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        shopee: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        blibli: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        jdid: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        lazada: e.target.value,
                      }));
                    }}
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
                    onChange={(e) => {
                      setRecord(() => ({
                        ...record,
                        astro: e.target.value,
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
