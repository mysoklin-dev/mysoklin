/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isShowMega, setShowMega] = useState<boolean>(false);

  const showMegamenu = () => {
    setShowMega(true);
  };
  const hideMegaMenu = () => {
    setShowMega(false);
  };

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
                <div className="flex items-center gap-3">
                  <img src="/assets/images/ig.svg" alt="" />
                  <div>
                    <a href="https://www.instagram.com/soklindetergent/">
                      SoKlinDetergent
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/assets/images/fb.svg" alt="" />
                  <div>
                    <a href="https://www.facebook.com/SoKlinDetergent/">
                      SoKlinDetergent
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/assets/images/yt.svg" alt="" />
                  <div>
                    <a href="https://www.youtube.com/channel/UC70wBrqBB3diQ6YaVO309YA">
                      SoKlinDetergent
                    </a>
                  </div>
                </div>
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
                <a href="#">
                  <strong>Register</strong>
                </a>
              </div>

              <div>
                <a href="https://wingscorp.com/">
                  <img src="/assets/images/lgo-wings-care-gede 1.png" alt="" />
                </a>
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
              <div className="flex flex-wrap justify-between gap-20">
                <div>
                  <h4 className="text-md font-bold text-blue-400">
                    Powder Detergent
                  </h4>
                  <ul>
                    <li>SoKlin Smart</li>
                    <li>SoKlin Softergent</li>
                    <li>SoKlin Antisep</li>
                    <li>SoKlin Biomatic Powder</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-bold text-blue-400">
                    Powder Detergent
                  </h4>
                  <ul>
                    <li>SoKlin Smart</li>
                    <li>SoKlin Softergent</li>
                    <li>SoKlin Antisep</li>
                    <li>SoKlin Biomatic Powder</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-bold text-blue-400">
                    Powder Detergent
                  </h4>
                  <ul>
                    <li>SoKlin Smart</li>
                    <li>SoKlin Softergent</li>
                    <li>SoKlin Antisep</li>
                    <li>SoKlin Biomatic Powder</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-bold text-blue-400">
                    Powder Detergent
                  </h4>
                  <ul>
                    <li>SoKlin Smart</li>
                    <li>SoKlin Softergent</li>
                    <li>SoKlin Antisep</li>
                    <li>SoKlin Biomatic Powder</li>
                  </ul>
                </div>
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
