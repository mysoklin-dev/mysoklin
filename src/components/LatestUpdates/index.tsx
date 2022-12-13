import ArticleCard from '../ArticleCard';
import Button from '../Button';

const LatestUpdates = () => {
  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h2 className="text-blue-700">Find the right SoKlin Products</h2>
          </div>
          <div className="col-span-1">
            <div className="mr-0 ml-auto text-right">
              <Button variant="outlined" style={{ width: '170px', height: 40 }}>
                {'Read More'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-20 max-w-6xl">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <ArticleCard
              title="Kahitna Britama Presents Tabungan BRI"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/blog-thumb.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Kahitna Britama Presents Tabungan BRI"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/blog-thumb.jpg"
            />
          </div>
          <div className="col-span-1">
            <ArticleCard
              title="Kahitna Britama Presents Tabungan BRI"
              text="Agar kita tidak terjebak dalam sifat boros, ada baiknya jika kita mulai belajar merawat pakaian agar tetap terjaga dengan baik ketimbang membeli"
              link="#"
              thumbnail="/assets/images/blog-thumb.jpg"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        h2 {
          font-weight: 700;
          font-size: 30px;
        }
      `}</style>
    </section>
  );
};

export default LatestUpdates;
