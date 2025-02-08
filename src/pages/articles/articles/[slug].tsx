import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const { slug } = context.params as { slug?: string };

  if (!slug) {
    return { notFound: true };
  }

  try {
    const currentArticle = await pb
      .collection('articles')
      .getFirstListItem(`slug = "${slug}"`);
    if (currentArticle) {
      return {
        props: { og: JSON.parse(JSON.stringify(currentArticle)) },
      };
    }
  } catch {
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
  }

  return { notFound: true };
};
