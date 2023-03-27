import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';

import BlogContent from '@/components/BlogContent';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const { slug } = context.params as any; // no longer causes error
  const record = await pb
    .collection('updates')
    .getFirstListItem(`slug ~ "${slug}"`);
  return {
    props: { og: JSON.parse(JSON.stringify(record)) },
    revalidate: 60,
  };
};

const ArticleDetail: NextPage<any> = ({ og }) => {
  const { isFallback } = useRouter();

  return <BlogContent isFallback={isFallback} og={og} type="updates" />;
};

export default ArticleDetail;
