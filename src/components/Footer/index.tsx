import Image from 'next/image';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import React, { useEffect, useState } from 'react';

export type IFooterProps = {
  showBanner?: boolean;
};

export default function Footer({ showBanner = true }: IFooterProps) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [socials, setSocial] = useState<any>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const getSocials = async () => {
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

    const getContact = async () => {
      try {
        const resultList = await pb.collection('contact_box').getList(1, 6, {
          filter: `status = true`,
          sort: '+sequence',
        });
        setContacts(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getSocials();
    getContact();
  }, []);

  return (
    <footer>
      {/* big fucking banner */}
      {showBanner && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="left col-span-1">
            <div className="mb-10 flex w-full flex-1 flex-row content-between">
              <div>
                <p className="text-5xl font-bold text-white">
                  History of <br /> SoKlin
                </p>
              </div>

              <div className="ml-auto">
                <Link href="/company-history">
                  <Image
                    src="/assets/images/right-arrow.svg"
                    width={70}
                    height={70}
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
              <Image
                src="/assets/images/HIS-SOK-04-2003-A.png"
                alt=""
                loading="lazy"
                width={416}
                height={297}
                className="inline-block"
              />
            </div>
          </div>

          <div className="right col-span-1">
            <div className="mb-10 flex w-full flex-1 flex-row content-between">
              <div>
                <p className="text-5xl font-bold text-blue-700">
                  Create account and
                  <br />
                  get limited
                  <br />
                  offer.
                </p>
              </div>

              <div className="ml-auto">
                <Link href="/register">
                  <Image
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
              <Image
                src="/assets/images/footer-products.png"
                alt=""
                loading="lazy"
                width={556}
                height={427}
                className="inline-block"
                style={{ height: 'auto!important' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Links */}

      <section className="container mx-auto max-w-6xl px-8 pb-16 pt-20 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-6">
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
                <Link href="/products">Powder Detergent</Link>
              </li>
              <li>
                <Link href="/products">Liquid Detergent</Link>
              </li>
              <li>
                <Link href="/products">Fabric Conditioner</Link>
              </li>
              <li>
                <Link href="/products">Ironing Aid</Link>
              </li>
              <li>
                <Link href="/products">Bleach</Link>
              </li>
              <li>
                <Link href="/products">Floor Cleaner</Link>
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
                <Link href="/updates">Products</Link>
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

            {contacts.map((contact) => (
              <div className="mt-4" key={`contact-${contact.id}`}>
                <strong>{contact.title}</strong>
                <p>
                  {contact.value_3 !== '' ? (
                    <a
                      href={`https://www.google.com/maps/place/${contact.value_3.replace(
                        ' ',
                        ''
                      )}`}
                      target="_BLANK"
                      rel="noreferrer"
                    >
                      {contact.sub_title}
                    </a>
                  ) : (
                    <>{contact.sub_title}</>
                  )}
                </p>
                <a href={`tel:${contact.value_1}`}>{contact.value_1}</a>
                <br />
                <a href={`tel:${contact.value_2}`}>{contact.value_2}</a>
                <br />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1">&copy; 2022 PT Sayap Mas Utama</div>

          <div className="col-span-2 text-right">
            <div className="grow-1 mr-0 mt-4 w-full shrink-0 justify-end gap-4 md:mt-0 md:flex">
              {socials &&
                socials.length > 0 &&
                socials.map((social: any) => (
                  <div
                    className="mt-2 flex items-center gap-3 md:mt-0"
                    key={`social-${social.id}`}
                  >
                    <div>
                      <a
                        href={social.platform_url}
                        target="_blank"
                        rel="noreferrer"
                      >
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
                      <a
                        style={{ color: '#888' }}
                        href={social.platform_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {social.platform_name}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* <pre>{JSON.stringify(contacts, null, 2)}</pre> */}

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
