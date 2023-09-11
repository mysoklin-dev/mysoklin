/* eslint-disable no-alert */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import ImagePreview from '@/components/Admin/ImagePreview';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { errorAlert, getFormData, openAlert } from '@/helpers';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const table = 'updates';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  // const [removeGallery, setRemoveGallery] = useState<any[]>([]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  const getDetail = async () => {
    try {
      const item = await pb.collection(table as string).getOne(id as string);
      setRecord(item);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  // Save
  const postSave = async () => {
    console.log('hit update');
    const formData = getFormData(record);

    // Featured Image
    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
    }

    // Gallery
    const galleryInput: any = document.getElementById('gallery');
    if (galleryInput !== null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of galleryInput.files) {
        formData.append('gallery', file);
      }
    }

    // Banner Image
    const bannerInput: any = document.getElementById('banner_image');
    if (bannerInput !== null) {
      formData.append('banner_image', fileInput.files[0]);
    }

    try {
      if (typeof id !== 'undefined') {
        const res = await pb.collection(table).update(id.toString(), formData);
        console.log(res);
        if (res) {
          openAlert();
        }
      }
    } catch (error: any) {
      const err = error.data.data;
      errorAlert(err);
    }
  };

  // Preview banner image
  const handleBannerImage = async () => {
    const formData = getFormData(record);
    const fileInput: any = document.getElementById('banner_image');
    if (fileInput !== null) {
      formData.append('banner_image', fileInput.files[0]);
    }

    try {
      const updatedRecord = await pb
        .collection(table)
        .update(id as string, formData);

      setRecord(updatedRecord);
    } catch {
      // ignore catch
    }
  };

  const handleUpload = async () => {
    const formData = getFormData(record);
    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
    }

    try {
      const updatedRecord = await pb
        .collection(table)
        .update(id as string, formData);

      setRecord(updatedRecord);
    } catch {
      // ignore catch
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
      <h2 className="mb-10 text-2xl font-bold capitalize">
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
                        setRecord(() => ({
                          ...record,
                          description: data,
                        }));
                        // eslint-disable-next-line no-console
                        console.log(data);
                      }}
                      editorLoaded={editorLoaded}
                      value={record.content}
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

              {/* Image */}
              <Card className="mb-5 rounded-md">
                <div className="p-3">
                  <strong>Image</strong>
                </div>
                <hr />
                <div className="p-3 text-center">
                  {record.image && (
                    <ImagePreview
                      fileName={record.image}
                      imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/files/${record.collectionId}/${record.id}/${record.image}?thumb=100x100`}
                    />
                  )}

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

              {/* Banner Image */}
              <Card className="mb-5 rounded-md">
                <div className="p-3">
                  <strong>Banner Image</strong>
                </div>
                <hr />
                <div className="overflow-hidden text-ellipsis p-3 text-center">
                  {record.image && (
                    <ImagePreview
                      fileName={record.banner_image}
                      imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/files/${record.collectionId}/${record.id}/${record.banner_image}?thumb=100x100`}
                    />
                  )}

                  <div>
                    <label
                      htmlFor="file"
                      className="labelnomargin"
                      style={{ margin: '0!important' }}
                    >
                      <Button variant="outlined">
                        {record.banner_image ? 'Replace image' : 'Upload'}
                      </Button>
                    </label>
                  </div>

                  <input
                    type="file"
                    id="banner_image"
                    // value={form.attachment}
                    style={{ width: 0, height: 0, opacity: 0 }}
                    onChange={() => {
                      handleBannerImage();
                    }}
                  />
                </div>
              </Card>

              {/* Brands */}
              <label htmlFor="brandId">Article Type</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border border-gray-300 bg-white p-3"
                defaultValue={record.type}
                onChange={(e) => {
                  setRecord(() => ({
                    ...record,
                    type: e.target.value,
                  }));
                }}
              >
                <option value="event">Event</option>
                <option value="product">Product</option>
                <option value="promotion">Promotion</option>
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
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ItemEdit;
