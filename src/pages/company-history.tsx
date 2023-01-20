import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import Main from '@/layouts/Main';

type ITimeLineItemProps = {
  year?: string;
  description: string;
  img: string;
  parentId?: string | undefined;
};

const TimeLineItem = ({
  year,
  description,
  img,
  parentId,
}: ITimeLineItemProps) => {
  return (
    <div className="timeline-item mb-12 grid grid-cols-12 gap-7 pl-4">
      <div className="circle"></div>
      <div className="col-span-7">
        {year && year !== '' && parentId === '' && (
          <h3 className="mb-10 text-4xl font-black text-blue-400">{year}</h3>
        )}

        <p className="mb-3 text-xl">{description}</p>
      </div>
      <div className="col-span-5">
        <div className="thumbnail flex items-center justify-center">
          <img
            src={img}
            alt=""
            loading="lazy"
            className="block"
            height="256"
            width="256"
          />
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

        .thumbnail img {
          max-height: 256px;
          width: auto;
        }
      `}</style>
    </div>
  );
};

const CompanyHistory = () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const result = await pb.collection('company_history').getList(1, 50, {
          sort: '+sequence',
        });
        setRows(result.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    getHistory();
  }, []);

  return (
    <Main footerProps={{ showBanner: false }}>
      {/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
      <div className="hero py-30 pt-10 text-white">
        <Container>
          <div className="grid grid-cols-3">
            {rows && rows.length > 0 ? (
              <div className="col-span-2">
                <h1 className="text-6xl font-black">{rows[0].title}</h1>

                <div
                  className="mt-5 text-3xl"
                  dangerouslySetInnerHTML={{ __html: rows[0].sub_title }}
                ></div>
              </div>
            ) : (
              <div className="col-span-2">
                <h1 className="text-6xl font-black">History of SoKlin</h1>

                <p className="mt-5 text-3xl">
                  Selama lebih dari 40 tahun, SoKlin, merek fabric care & home
                  care produksi Wings Care, hadir sebagai solusi kebersihan
                  pakaian dan rumah andalan keluarga. Sejak awal kemunculannya,
                  SoKlin yang tak pernah berhenti berinovasi terus berkomitmen
                  memberikan produk berkualitas terbaik dan terus berinovasi
                  untuk keluarga Indonesia dari generasi ke generasi.
                </p>

                <p className="mt-5 text-3xl">Solusi Tepat untuk Keluarga</p>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="timeline">
          {rows.map((item, i: number) => (
            <>
              {i !== 0 && (
                <TimeLineItem
                  key={`item-${i}`}
                  year={item.title}
                  img={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.image}`}
                  description={item.sub_title}
                  parentId={item.parent_id}
                />
              )}
            </>
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

        p,
        div {
          white-space: pre-wrap;
        }
      `}</style>
    </Main>
  );
};

export default CompanyHistory;
