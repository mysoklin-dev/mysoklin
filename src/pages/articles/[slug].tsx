import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';

import BlogContent from '@/components/BlogContent';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const { slug } = context.params as { slug: string };

  try {
    // Cek slug yang valid
    const record = await pb
      .collection('articles')
      .getFirstListItem(`slug = "${slug}"`);

    return {
      props: { og: JSON.parse(JSON.stringify(record)) },
    };
  } catch {
    // Cek slug lama di previous_slugs
    const result = await pb.collection('articles').getList(1, 1, {
      filter: `previous_slugs ~ "${slug}"`,
    });

    if (result.items.length > 0) {
      const article = result.items[0];
      return {
        redirect: {
          permanent: true,
          destination: `/articles/${article.slug}`,
        },
      };
    }

    // Tampilkan 404 jika tidak ditemukan
    return {
      notFound: true,
    };
  }
};

const ArticleDetail: NextPage<any> = ({ og }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return <BlogContent isFallback={isFallback} og={og} type="articles" />;
};

export default ArticleDetail;
