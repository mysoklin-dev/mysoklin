/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Switch from 'react-switch'

import Button from '@/components/Button';



const ItemEdit = () => {
  const router = useRouter();
  const slug = 'product_categories';
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>({});
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  const inputStyle =
    'block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-3';

  // Save
  const postSave = async () => {
    console.log('hit save');
    try { 
        const res = await pb.collection(slug).create(record);
        console.log(res);
        router.push(`/admin/${slug}`)
    } catch {
      alert('an error occured')
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
      <h2 className="font-bold mb-10 text-2xl capitalize">
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

              
            </div>
            <div className="w-4/12">
              <div className="mb-10">
                <Button square variant="contained-blue" onClick={postSave}>
                  Save
                </Button>
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

              {/* Sequence */}
              <div className="mt-6">
                <label>Sequence</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sequence"
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
