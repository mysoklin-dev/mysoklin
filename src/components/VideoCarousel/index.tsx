import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import Link from 'next/link';
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import useSWR from 'swr';

import Button from '@/components/Button';

const VideoCarousel = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/hero_video/records?page=1&perPage=3&sort=+sequence&filter=status%20%3D%20true`
  );

  const loading = !data && !error;
  const rows = data && data.items;

  return (
    <div className="videoCarousel px-20 pt-20 pb-10">
      <ReactCarousel showThumbs={false} autoPlay swipeable>
        {!loading &&
          rows &&
          rows.length > 0 &&
          rows.map((item: any, i: number) => (
            <div key={`video-${i}`} className="mx-auto max-w-6xl px-10 pb-20">
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-5">
                  <h3 className="mb-10">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.title.substring(0, 50),
                      }}
                    ></span>
                    {item.title.length > 50 ? '...' : ''}
                  </h3>

                  <p className="mb-10">{item.sub_title}</p>

                  <Link href={item.destination_url}>
                    <Button style={{ width: '170px', height: 40 }}>
                      {'Show More'}
                    </Button>
                  </Link>
                </div>

                <div className="col-span-7">
                  <LiteYouTubeEmbed id={item.video_url} title={item.title} />
                </div>
              </div>
            </div>
          ))}
      </ReactCarousel>

      <style jsx>{`
        .videoCarousel {
          background: linear-gradient(
            130.91deg,
            #172866 0%,
            #2f4aa8 45.31%,
            #14255f 96.88%
          );
          text-align: left !important;
        }

        h3 {
          font-style: normal;
          font-weight: 700;
          font-size: 45px;
          line-height: 52px;

          color: #ffffff;
        }

        p {
          color: #fff;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 150%;
        }
      `}</style>
    </div>
  );
};

export default VideoCarousel;
