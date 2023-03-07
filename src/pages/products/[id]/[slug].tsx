import FsLightbox from 'fslightbox-react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';
import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';

import { average } from '../../../helpers/average-rating';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const { id } = context.params as any; // no longer causes error
  const record = await pb.collection('products').getOne(id as string);
  return {
    props: { og: JSON.parse(JSON.stringify(record)) },
    revalidate: 60,
  };
};

const ProductDetail: NextPage<any> = ({ og }) => {
  const router = useRouter();
  const { isFallback } = useRouter();
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [data, setData] = useState<any>();
  const [toggler, setToggler] = useState(false);
  const [items, setProducts] = useState<any>();
  const [sources, setSources] = useState<string[]>([]);
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [user]: any = usePocketBaseAuth();
  const [revPages, setRevPages] = useState({
    page: 1,
    perPage: 3,
    totalItems: 3,
    totalPages: 1,
  });
  const [isSent, setIsSent] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const calculateRev = async () => {
    const record = await pb.collection('reviews').getList(1, 200, {
      filter: `product_id = '${id}' && status = true`,
      sort: `-created`,
      expand: 'user_id',
    });
    const rows = record.items;
    const ratings = rows.map((item: any) => item.rating);
    const result = average(ratings);
    setScore(result);
  };

  const fetchReviews = async (page: number = 1, perPage: number = 3) => {
    const record = await pb.collection('reviews').getList(page, perPage, {
      filter: `product_id = '${id}' && status = true`,
      sort: `-created`,
      expand: 'user_id',
    });
    const combine = reviews.concat(record.items);
    setReviews(() => combine);
    setRevPages({
      page: record.page,
      perPage: record.perPage,
      totalItems: record.totalItems,
      totalPages: record.totalPages,
    });
    calculateRev();
  };

  useEffect(() => {
    const fetchData = async () => {
      const record = await pb.collection('products').getOne(id as string);
      await setData(record);
      const galls = [] as any[];
      // eslint-disable-next-line array-callback-return
      record.gallery.map((item: string) => {
        galls.push(
          `${process.env.NEXT_PUBLIC_API_URL}/files/${record.collectionId}/${record.id}/${item}`
        );
      });
      setSources(galls);
    };

    if (id) {
      fetchData();
      fetchReviews();
    }
  }, [id, router]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resultList = await pb.collection('products').getList(1, 3, {
          filter: `product_brand_id ~ '${data.product_brand_id}' && id != '${id}'`,
        });
        setProducts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    if (data && data.product_brand_id) {
      getProducts();
    }
  }, [data]);

  const changeRating = (ratingNum: number) => {
    setRating(ratingNum);
  };

  const sendReview = async () => {
    try {
      const reviewData = {
        product_id: id,
        user_id: user.model.id,
        description: reviewText,
        rating,
        status: false,
      };

      const r = await pb.collection('reviews').create(reviewData);
      if (r.collectionId) {
        // eslint-disable-next-line no-console
        console.log('success');
        setIsSent(true);
      }
      fetchReviews();
      setRating(0);
      setReviewText('');
    } catch {
      // ignore
    }
  };

  if (isFallback && !data) {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>{og?.title}</title>
        <meta property="og:title" content={og?.title} />
        <meta name="description" content={og?.description} />
        <meta property="og:description" content={og?.description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/files/${og.collectionId}/${og.id}/${og.image}`}
        />
      </Head>
      {data && (
        <>
          <section className="bg-white py-12 px-8 md:px-0">
            <Container>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-gray-700">
                <div>
                  <Link href="/">
                    <img
                      src="/assets/images/home-muted.svg"
                      width="13"
                      height="13"
                      alt=""
                    />
                  </Link>
                </div>
                <div>\</div>
                <div>Products</div>
                <div>\</div>
                <div className="text-gray-500">{data ? data.title : ''}</div>
              </div>

              {/* Rating */}
              <div className="mt-6">
                <div className="flex gap-4">
                  <div>
                    <StarRatings
                      starRatedColor="#ffa904"
                      rating={score}
                      starDimension="16px"
                      starSpacing="2px"
                    />
                  </div>

                  <div>{score}/5</div>
                </div>
              </div>

              {/* HEADLINE */}
              <h1 className="mt-6 text-5xl font-black text-blue-400">
                {data?.title}
              </h1>

              {/* Socials */}
              <div className="mt-6 items-center gap-3 md:flex">
                {data.tokopedia !== '' && (
                  <a
                    href={data.tokopedia}
                    target="_BLANK"
                    rel="noreferrer"
                    className="mt-2 inline-block md:mt-0"
                  >
                    <Button
                      variant="outlined"
                      style={{ height: 50, width: 200 }}
                      icon={
                        <img src="/assets/images/logos/tokopedia.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Tokopedia
                    </Button>
                  </a>
                )}

                {data.shopee !== '' && (
                  <a
                    href={data.shopee}
                    target="_BLANK"
                    rel="noreferrer"
                    className="mt-2 inline-block md:mt-0"
                  >
                    <Button
                      variant="outlined"
                      style={{ height: 50, width: 200 }}
                      icon={
                        <img src="/assets/images/logos/shopee.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Shopee
                    </Button>
                  </a>
                )}

                {data.blibli !== '' && (
                  <a
                    href={data.blibli}
                    target="_BLANK"
                    rel="noreferrer"
                    className="mt-2 inline-block md:mt-0"
                  >
                    <Button
                      variant="outlined"
                      style={{ height: 50, width: 200 }}
                      icon={
                        <img src="/assets/images/logos/blibli.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Blibli
                    </Button>
                  </a>
                )}

                {data.jdid !== '' && (
                  <a
                    href={data.jdid}
                    target="_BLANK"
                    rel="noreferrer"
                    className="mt-2 inline-block md:mt-0"
                  >
                    <Button
                      variant="outlined"
                      style={{ height: 50, width: 200 }}
                      icon={<img src="/assets/images/logos/jd.png" alt="" />}
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      JD.ID
                    </Button>
                  </a>
                )}

                {data.tokopedia !== '' &&
                  data.shopee !== '' &&
                  data.blibli !== '' &&
                  data.jdid !== '' && (
                    <Button
                      variant="contained-blue"
                      style={{ height: 50, width: 200 }}
                      onClick={() => {
                        setModal(true);
                      }}
                      appendIcon={
                        <svg
                          width="8"
                          height="10"
                          viewBox="0 0 8 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.50254 0.000771076L7.49703 5.00586L2.50254 5.00586L2.98425e-08 2.50332L2.50254 0.000771076Z"
                            fill="white"
                          />
                          <path
                            d="M2.50254 5.00552L7.49703 5.00552L2.50254 10L2.98425e-08 7.49746L2.50254 5.00552Z"
                            fill="white"
                          />
                        </svg>
                      }
                    >
                      Show All
                    </Button>
                  )}
              </div>
            </Container>
          </section>

          {/* Description */}
          <section
            className="py-12 px-8 md:px-0"
            style={{ background: '#EEF3F6' }}
          >
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2">
                  {data && data.description ? (
                    <div
                      className="maindesc"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  ) : (
                    <>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis ex harum quis et cumque perspiciatis id,
                        dolorem magnam voluptatibus est illum minus nulla labore
                        praesentium, vel ipsum magni voluptas repudiandae?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis ex harum quis et cumque perspiciatis id,
                        dolorem magnam voluptatibus est illum minus nulla labore
                        praesentium, vel ipsum magni voluptas repudiandae?
                      </p>
                    </>
                  )}
                  {!data}
                </div>

                <div className="text-center">
                  <div className="flex justify-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.image}`}
                      width={213}
                      height={424}
                      style={{ width: 'auto!important', height: 424 }}
                      className="d-inline-block w-auto"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Gallery */}
          <section className="bg-white py-12 px-8 md:px-0">
            <Container>
              <div className="grid-cols-1 gap-4 md:grid md:grid-cols-12 md:gap-10">
                <div className="col-span-1 mb-4 md:col-span-5 md:mb-0">
                  {data && data.gallery && data.gallery.length > 0 && (
                    <div
                      className="gallery"
                      onClick={() => setToggler(!toggler)}
                    >
                      <div>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.gallery[0]}?thumb=456x350`}
                          alt=""
                        />
                      </div>

                      <div className="mt-1 flex justify-between gap-1">
                        {data.gallery.length > 0 &&
                          data.gallery.map((img: string, i: number) => (
                            <React.Fragment key={`gallery-${img}--${i + 1}`}>
                              <>
                                {i > 0 && (
                                  <div>
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data.gallery[i]}?thumb=384x300`}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </>
                            </React.Fragment>
                          ))}
                        {data?.gallery.length > 4 && (
                          <div
                            style={{ height: 69 }}
                            className="hidden items-center justify-center bg-blue-400 text-xs font-bold text-white md:flex"
                          >
                            <div style={{ width: 86 }} className="text-center">
                              Show All
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <FsLightbox toggler={toggler} sources={sources} />
                </div>

                {/* Features */}
                <div className="col-span-7 text-xl">
                  <h2 className="mb-4 text-2xl font-black text-blue-400">
                    Key Features
                  </h2>

                  {data && data.feature ? (
                    <div
                      className="textformat font-serif"
                      dangerouslySetInnerHTML={{ __html: data.feature }}
                    ></div>
                  ) : (
                    <ul className="list-none font-serif">
                      <li>
                        Oxyclean technology, membuat warna putih pakaian menjadi
                        bersih sempurna, cemerlang, dan tidak kusam
                      </li>
                      <li>
                        Mengandung anti-bacterial agent, yang dapat membunuh
                        99.99% bakteri sehingga cucian tidak apek
                      </li>
                      <li>Lembut dan tidak panas di tangan</li>
                      <li>Aman untuk pakaian berwarna</li>
                    </ul>
                  )}

                  <h2 className="mt-10 mb-4 text-2xl font-black text-blue-400">
                    Specification
                  </h2>

                  {data && data.specification ? (
                    <div
                      className="textformat font-serif"
                      dangerouslySetInnerHTML={{ __html: data.specification }}
                    ></div>
                  ) : (
                    <ul className="list-none font-serif">
                      <li>Packaging: Bottle,</li>
                      <li>Pouch Weight: 900 ml</li>
                    </ul>
                  )}
                </div>
              </div>
            </Container>
          </section>

          <Container>
            <hr />
          </Container>

          <Container className="mt-10 px-4 pb-10 md:px-0">
            <h2 className="mb-4 text-2xl font-black text-blue-400">Review</h2>

            <div>{revPages?.totalItems ?? '0'} Reviews</div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2">
                <h4 className="mt-6 text-5xl font-black text-orange-400">
                  {score}/5
                </h4>
              </div>

              <div className="col-span-10">
                <textarea
                  className="form-control block w-full rounded-md border-2 border-solid border-gray-300 p-4"
                  name="review_content"
                  id=""
                  cols={30}
                  rows={10}
                  value={reviewText}
                  onChange={(e: any) => setReviewText(e.target.value)}
                ></textarea>

                <div className="my-3">
                  <StarRatings
                    rating={rating}
                    starDimension="40px"
                    starSpacing="5px"
                    starRatedColor="#ffa904"
                    changeRating={changeRating}
                  />
                </div>

                <div className="mt-3">
                  <Button
                    fullWidth={false}
                    variant="contained-blue"
                    onClick={sendReview}
                    style={{
                      height: 40,
                      display: 'inline-block',
                      lineHeight: '20px',
                    }}
                  >
                    Submit Review
                  </Button>
                </div>

                <div className="mt-10">
                  {/* {JSON.stringify(revPages, null, 2)} */}
                  {reviews &&
                    reviews.map((item: any, i: number) => (
                      <div
                        key={`review-${item.id}-${i}`}
                        className=" grid grid-cols-12 gap-4 border-b-2 border-solid border-gray-300 py-8 md:grid-cols-10"
                      >
                        <div className="col-span-2 md:col-span-1">
                          <img
                            className="rounded-full"
                            src={
                              item?.expand?.user_id?.avatar !== ''
                                ? item.expand.user_id.avatar
                                : item.expand.user_id.avatarUrl
                            }
                            alt={item.expand.user_id.name}
                          />
                        </div>

                        <div className="col-span-9 md:col-span-9">
                          <h4 className="mb-2 text-lg">
                            {item.expand.user_id.name}
                          </h4>

                          <div className="flex gap-4">
                            <div>
                              <StarRatings
                                starRatedColor="#ffa904"
                                rating={item.rating}
                                starDimension="16px"
                                starSpacing="2px"
                              />
                            </div>

                            <div>{item.rating}/5</div>
                          </div>

                          <div
                            className="textformat mt-2"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                  <div className="mt-8 flex justify-end">
                    {revPages.totalItems > revPages.perPage &&
                      revPages.totalPages > revPages.page && (
                        <Button
                          fullWidth={false}
                          variant="contained-blue"
                          onClick={() => {
                            const next = revPages.page + 1;
                            // eslint-disable-next-line radix
                            fetchReviews(next);
                          }}
                          style={{
                            height: 40,
                            display: 'inline-block',
                            lineHeight: '20px',
                          }}
                        >
                          Show More
                        </Button>
                      )}
                  </div>

                  {/* <pre>{JSON.stringify(reviews, null, 2)}</pre> */}
                </div>
              </div>
            </div>
          </Container>

          {/* related */}
          {items && items.length > 1 && (
            <Container className="py-20 px-8 md:px-0">
              <h2 className="mb-20 text-2xl font-black text-blue-400">
                Related Products
              </h2>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {items &&
                  items.length > 0 &&
                  items.map((item: any, i: any) => (
                    <div className="col-span-1 mb-10" key={`product-${i}`}>
                      <ProductCardCircle
                        id={item.id}
                        title={item.title}
                        img={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item.image}`}
                      />
                    </div>
                  ))}
              </div>
            </Container>
          )}
        </>
      )}

      {/* Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-box">
            <div className="modal-header flex items-center justify-center font-black">
              Store Options
              <div
                className="closer"
                onClick={() => {
                  setModal(false);
                }}
              >
                <img src="/assets/images/cross.svg" alt="close" />
              </div>
            </div>

            <div className="modal-content">
              {/* Brands item */}
              <div className="mb-3">
                {data.tokopedia !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.tokopedia}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={
                        <img src="/assets/images/logos/tokopedia.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Tokopedia
                    </Button>
                  </a>
                )}

                {data.shopee !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.shopee}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={
                        <img src="/assets/images/logos/shopee.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Shopee
                    </Button>
                  </a>
                )}

                {data.blibli !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.blibli}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={
                        <img src="/assets/images/logos/blibli.png" alt="" />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Blibli
                    </Button>
                  </a>
                )}

                {data.jdid !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.jdid}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={<img src="/assets/images/logos/jd.png" alt="" />}
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      JD.ID
                    </Button>
                  </a>
                )}

                {data.lazada !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.lazada}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={
                        <img
                          src="/assets/images/logos/lazada.webp"
                          width="30"
                          alt=""
                        />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Lazada
                    </Button>
                  </a>
                )}

                {data.astro !== '' && (
                  <a
                    target="_BLANK"
                    className="d-block my-3 block"
                    href={data.astro}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      square
                      style={{ height: 60 }}
                      icon={
                        <img
                          src="/assets/images/logos/astro.jpeg"
                          width="30"
                          alt=""
                        />
                      }
                      appendIcon={
                        <img
                          src="/assets/images/chevron-right.svg"
                          width={10}
                          height={7.5}
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      }
                    >
                      Astro
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isSent && (
        <>
          <div
            onClick={() => {
              setIsSent(false);
            }}
            className="modal-overlay"
          ></div>
          <div className="modal-box rounded-md bg-white px-7 py-6 pb-10 text-center">
            <div className="text-right">
              <button
                onClick={() => {
                  setIsSent(false);
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
                Your review has been submitted, it will be shown once our
                moderator approve it.
              </div>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <style jsx>{`
        .modal-box {
          position: fixed;
        }
        p,
        .maindesc {
          font-family: 'Karma';
          font-style: normal;
          font-size: 25px;
          line-height: 150%;
          margin: 30px 0;
          white-space: pre-wrap;
        }

        .maingall img {
          width: 100%;
          object-fit: contain;
          height: 100%;
        }

        ul {
          list-style: circle;
          padding-left: 20px;
          white-space: pre-wrap;
        }

        ul li {
          margin-bottom: 15px;
          white-space: pre-wrap;
        }
        .gallery > div {
          opacity: 0.9;
          transition: all 0.2s;
          cursor: pointer;
        }

        .textformat {
          white-space: pre-wrap;
          line-height: 1.4;
        }
      `}</style>

      <TipsAndTricks />
    </>
  );
};

export default ProductDetail;
