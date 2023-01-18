import Link from 'next/link';
import PocketBase from 'pocketbase';
import React, { useEffect, useState } from 'react';

export type IFooterProps = {
  showBanner?: boolean;
};

export default function Footer({ showBanner = true }: IFooterProps) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [socials, setSocial] = useState<any>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resultList = await pb.collection('social_main').getList(1, 6, {
          filter: `status = true`,
          sort: '+sequence',
        });
        setSocial(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <footer>
      {/* big fucking banner */}
      {showBanner && (
        <div className="grid grid-cols-2">
          <div className="left col-span-1">
            <div className="mb-10 flex w-full flex-1 flex-row content-between">
              <div>
                <h1 className="text-5xl font-bold text-white">
                  History of <br /> SoKlin
                </h1>
              </div>

              <div className="ml-auto">
                <Link href="/company-history">
                  <img
                    src="/assets/images/right-arrow.svg"
                    width="70"
                    height="70"
                    loading="lazy"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="mb-10 text-2xl text-white">
              <p>
                Selama lebih dari 40 tahun, SoKlin, merek fabric care & home
                care produksi Wings Care, hadir sebagai solusi kebersihan
                pakaian dan rumah andalan keluarga.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/assets/images/HIS-SOK-04-2003-A.png"
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          <div className="right col-span-1">
            <div className="mb-10 flex w-full flex-1 flex-row content-between">
              <div>
                <h1 className="text-5xl font-bold text-blue-700">
                  Create account and
                  <br />
                  get limited
                  <br />
                  offer.
                </h1>
              </div>

              <div className="ml-auto">
                <Link href="#">
                  <img
                    src="/assets/images/right-arrow.svg"
                    width="70"
                    height="70"
                    loading="lazy"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="text-center">
              <img
                src="/assets/images/footer-products.png"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Links */}

      <section className="container mx-auto max-w-6xl pt-20 pb-16">
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <h4 className="font-bold">Company</h4>

            <ul>
              <li>
                <Link href="/company-history">History</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Products</h4>

            <ul>
              <li>
                <Link href="#">Powder Detergent</Link>
              </li>
              <li>
                <Link href="#">Liquid Detergent</Link>
              </li>
              <li>
                <Link href="#">Fabric Conditioner</Link>
              </li>
              <li>
                <Link href="#">Ironing Aid</Link>
              </li>
              <li>
                <Link href="#">Bleach</Link>
              </li>
              <li>
                <Link href="#">Floor Cleaner</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Updates</h4>

            <ul>
              <li>
                <Link href="/updates">Events</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/updates">Promotions</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Articles</h4>

            <ul>
              <li>
                <Link href="/articles"> Tips</Link>
              </li>
              <li>
                <Link href="/articles">Tricks</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-bold">Contact</h4>

            <p className="mt-4">
              <strong>Head Office</strong>
              <p>PT Sayap Mas Utama</p>
              <p>
                <a
                  href="https://goo.gl/maps/g3PMDKNxyfAynHR47"
                  target="_BLANK"
                  rel="noreferrer"
                >
                  Jl. Tipar cakung Kav. F 5-7 East Jakarta 13910 Indonesia
                </a>
              </p>
              <a href="tel:62214602696">+62-21-4602696</a>
              <br />
              <a href="tel:62214602698">+62-21-4602698</a>
              <br />
            </p>

            <p className="mt-4">
              <strong>Consumer Voice</strong> <br />
              Toll Free Phone Call Service <br />
              <a href="tel:628001818818">0800-1818818</a> <br />
              <a href="tel:62315325005">+62-31-5325005</a> <br />
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 grid grid-cols-3">
          <div className="col-span-1">&copy; 2022 PT Sayap Mas Utama</div>

          <div className="col-span-2 text-right">
            <div className="grow-1 mr-0 flex w-full shrink-0 justify-end gap-4">
              {socials &&
                socials.length > 0 &&
                socials.map((social: any) => (
                  <div className="flex gap-3" key={`social-${social.id}`}>
                    <div>
                      <a href={social.platform_url}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${social.collectionId}/${social.id}/${social?.platform_icon}`}
                          alt={social.platform_name}
                          width={
                            social.platform_name !==
                            'Wings Group Official Website'
                              ? 30
                              : 80
                          }
                          height={30}
                          style={{ height: 'auto!important' }}
                        />
                      </a>
                    </div>
                    <div>
                      <a href={social.platform_url}>{social.platform_name}</a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        footer {
          color: #888888;
        }

        h4 {
          font-size: 14px;
          color: #484848;
          margin-bottom: 15px;
        }

        ul li {
          margin-bottom: 12px !important;
        }

        .left {
          padding: 40px;
          background: linear-gradient(
            130.91deg,
            #172866 0%,
            #2f4aa8 45.31%,
            #14255f 96.88%
          );
        }

        .right {
          padding: 40px;
          background: linear-gradient(
            130.91deg,
            #04a2ff 0%,
            #94d7ff 45.31%,
            #02a1ff 96.88%
          );
        }

        img {
          display: inline-block;
        }
      `}</style>
    </footer>
  );
}
