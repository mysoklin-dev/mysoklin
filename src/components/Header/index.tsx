/* eslint-disable tailwindcss/no-custom-classname */
import { HiMenuAlt4 } from '@react-icons/all-files/hi/HiMenuAlt4';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [isShowMega, setShowMega] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<any>(null);
  const [socials, setSocial] = useState<any>([]);

  const showMegamenu = () => {
    setShowMega(true);
  };
  const hideMegaMenu = () => {
    setShowMega(false);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const record = await pb.collection('product_categories').getList(1, 6, {
        sort: '-created',
        expand: 'product_brands(product_category_id)',
      });

      setMenu(record?.items);
    };

    const getSocials = async () => {
      try {
        const resultList = await pb.collection('social_main').getList(1, 6, {
          sort: '+sequence',
        });
        setSocial(resultList.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error) console.log(error);
      }
    };

    getSocials();

    fetchMenu();
  }, []);

  const decideIcon = (platformType: string) => {
    let icon;
    if (platformType === 'Instagram') {
      icon = 'ig.svg';
    } else if (platformType === 'Facebook') {
      icon = 'fb.svg';
    } else if (platformType === 'Youtube') {
      icon = 'yt.svg';
    }
    return icon;
  };

  return (
    <>
      <header>
        <div className="container mx-auto hidden max-w-6xl py-2 md:block">
          <div className="flex items-center justify-between">
            <div>
              <div
                className="grow-1 mr-0 flex w-full shrink-0 gap-4"
                style={{ fontSize: 10 }}
              >
                {socials &&
                  socials.length > 0 &&
                  socials.map((social: any, i: number) => (
                    <React.Fragment key={`inactive-${social.id}-${i}`}>
                      {social.status !== false && (
                        <div className="flex items-center gap-3 text-blue-400">
                          <div>
                            <a
                              href={social.platform_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={`/assets/images/${decideIcon(
                                  social.platform_type
                                )}`}
                                alt={social.platform_name}
                                width={28}
                                height={28.56}
                                style={{ height: 'auto!important' }}
                              />
                            </a>
                          </div>
                          <div>
                            <a
                              style={{ fontSize: 14 }}
                              href={social.platform_url}
                              target="_BLANK"
                              rel="noreferrer"
                              className="text-blue-400"
                            >
                              {social.platform_name}
                            </a>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              {/* Search */}
              <div>
                <div className="search">
                  <input type="text" name="s" />
                </div>
              </div>

              {/* Register */}
              <div>
                <a href="#" className="text-blue-400">
                  Register
                </a>
              </div>

              <div>
                {socials &&
                  socials.length > 0 &&
                  socials.map((social: any, i: number) => (
                    <React.Fragment key={`inactive-${social.id}+${i}`}>
                      {social.status === false && (
                        <a
                          href={social.platform_url}
                          target="_BLANK"
                          rel="noreferrer"
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${social.collectionId}/${social.id}/${social?.platform_icon}`}
                            alt={social.platform_name}
                            width={120}
                            height={40}
                            style={{ height: 'auto!important' }}
                          />
                        </a>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* logo */}
        <div className="middle flex items-center justify-center">
          <Link href="/">
            <img src="/assets/images/logo.png" alt="My Soklin" />
          </Link>
        </div>

        <div
          className="items-center bg-blue-400 uppercase"
          style={{ height: 50 }}
        >
          <div className="container mx-auto hidden max-w-6xl items-center md:block">
            <nav
              className="menu flex items-center justify-between  text-white"
              style={{ height: 50 }}
            >
              <Link
                className="d-block py-2 px-3 text-white"
                href="/company-history"
              >
                company
              </Link>
              <Link
                onMouseEnter={showMegamenu}
                className="d-block py-2 px-3 text-white"
                href="/products"
              >
                products
              </Link>
              <Link className="d-block py-2 px-3 text-white" href="/updates">
                updates
              </Link>
              <Link className="d-block py-2 px-3 text-white" href="/articles">
                articles
              </Link>
              <Link className="d-block py-2 px-3 text-white" href="/contact">
                contact
              </Link>
            </nav>
          </div>

          {/* Mobile */}
          <div
            className="flex items-center px-4 md:hidden"
            style={{ height: 50 }}
          >
            <button
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
              className="border-0 bg-transparent"
            >
              <HiMenuAlt4 color="white" size={24} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {isShowMega && (
          <div className="megamenu" onMouseLeave={hideMegaMenu}>
            <div className="container mx-auto max-w-6xl">
              <div className="flex justify-between gap-4">
                {menu &&
                  menu.length > 0 &&
                  menu.map((item: any, i: number) => (
                    <div key={`asdfasdf-${item.id}-${i}`}>
                      <h4 className="text-md font-bold text-blue-400">
                        {item.title}
                      </h4>

                      <ul>
                        {item.expand &&
                          item.expand['product_brands(product_category_id)']
                            .length > 0 &&
                          item.expand[
                            'product_brands(product_category_id)'
                          ].map((submenu: any) => (
                            <li key={`submenu-${submenu.id}+${i}`}>
                              <Link
                                href={`/products/brand/${
                                  submenu.id
                                }/${submenu.title
                                  .replaceAll(' ', '-')
                                  .toLowerCase()}`}
                                className="hover:text-blue-400"
                              >
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`top-34 fixed left-0 z-50 h-full w-full bg-blue-300 py-10 uppercase text-white md:hidden ${
          mobileMenu ? 'block' : 'hidden'
        }`}
      >
        <div className="mb-5 px-8">
          <div
            className="block w-full overflow-hidden rounded-full bg-white px-8 text-black"
            style={{
              width: '100%!important',
              background:
                '#ffffff url(/assets/images/fa_search.svg) no-repeat 10px center',
            }}
          >
            <input type="text" name="s" className="block w-full py-2" />
          </div>
        </div>

        <Link className="block py-3 px-8 text-white" href="/company-history">
          company
        </Link>
        <Link
          onMouseEnter={showMegamenu}
          className="block py-3 px-8 text-white"
          href="/products"
        >
          products
        </Link>
        <Link className="block py-3 px-8 text-white" href="/updates">
          updates
        </Link>
        <Link className="block py-3 px-8 text-white" href="/articles">
          articles
        </Link>
        <Link className="block py-3 px-8 text-white" href="/contact">
          contact
        </Link>

        {socials &&
          socials.length > 0 &&
          socials.map((social: any, i: number) => (
            <React.Fragment key={`inactive-${social.id}-${i}`}>
              {social.status !== false && (
                <div className="flex gap-4 px-8 py-3 text-white">
                  <div>
                    <a
                      href={social.platform_url}
                      target="_blank"
                      className="text-white"
                      rel="noreferrer"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/files/${social.collectionId}/${social.id}/${social?.platform_icon}`}
                        alt={social.platform_name}
                        width={28}
                        height={28.56}
                        style={{
                          height: 'auto!important',
                          filter: 'brightness(10)',
                        }}
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      style={{ fontSize: 14 }}
                      href={social.platform_url}
                      target="_BLANK"
                      className="text-white"
                      rel="noreferrer"
                    >
                      {social.platform_name}
                    </a>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>

      <style jsx>{`
        header {
          position: relative;
        }
        .middle {
          width: 100%;
          height: 100px;
          background: url('/assets/images/wave.png') no-repeat center center;
        }

        .search {
          background: #ffffff url('/assets/images/fa_search.svg') no-repeat 10px
            center;
          border: 1px solid #071789;
          border-radius: 100px;
          width: 280px;
          height: 30px;
          padding-left: 40px;
          position: relative;
        }

        .search input {
          position: absolute;
          width: 100%;
          width: calc(100% - 30px);
          height: 100%;
          right: 0;
          top: 0;
          border: 0;
          background: transparent;
          outline: none;
          font-size: 12px;
        }

        .menu a {
          text-decoration: none;
        }

        .megamenu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: auto;
          background: #fff;
          padding: 20px 0;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
          z-index: 99999;
        }

        .megamenu h4 {
          margin-bottom: 10px;
          color: #0042e4 !important;
          font-size: 14px !important;
        }

        .megamenu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .megamenu ul li {
          margin: 10px 0 !important;
          display: block;
        }
      `}</style>
    </>
  );
};

export default Header;
