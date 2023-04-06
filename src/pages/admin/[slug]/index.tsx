import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ItemList from '@/components/Admin/ItemList';

const RecordItems = () => {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (router.query && router.query.slug && router) {
      setSlug(router.query.slug as string);
      // console.log(router.query.slug);
    }
  }, [router, router.query, router.query.slug]);

  return (
    <>
      <ItemList slug={slug} />
    </>
  );
};

export default RecordItems;
