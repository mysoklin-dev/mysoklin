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
  const table = 'articles';
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({
    description: '',
    feature: '',
  });
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const [imgPreview, setImgPreview] = useState<any>(null);
  const [bannerImage, setBannerImage] = useState<any>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  // Preview image
  const handleUpload = () => {
    const fileInput: any = document.getElementById('file');
    const file = fileInput.files[0];

    setImgPreview(file);
  };

  // Preview banner image
  const handleBannerImage = () => {
    const fileInput: any = document.getElementById('banner_image');
    const file = fileInput.files[0];

    setBannerImage(file);
  };

  // Save Post
  const postSave = async () => {
    console.log('hit save');
    // Create Form Data from JSON
    const formData = getFormData(record);

    const fileInput: any = document.getElementById('file');
    if (fileInput !== null) {
      formData.append('image', fileInput.files[0]);
    }

    const bannerInput: any = document.getElementById('banner_image');
    if (bannerInput !== null) {
      formData.append('banner_image', fileInput.files[0]);
    }

    // HIT API
    try {
      const res = await pb.collection(table).create(formData);
      if (res) {
        router.push('/admin/products/items');
      }
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
                    <label>Description</label>
                    <Editor
                      name="content"
                      onChange={(data: any) => {
                        setRecord(() => ({
                          ...record,
                          content: data,
                        }));
                      }}
                      editorLoaded={editorLoaded}
                      value={record.content}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="w-4/12">
              {/* Publish Box */}
              <Card className="mb-3 rounded-md">
                <div className="p-3">
                  <strong>Publish</strong>
                </div>
                <hr />
                <div className="grid grid-cols-1 gap-3 p-3">
                  <div>
                    <Button square variant="contained-blue" onClick={postSave}>
                      Save
                    </Button>
                  </div>
                </div>
              </Card>

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

              {/* Banner Image */}
              <Card className="mb-5 rounded-md">
                <div className="p-3">
                  <strong>Banner Image</strong>
                </div>
                <hr />
                <div className="overflow-hidden text-ellipsis p-3 text-center">
                  {bannerImage && <ImagePreview file={bannerImage} />}

                  <div>
                    <label
                      htmlFor="file"
                      className="labelnomargin"
                      style={{ margin: '0!important' }}
                    >
                      <Button variant="outlined">
                        {bannerImage ? 'Replace image' : 'Upload'}
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
                onChange={(e) => {
                  setRecord(() => ({
                    ...record,
                    type: e.target.value,
                  }));
                }}
              >
                <option value="tips">Tips</option>
                <option value="tricks">Tricks</option>
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
