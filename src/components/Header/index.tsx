/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const Header = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [isShowMega, setShowMega] = useState<boolean>(false);
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

  return (
    <>
      <header>
        <div className="container mx-auto max-w-6xl py-2">
          <div className="flex items-center justify-between">
            <div>
              <div
                className="grow-1 mr-0 flex w-full shrink-0 gap-4"
                style={{ fontSize: 10 }}
              >
                {socials &&
                  socials.length > 0 &&
                  socials.map((social: any) => (
                    <>
                      {social.status !== false && (
                        <div
                          className="flex items-center gap-3"
                          key={`social-${social.id}`}
                        >
                          <div>
                            <a href={social.platform_url}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${social.collectionId}/${social.id}/${social?.platform_icon}`}
                                alt={social.platform_name}
                                width={
                                  social.platform_name !==
                                  'Wings Group Official Website'
                                    ? 20
                                    : 80
                                }
                                height={20}
                                style={{ height: 'auto!important' }}
                              />
                            </a>
                          </div>
                          <div>
                            <a
                              style={{ color: '#071789' }}
                              href={social.platform_url}
                              target="_BLANK"
                              rel="noreferrer"
                            >
                              {social.platform_name}
                            </a>
                          </div>
                        </div>
                      )}
                    </>
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
                  <strong>Register</strong>
                </a>
              </div>

              <div>
                {socials &&
                  socials.length > 0 &&
                  socials.map((social: any) => (
                    <>
                      {social.status === false && (
                        <a
                          href={social.platform_url}
                          key={`inactive-${social.id}`}
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
                    </>
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
          <div className="container mx-auto max-w-6xl items-center">
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
        </div>

        {/* Mega menu */}
        {isShowMega && (
          <div className="megamenu" onMouseLeave={hideMegaMenu}>
            <div className="container mx-auto max-w-6xl">
              <div className="flex justify-between gap-4">
                {menu &&
                  menu.length > 0 &&
                  menu.map((item: any) => (
                    <div key={`menu-${item.id}`}>
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
                            <li key={`submenu-${submenu.id}`}>
                              <Link
                                href={`/products/brand/${submenu.id}`}
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
