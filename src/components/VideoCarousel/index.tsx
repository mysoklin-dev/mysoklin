import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import Link from 'next/link';
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import Button from '@/components/Button';

const VideoCarousel = () => {
  const videos = [
    {
      title: 'SoKlin Experiences Sakura Series',
      description:
        'Detergent dengan keharuman sakura pertama di Indonesia! So Klin Sakura membawa suasana musim semi dari Negara Jepang yang menyegarkan untuk Moms dan keluarga.',
      link: '#',
      video: 'w-ZI5Kye_AA',
    },
    {
      title: 'SoKlin Experiences Sakura Series',
      description:
        'Detergent dengan keharuman sakura pertama di Indonesia! So Klin Sakura membawa suasana musim semi dari Negara Jepang yang menyegarkan untuk Moms dan keluarga.',
      link: '#',
      video: 'w-ZI5Kye_AA',
    },
  ];

  return (
    <div className="videoCarousel px-20 pt-20 pb-10">
      <ReactCarousel showThumbs={false}>
        {videos.map((item, i) => (
          <div key={`video-${i}`} className="mx-auto max-w-6xl pb-20">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-5">
                <h3 className="mb-10">{item.title}</h3>

                <p className="mb-10">{item.description}</p>

                <Link href={item.link}>
                  <Button style={{ width: '170px', height: 40 }}>
                    {'Read More'}
                  </Button>
                </Link>
              </div>

              <div className="col-span-7">
                <LiteYouTubeEmbed id={item.video} title={item.title} />
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
