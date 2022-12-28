import ArticleCard from '@/components/ArticleCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import Main from '@/layouts/Main';

const Articles = () => {
  return (
    <Main>
      <img
        src="/assets/images/articles.jpg"
        alt=""
        style={{ zIndex: '-1', position: 'relative' }}
      />

      <Container className="px-5">
        <div className="-mt-32 rounded-md border-2 border-gray-200 bg-white p-20 text-center">
          <h1 className="text-2xl font-black text-blue-400">
            Tahukah Moms dengan Arti Simbol di Label Pakaian?
          </h1>

          <div className="mt-10">
            <p className="mb-10 font-sans text-xl">
              Detergent dengan keharuman sakura pertama di Indonesia! So Klin
              Sakura membawa suasana musim semi dari Negara Jepang yang
              menyegarkan untuk Moms dan keluarga.
            </p>

            <div className="flex justify-center">
              <Button variant="elevated">Read</Button>
            </div>
          </div>
        </div>

        {/* Blog */}
        <div className="mt-20 grid grid-cols-3 gap-10">
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Melindungi Pakaian Dari Bau Apek"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/tips-and-trick.jpg"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center pb-20">
          <Pagination />
        </div>
      </Container>
    </Main>
  );
};

export default Articles;
