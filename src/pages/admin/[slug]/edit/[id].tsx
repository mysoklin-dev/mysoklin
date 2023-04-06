import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const Editor = dynamic(() => import('@/components/Admin/Editor'), {
  ssr: false,
});

const ItemEdit = () => {
  const router = useRouter();
  const { slug, id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [record, setRecord] = useState<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
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

    if (router && router.query && router.query.slug) {
      getDetail();
    }
  }, [id, slug]);

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
        Edit {record.collectionName}
      </h2>

      {record && (
        <div className="flex">
          <div className="w-8/12">
            {/* Title */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
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

            <div className="mb-3">
              {typeof window !== 'undefined' && (
                <Editor
                  name="description"
                  onChange={(data: any) => {
                    console.log(data);
                  }}
                  editorLoaded={editorLoaded}
                  value={
                    record.description ? record.description : record.content
                  }
                />
              )}
            </div>
          </div>
          <div className="w-4/12"></div>
        </div>
      )}

      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
};

export default ItemEdit;
