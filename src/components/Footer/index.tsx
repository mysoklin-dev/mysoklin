import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer>
      {/* big fucking banner */}
      <div className="grid grid-cols-2">
        <div className="left col-span-1">
          <div className="mb-10 flex w-full flex-1 flex-row content-between">
            <div>
              <h1 className="text-5xl font-bold text-white">
                History of <br /> SoKlin
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

          <div className="mb-10 text-2xl text-white">
            <p>
              Selama lebih dari 40 tahun, SoKlin, merek fabric care & home care
              produksi Wings Care, hadir sebagai solusi kebersihan pakaian dan
              rumah andalan keluarga.
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

      {/* Footer Links */}

      <section className="container mx-auto max-w-6xl pt-20 pb-16">
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <h4 className="font-bold">Company</h4>

            <ul>
              <li>
                <Link href="#">History</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Company</h4>

            <ul>
              <li>
                <Link href="#">Detergent</Link>
              </li>
              <li>
                <Link href="#">Conditioner</Link>
              </li>
              <li>
                <Link href="#">Ironing Aid</Link>
              </li>
              <li>
                <Link href="#">Bleach</Link>
              </li>
              <li>
                <Link href="#">Floor</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Updates</h4>

            <ul>
              <li>
                <Link href="#">Events</Link>
              </li>
              <li>
                <Link href="#">Products</Link>
              </li>
              <li>
                <Link href="#">Promotions</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold">Articles</h4>

            <ul>
              <li>
                <Link href="#"> Tips</Link>
              </li>
              <li>
                <Link href="#">Tricks</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-bold">Contact</h4>

            <p>PT Sayap Mas Utama</p>
            <p>Jl. Tipar cakung Kav. F 5-7 East Jakarta 13910 Indonesia</p>

            <p className="mt-4">
              <strong>Head Office</strong>
              <br />
              +62-21-4602696
              <br />
              +62-21-4602698
              <br />
              <a href="mailto:hrd@wingscorp.com">hrd@wingscorp.com</a>
            </p>

            <p className="mt-4">
              <strong>Consumer Voice</strong> <br />
              0800-1818818 <br />
              +62-31-5325005 <br />
              (Toll Free Phone Call Service)
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 grid grid-cols-2">
          <div className="col-span-1">&copy; 2022 PT Sayap Mas Utama</div>

          <div className="col-span-1 text-right">
            <div className="grow-1 mr-0 flex w-full shrink-0 justify-end gap-4">
              <div className="flex gap-3">
                <img src="/assets/images/ig.svg" alt="" />
                SoKlinDetergent
              </div>

              <div className="flex gap-3">
                <img src="/assets/images/fb.svg" alt="" />
                SoKlinDetergent
              </div>

              <div className="flex gap-3">
                <img src="/assets/images/yt.svg" alt="" />
                SoKlinDetergent
              </div>
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
