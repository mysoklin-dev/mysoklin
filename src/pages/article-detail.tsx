import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';

import Container from '@/components/Container';

const ArticleDetail = () => {
  return (
    <>
      <Container className="py-20">
        <article className="grid grid-cols-3">
          <div className="col-span-2">
            <header className="mb-5">
              <div className="mb-2 font-serif text-lg text-gray-700">
                02 Jan 2022
              </div>

              <h1 className="text-4xl font-black text-blue-400">
                Natural Essential Oil Lavender
              </h1>
            </header>

            <figure>
              <img src="/assets/images/article-thumb.jpg" alt="" />
            </figure>

            <div className="my-10">
              <p>
                Menjelang Lebaran nanti, salah satu kebiasaan masyarakat
                Indonesia adalah membeli baju baru. Padahal, Idul Fitri tidak
                mengharuskan kita untuk memakai yang serba baru, namun
                gunakanlah pakaian terbaik. Kita tetap bisa memakai pakaian lama
                yang terawat dengan baik. Agar kita tidak terjebak dalam sifat
                boros, ada baiknya jika kita mulai belajar merawat pakaian agar
                tetap terjaga dengan baik ketimbang membeli baju baru. Lalu
                bagaimana cara untuk memelihara pakaian agar tetap menjadi yang
                terbaik untuk Idul Fitri?
              </p>
              <p>
                1. Simpan di tempat yang baik. Untuk menghindari jamur, debu,
                kotoran, dan ngengat, sebaiknya simpan pakaian dalam kotak
                penyimpanan di tempat yang sejuk.
              </p>
              <p>
                2. Gunakan pengharum pakaian. Agar pakaian tetap berbau segar,
                taruhlah pengharum di dalam kotak penyimpanan.
              </p>
              <p>
                3. Cek petunjuk perawatan. Di bagian dalam pakaian biasanya ada
                petunjuk untuk mencuci atau menyetrikanya. Selalu ikuti aturan
                untuk menjaga kualitas pakaian.
              </p>
              <p>
                4. Pisahkan pakaian yang berbeda warna. Ketika mencuci,
                pisahkanlah pakaian putih dan berwarna agar tidak luntur serta
                menjaga warna baju tetap awet.
              </p>
              <p>
                5. Perhatikan jenis kain. Setiap kain memiliki perawatan yang
                berbeda. Pakaian dari katun dengan pakaian dari sutra tentu
                berbeda pemeliharaannya. Cari tahu bagaimana merawat pakaian
                sesuai dengan jenis kainnya.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {/* Widget */}
            <div className="widget">
              <div className="widget-header font-bold text-blue-400">Share</div>
              <div className="widget-content">
                <div className="flex gap-4 text-blue-400">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaFacebookF fontSize={20} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaInstagram fontSize={20} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaLink fontSize={20} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaTwitter fontSize={20} />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-400 text-center">
                    <FaWhatsapp fontSize={20} />
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
                <div className="flex items-center border-b border-gray-300">
                  <div>
                    <img
                      src="/assets/images/article-widget.jpg"
                      loading="lazy"
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>

                  <div className="pl-5">
                    Tricks for washing your knitted fabrics
                  </div>
                </div>

                {/* item */}
                <div className="flex items-center border-b border-gray-300">
                  <div>
                    <img
                      src="/assets/images/article-widget.jpg"
                      loading="lazy"
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>

                  <div className="pl-5">
                    Tricks for washing your knitted fabrics
                  </div>
                </div>

                {/* item */}
                <div className="flex items-center border-b border-gray-300">
                  <div>
                    <img
                      src="/assets/images/article-widget.jpg"
                      loading="lazy"
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>

                  <div className="pl-5">
                    Tricks for washing your knitted fabrics
                  </div>
                </div>

                {/* item */}
                <div className="flex items-center border-b border-gray-300">
                  <div>
                    <img
                      src="/assets/images/article-widget.jpg"
                      loading="lazy"
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>

                  <div className="pl-5">
                    Tricks for washing your knitted fabrics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>

      <style jsx>{`
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
