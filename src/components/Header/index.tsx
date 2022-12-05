/* eslint-disable tailwindcss/no-custom-classname */

const Header = () => {
  return (
    <>
      <header>
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <a href="#">
                <img src="/assets/images/social.svg" alt="" />
              </a>
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
                <img src="/assets/images/lgo-wings-care-gede 1.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* logo */}
        <div className="middle"></div>

        <div
          className="items-center bg-blue-400 uppercase"
          style={{ height: 50 }}
        >
          <div className="container mx-auto max-w-7xl items-center">
            <nav
              className="menu flex items-center justify-around  text-white"
              style={{ height: 50 }}
            >
              <a className="d-block py-2 px-3 text-white" href="#">
                company
              </a>
              <a className="d-block py-2 px-3 text-white" href="#">
                products
              </a>
              <a className="d-block py-2 px-3 text-white" href="#">
                updates
              </a>
              <a className="d-block py-2 px-3 text-white" href="#">
                articles
              </a>
              <a className="d-block py-2 px-3 text-white" href="#">
                contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <style jsx>{`
        .middle {
          width: 100%;
          height: 100px;
          background: url('/assets/images/headerbg.png') no-repeat center center;
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
      `}</style>
    </>
  );
};

export default Header;
