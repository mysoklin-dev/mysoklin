/* eslint-disable no-alert */

import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';

import ImagePreview from '@/components/Admin/ImagePreview';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { errorAlert, getFormData, openAlert } from '@/helpers';

const ItemEdit = () => {
  const router = useRouter();
  const slug = 'product_categories';
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({});
  const [domLoaded, setDomLoaded] = useState(false);
  const [imgPreview, setImgPreview] = useState<any>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  // Preview image
  const handleUpload = () => {
    const fileInput: any = document.getElementById('file');
    const file = fileInput.files[0];

    setImgPreview(file);
  };

  // Save
  const postSave = async () => {
    console.log('hit save');
    const formData = getFormData(record);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
    }

    try {
      const res = await pb.collection(slug).create(formData);
      console.log(res);
      router.push(`/admin/${slug}`);

      if (res) {
        openAlert();
      }
    } catch (error: any) {
      const err = error.data.data;
      errorAlert(err);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Product Category</title>
        <style>{`
          .main-header {
            display: none!important;
          }
        `}</style>
      </Head>
      <h2 className="mb-10 text-2xl font-bold capitalize">
        Add New Product Category
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

              {/* Sequence */}
              <div className="mt-6">
                <label>Sequence</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sequence"
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
                        checked={record.status ?? false}
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

              {/* Featured Image */}
              <Card className="mb-5 rounded-md">
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
          </div>
        </form>
      )}
    </>
  );
};

export default ItemEdit;
