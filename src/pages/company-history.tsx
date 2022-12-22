import Container from '@/components/Container';
import Main from '@/layouts/Main';

type ITimeLineItemProps = {
  year?: string;
  description: string;
  img: string;
};

const TimeLineItem = ({ year, description, img }: ITimeLineItemProps) => {
  return (
    <div className="timeline-item mb-12 grid grid-cols-12 gap-7 pl-4">
      <div className="circle"></div>
      <div className="col-span-7">
        {year && (
          <h3 className="mb-10 text-4xl font-black text-blue-400">{year}</h3>
        )}

        <p className="mb-3 text-xl">{description}</p>
      </div>
      <div className="col-span-5">
        <div className="thumbnail flex items-center justify-center">
          <img src={img} alt="" loading="lazy" className="block" />
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          position: relative;
        }

        h3 {
          line-height: 1;
        }

        .circle {
          width: 30px;
          height: 30px;
          background: #ffffff;
          border: 3px solid #071789;
          position: absolute;
          left: -45px;
          top: 0;
          border-radius: 90px;
        }

        .thumbnail {
          height: 300px;
          width: 100%;
          background: #eef3f6;
          border-radius: 20px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

const CompanyHistory = () => {
  const items = [
    {
      year: '1980-1990',
      img: 'histori-12.png',
      text: `Pada tahun 1980, WINGS Group meluncurkan SoKlin, deterjen plus brightener pertama yang tidak hanya membersihkan namun juga mampu mencerahkan warna`,
    },
    {
      year: '1990',
      img: 'histori-14.png',
      text: 'SoKlin Lantai pertama kali diluncurkan. Dengan mengusung tagline "SoKlin is The Best" dan inovasi 3 keunggulan, SoKlin Lantai berhasil menguasai pangsa pasar hingga saat ini.',
    },
    {
      year: '1998',
      img: 'histori-13.png',
      text: 'SoKlin 3in1 pertama kali diluncurkan dan berfokus pada 3 fungsi penting, membersihkan pakaian, menjaga hingga serat pakaian terdalam, serta menjaga warna pakaian tetap cerah.',
    },
    {
      img: 'histori-2.png',
      text: 'Softener SoKlin Reguler diluncurkan',
    },
    {
      year: '1999',
      img: 'histori-3.png',
      text: 'SoKlin Power diluncurkan sebagai deterjen yang efektif membersihkan pakaian dari segala jenis noda, mampu menjaga warna dan merawat serat pakaian',
    },
    {
      img: 'histori-15.png',
      text: 'Pewangi SoKlin Reguler diluncurkan',
    },
    {
      year: '2003',
      img: 'histori-19.png',
      text: 'SoKlin Smart, high concentrated detergent, pertama kali diluncurkan. Dengan memakai deterjen lebih sedikit,  namun mampu membersihkan secara menyeluruh.',
    },
    {
      year: '2005',
      img: 'histori-4.png',
      text: 'SoKlin meluncurkan SoKlin Higinis yang mengandung anti bacterial, dan mengusung konsep “Bersih Saja Tidak Cukup”',
    },
    {
      year: '2006',
      img: 'histori-5.png',
      text: 'Memasuki era di mana pemakaian mesin cuci semakin banyak, WINGS Group meluncurkan SoKlin Automatic. Disempurnakan dengan pengembangan formula yang lebih ramah lingkungan',
    },
    {
      year: '2007',
      img: 'histori-20.png',
      text: 'SoKlin meluncurkan varian terbaru yaitu SoKlin Softergent, memadukan fungsi deterjen dan pelembut + pewangi pakaian. Inovasi ini merupakan yang pertama di Indonesia yang menggabungkan deterjen + pelembut',
    },
    {
      year: '2009',
      img: 'histori-6.png',
      text: 'Softener SoKlin 1x Bilas Premium Concentrate Reguler pertama kali diluncurkan',
    },
    {
      year: '2010',
      img: 'histori-7.png',
      text: 'Softener SoKlin Fine pertama kali diluncurkan',
    },
    {
      year: '2011',
      img: 'histori-8.png',
      text: 'Softener SoKlin Fine pertama kali diluncurkan',
    },
    {
      year: '2012',
      img: 'histori-1.png',
      text: 'Softener SoKlin Fine pertama kali diluncurkan',
    },
    {
      year: '2017',
      img: 'histori-9.png',
      text: '4 varian Royale Parfum Series by SoKlin pertama kali diluncurkan',
    },
    {
      year: '2020',
      img: 'histori-10.png',
      text: 'SoKlin Pewangi Hijab Reguler pertama kali diluncurkan',
    },
    {
      year: '2021',
      img: 'histori-18.png',
      text: 'Di tengah pandemi Covid-19, WINGS Group meluncurkan SoKlin Antisep, detergent + protection yang terbukti ampuh membunuh 99,99% virus, kuman, dan bakteri di pakaian',
    },
    {
      img: 'histori-21.png',
      text: 'Royale by SoKlin Sunny Day & Sweet Floral pertama kali diluncurkan',
    },
    {
      year: '2022',
      img: 'histori-11.png',
      text: 'SoKlin Pewangi Active Sport pertama kali diluncurkan',
    },
  ];

  return (
    <Main footerProps={{ showBanner: false }}>
      <div className="hero py-30 pt-10 text-white">
        <Container>
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <h1 className="text-6xl font-black">History of SoKlin</h1>

              <p className="mt-5 text-3xl">
                Selama lebih dari 40 tahun, SoKlin, merek fabric care & home
                care produksi Wings Care, hadir sebagai solusi kebersihan
                pakaian dan rumah andalan keluarga. Sejak awal kemunculannya,
                SoKlin yang tak pernah berhenti berinovasi terus berkomitmen
                memberikan produk berkualitas terbaik dan terus berinovasi untuk
                keluarga Indonesia dari generasi ke generasi.
              </p>

              <p className="mt-5 text-3xl">Solusi Tepat untuk Keluarga</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="timeline">
          {items.map((item, i) => (
            <TimeLineItem
              key={`item-${i}`}
              year={item.year}
              img={`/assets/images/histori/${item.img}`}
              description={item.text}
            />
          ))}
        </div>
      </Container>

      <style jsx>{`
        .hero {
          width: 100%;
          height: 650px;
          background: #001fff url('/assets/images/cloud.jpg') no-repeat center
            right;
        }

        .timeline {
          padding-left: 30px;
          margin-left: 20px;
          border-left: 1px dashed #484848;
        }
      `}</style>
    </Main>
  );
};

export default CompanyHistory;
