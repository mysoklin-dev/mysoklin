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
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({});

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

    try {
      if (typeof id !== 'undefined') {
        const res = await pb.collection(slug).update(id.toString(), formData);
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

  const handleUpload = async () => {
    const formData = new FormData();
    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
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

            {/* RIGHT */}
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
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ItemEdit;
