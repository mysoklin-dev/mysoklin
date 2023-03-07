import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
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

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const { id } = context.params as any; // no longer causes error
  const record = await pb.collection('articles').getOne(`${id}`);
  return {
    props: { og: JSON.parse(JSON.stringify(record)) },
    revalidate: 60,
  };
};

const ArticleDetail: NextPage<any> = ({ og }) => {
  const router = useRouter();
  const { isFallback } = useRouter();

  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);
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

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy', true, text);
  }

  const copyUrl = () => {
    const page = `${window.location.href}`;
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(page)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  if (isFallback && !og) {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>{og?.title}</title>
        <meta name="description" content={og?.content.substring(0, 100)} />
        <meta property="og:title" content={og?.og_title} />
        <meta
          property="og:description"
          content={og?.og_description.substring(0, 100)}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.banner_image}`}
        />
      </Head>
      {post && (
        <Container className="py-20 px-8 md:px-0">
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
          <article className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
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
            <div className="md:col-span-1">
              {/* Widget */}
              <div className="widget">
                <div className="widget-header font-bold text-blue-400">
                  Share
                </div>
                <div className="widget-content">
                  <div className="flex gap-4 text-blue-400">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                      <FacebookShareButton url={URL}>
                        <FaFacebookF fontSize={20} />
                      </FacebookShareButton>
                    </div>
                    <button
                      onClick={() => {
                        copyUrl();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center"
                    >
                      <FaLink fontSize={20} />
                    </button>
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
                  {related &&
                    related.length > 0 &&
                    related.map((relpost: any) => (
                      <div
                        key={`related-${relpost.id}`}
                        className="flex items-center border-b border-gray-300"
                      >
                        <div className="w-3/12">
                          <Link
                            href={`/articles/${relpost.id}/${relpost.title
                              .replaceAll(' ', '-')
                              .toLowerCase()}`}
                          >
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
                          <Link
                            href={`/articles/${relpost.id}/${relpost.title
                              .replaceAll(' ', '-')
                              .toLowerCase()}`}
                          >
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
      )}

      {isCopied && (
        <>
          <div
            onClick={() => {
              setIsCopied(false);
            }}
            className="modal-overlay"
          ></div>
          <div className="modal-box rounded-md bg-white px-7 py-6 pb-10 text-center">
            <div className="text-right">
              <button
                onClick={() => {
                  setIsCopied(false);
                }}
              >
                <img
                  src="/assets/images/close__1.svg"
                  alt="close"
                  loading="lazy"
                />
              </button>
            </div>

            <div className="mt-5 mb-8 text-center">
              <img
                src="/assets/images/amico.svg"
                style={{ display: 'inline-block' }}
                alt=""
              />

              <div className="mt-4 text-2xl font-black">
                URL successfully Copied
              </div>
            </div>

            <button
              onClick={() => {
                setIsCopied(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .modal-box {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 400px;
          margin: 0 auto;
          left: 0;
          right: 0;
          background: #fff;
          z-index: 99999;
        }
        .modal-overlay {
          position: fixed;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
        }
        .close {
          width: 78px;
          height: 40px;
          background: rgba(0, 16, 61, 0.06);
          border-radius: 4px;
          font-size: 14px;
        }
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
    </>
  );
};

export default ArticleDetail;
