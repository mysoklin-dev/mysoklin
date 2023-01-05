import FsLightbox from 'fslightbox-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductCardCircle from '@/components/ProductCardCircle';
import TipsAndTricks from '@/components/TipsAndTricks';
import Main from '@/layouts/Main';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [data, setData] = useState<any>();
  const [toggler, setToggler] = useState(false);
  const [items, setProducts] = useState<any>();
  const [sources, setSources] = useState<string[]>([]);
  const [modal, setModal] = useState(false);

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
    }
  }, [id, router]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resultList = await pb.collection('products').getList(1, 3, {
          filter: `product_brand_id ~ '${data.product_brand_id}'`,
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

  return (
    <Main>
      {data && (
        <>
          <section className="bg-white py-12">
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
                <img src="/assets/images/rating.svg" alt="" />
              </div>

              {/* HEADLINE */}
              <h1 className="mt-6 text-5xl font-black text-blue-400">
                {data?.title}
              </h1>

              {/* Socials */}
              <div className="mt-6 flex items-center gap-3">
                <a href={data.tokopedia}>
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

                <a href={data.shopee}>
                  <Button
                    variant="outlined"
                    style={{ height: 50, width: 200 }}
                    icon={<img src="/assets/images/logos/shopee.png" alt="" />}
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

                <a href={data.blibli}>
                  <Button
                    variant="outlined"
                    style={{ height: 50, width: 200 }}
                    icon={<img src="/assets/images/logos/blibli.png" alt="" />}
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

                <a href={data.jdid}>
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
              </div>
            </Container>
          </section>

          {/* Description */}
          <section className="py-12" style={{ background: '#EEF3F6' }}>
            <Container>
              <div className="grid grid-cols-3">
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
          <section className="bg-white py-12">
            <Container>
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-5">
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

                      <div className="mt-1 flex gap-1">
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.gallery[1]}?thumb=384x300`}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.gallery[2]}?thumb=384x300`}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.gallery[3]}?thumb=384x300`}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data?.collectionId}/${data?.id}/${data?.gallery[4]}?thumb=384x300`}
                            alt=""
                          />
                        </div>
                        <div
                          style={{ height: 71.6, width: '74px!important' }}
                          className="flex items-center justify-center bg-blue-400 text-xs font-bold text-white"
                        >
                          <div style={{ width: 74 }} className="text-center">
                            Show All
                          </div>
                        </div>
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

          {/* related */}
          <Container className="py-20">
            <h2 className="mb-20 text-2xl font-black text-blue-400">
              Related Products
            </h2>
            <div className="grid grid-cols-3 gap-10">
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
                <a className="d-block my-3 block" href={data.tokopedia}>
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

                <a className="d-block my-3 block" href={data.shopee}>
                  <Button
                    variant="outlined"
                    fullWidth
                    square
                    style={{ height: 60 }}
                    icon={<img src="/assets/images/logos/shopee.png" alt="" />}
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

                <a className="d-block my-3 block" href={data.blibli}>
                  <Button
                    variant="outlined"
                    fullWidth
                    square
                    style={{ height: 60 }}
                    icon={<img src="/assets/images/logos/blibli.png" alt="" />}
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

                <a className="d-block my-3 block" href={data.jdid}>
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

                <a className="d-block my-3 block" href={data.lazada}>
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

                <a className="d-block my-3 block" href={data.lazada}>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <style jsx>{`
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
    </Main>
  );
};

export default ProductDetail;
