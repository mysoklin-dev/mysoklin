/* eslint-disable no-alert */
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
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
  const slug = 'products';
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [brands, setBrands] = useState<any[] | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  // const [removeGallery, setRemoveGallery] = useState<any[]>([]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  const getDetail = async () => {
    try {
      const item = await pb.collection(slug as string).getOne(id as string);
      setRecord(item);

      if (item.gallery && item.gallery.length > 0) {
        console.log(item.gallery);
        const gallArr: any[] = [];

        item.gallery.map((img: string, i: number) =>
          gallArr.push({
            imgUrl: `${process.env.NEXT_PUBLIC_API_URL}/files/${item?.collectionId}/${item?.id}/${item.gallery[i]}?thumb=100x100`,
            fileName: img,
          })
        );

        setGallery(gallArr);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
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

  const handleGallery = () => {
    const fileInput: any = document.getElementById('gallery');
    const { files } = fileInput;
    const gallFiles = Array.from(files).map((item: any) => {
      const imgObj = {
        fileName: item.name,
        imgUrl: window.URL.createObjectURL(item),
      };
      return imgObj;
    });
    const joinGall = [...gallery, ...gallFiles];
    setGallery(joinGall);
  };

  // Delete gallery individual
  const deleteGallItem = async (index: number) => {
    const res = await pb.collection(slug).update(id as string, {
      [`gallery.${index}`]: null,
    });

    if (res) {
      getDetail();
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

                    <div className="my-6">
                      <label>Feature</label>
                      <Editor
                        name="feature"
                        onChange={(data: any) => {
                          setRecord(() => ({
                            ...record,
                            feature: data,
                          }));
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
                          setRecord(() => ({
                            ...record,
                            specification: data,
                          }));
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

              {/* Gallery */}
              <Card className="mb-5 rounded-md">
                <div className="p-3">
                  <strong>Gallery</strong>
                </div>
                <hr />
                <div className="overflow-hidden text-ellipsis p-3 text-center">
                  {gallery.length > 0 &&
                    gallery.map((img, i) => (
                      <ImagePreview
                        fileName={img.fileName}
                        imgUrl={img.imgUrl}
                        appendIcon={
                          <FaTimes
                            onClick={() => {
                              deleteGallItem(i);
                            }}
                          />
                        }
                        key={`gallery-image-${i}`}
                      />
                    ))}

                  <div>
                    <label
                      htmlFor="gallery"
                      className="labelnomargin"
                      style={{ margin: '0!important' }}
                    >
                      <Button variant="outlined">Add gallery item</Button>
                    </label>
                  </div>

                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/svg+xml"
                    multiple={true}
                    id="gallery"
                    // value={form.attachment}
                    style={{ width: 0, height: 0, opacity: 0 }}
                    onChange={() => {
                      handleGallery();
                    }}
                  />
                </div>
              </Card>

              {/* Brands */}
              <label htmlFor="brandId">Product Brand</label>
              <select
                id="brandId"
                className="my-2 block w-full rounded-md border border-gray-300 bg-white p-3"
                value={record.product_brand_id}
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
