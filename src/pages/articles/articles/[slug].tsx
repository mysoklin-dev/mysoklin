import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import BlogContent from "@/components/BlogContent";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as any; // no longer causes error
  return {
    redirect: {
      permanent: false,
      destination: `/articles/${slug})}`,
    },
    props: {},
  };
};

const ArticleDetail: NextPage<any> = ({ og }) => {
  const { isFallback } = useRouter();

  return <BlogContent isFallback={isFallback} og={og} type="articles" />;
};

export default ArticleDetail;
