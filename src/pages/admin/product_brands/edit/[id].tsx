/* eslint-disable no-alert */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';

import ImagePreview from '@/components/Admin/ImagePreview';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { errorAlert, getFormData, openAlert } from '@/helpers';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const slug = 'product_brands';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [brands, setBrands] = useState<any[] | null>(null);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

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

  const handleUpload = async () => {
    const formData = new FormData();
    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('logo', fileInput.files[0]);
    }

    try {
      const updatedRecord = await pb
        .collection(slug)
        .update(id as string, formData);

      setRecord(updatedRecord);
    } catch {
      // ignore catch
    }
  };

  // Save
  const postSave = async () => {
    console.log('hit save');

    const formData = getFormData(record);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('logo', fileInput.files[0]);
    }

    try {
      if (typeof id !== 'undefined') {
        const res = await pb.collection(slug).update(id.toString(), formData);
        if (res) {
          openAlert();
        }
      }
    } catch (error: any) {
      const err = error.data.data;
      errorAlert(err);
    }
  };

  if (!record) {
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
      <h2 className="mb-10 text-2xl font-bold capitalize">
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
                  onChange={(e: any) => {
                    setRecord({
                      ...record,
                      slug: e.target.value,
                    });
                  }}
                  className={inputStyle}
                />
              </div>

              {/* Description */}
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
              {/* Publish */}
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

              {/* Logo */}
              <Card className="mb-5 rounded-md">
                <div className="p-3">
                  <strong>Image</strong>
                </div>
                <hr />
                <div className="p-3 text-center">
                  <ImagePreview
                    fileName={record.logo}
                    imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/files/${record.collectionId}/${record.id}/${record.logo}?thumb=100x100`}
                  />

                  <div>
                    <label
                      htmlFor="file"
                      className="labelnomargin"
                      style={{ margin: '0!important' }}
                    >
                      <Button variant="outlined">
                        {record.image ? 'Replace image' : 'Upload Image'}
                      </Button>
                    </label>
                  </div>

                  <input
                    type="file"
                    id="file"
                    // value={form.attachment}
                    style={{ width: 0, height: 0, opacity: 0 }}
                    onChange={(e: any) => {
                      console.log(e.target.value);
                      handleUpload();
                    }}
                  />
                </div>
              </Card>

              {/* Brands */}
              <label htmlFor="brandId">Product Category</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border-2 border-gray-300 bg-white p-3"
                defaultValue={record.product_category_id}
                onChange={(e) => {
                  setRecord(() => ({
                    ...record,
                    product_category_id: e.target.value,
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

              {/* Header media type */}
              <div className="mt-6">
                <label htmlFor="bannerHeaderType">Header Media Type</label>
                <select
                  id="bannerHeaderType"
                  className="my-2 block w-full rounded-md border-2 border-gray-300 bg-white p-3"
                  defaultValue={record.banner_header_type}
                  onChange={(e) => {
                    setRecord(() => ({
                      ...record,
                      banner_header_type: e.target.value,
                    }));
                  }}
                >
                  <option value="color">Color</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
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
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ItemEdit;
