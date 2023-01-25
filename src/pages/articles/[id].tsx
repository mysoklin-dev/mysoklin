import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import Container from '@/components/Container';
import Main from '@/layouts/Main';

const ArticleDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any>([]);
  const { asPath } = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('articles').getOne(`${id}`);
        setPost(resultList);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getPosts();
  }, [id]);

  useEffect(() => {
    const getRelated = async () => {
      try {
        const resultList = await pb.collection('articles').getList(1, 4, {
          filter: `id != '${id}'`,
        });
        setRelated(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getRelated();
  }, [post]);

  const convertDate = (datestring: string) => {
    if (!datestring) {
      return datestring;
    }
    const initialDate = datestring.replace('T', ' ');

    const formattedDate = new Date(initialDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour12: true,
    });

    if (formattedDate.toLowerCase() === 'invalid date') {
      return initialDate;
    }

    return formattedDate;
  };

  if (post === null || related === null) {
    return <>Loading...</>;
  }

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;

  return (
    <Main>
      <Container className="py-20">
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        <article className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <header className="mb-5">
              <div className="mb-2 font-serif text-lg text-gray-700">
                {convertDate(post.created)}
              </div>

              <h1 className="text-4xl font-black text-blue-400">
                {post.title}
              </h1>

              <div className="my-2 flex gap-3 font-serif text-lg">
                <div>
                  <img
                    src="/assets/images/FEMALE01.png"
                    alt=""
                    style={{ maxWidth: '100%' }}
                  />
                </div>

                <div>Rebeca</div>
              </div>
            </header>

            <figure>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${post?.collectionId}/${post?.id}/${post?.banner_image}`}
                alt=""
              />
            </figure>

            <div className="my-10">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {/* Widget */}
            <div className="widget">
              <div className="widget-header font-bold text-blue-400">Share</div>
              <div className="widget-content">
                <div className="flex gap-4 text-blue-400">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FacebookShareButton url={URL}>
                      <FaFacebookF fontSize={20} />
                    </FacebookShareButton>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaLink fontSize={20} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <TwitterShareButton url={URL}>
                      <FaTwitter fontSize={20} />
                    </TwitterShareButton>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <WhatsappShareButton url={URL}>
                      <FaWhatsapp fontSize={20} />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget mt-5">
              <div className="widget-header font-bold text-blue-400">
                Related Updates
              </div>
              <div>
                {/* item */}
                {related.map((relpost: any) => (
                  <div
                    key={`related-${relpost.id}`}
                    className="flex items-center border-b border-gray-300"
                  >
                    <div className="w-3/12">
                      <Link href={`/articles/${relpost.id}`}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${relpost?.collectionId}/${relpost?.id}/${relpost?.banner_image}?thumb=100x100`}
                          loading="lazy"
                          width="100"
                          height="100"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="w-9/12 pl-5">
                      <Link href={`/articles/${relpost.id}`}>
                        {relpost.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Container>

      <style jsx>{`
        .widget {
          background: #ffffff;
          border: 0.5px solid #aaaaaa;
          border-radius: 0px 0px 5px 5px;
        }

        .widget-header {
          background: #eef3f6;
          padding: 15px;
          border-radius: 5px 5px 0px 0px;
        }
        .widget-content {
          padding: 15px;
        }
      `}</style>
    </Main>
  );
};

export default ArticleDetail;
