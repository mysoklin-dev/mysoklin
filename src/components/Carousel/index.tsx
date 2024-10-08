import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import Image from 'next/image';
import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import { withCdn } from '@/helpers';

type ICarouselProps = {
  data: any;
};
const Carousel = ({ data }: ICarouselProps) => {
  const posts = data;

  return (
    <>
      <div className="hidden md:block">
        <ReactCarousel showThumbs={false} autoPlay swipeable infiniteLoop>
          {posts &&
            posts.length > 0 &&
            posts.map((item: any) => (
              <div key={`slide-${item.id}`} className="position-relative">
                <a
                  href={item.destination_url}
                  target={item.tab === 'new' ? '_blank' : '_self'}
                  rel="noreferrer"
                >
                  {' '}
                </a>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.banner}`}
                  alt={item.title}
                  width={1440}
                  height={720}
                  loading="eager"
                  style={{ width: '100%', height: 'auto' }}
                />
                {/* <Image
                  src={withCdn({
                    w: 1440,
                    h: 720,
                    q: 100,
                    img: `${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.banner}`,
                  })}
                  alt={item.title}
                  width={1440}
                  height={720}
                  loading="eager"
                  style={{ width: '100%', height: 'auto' }}
                /> */}
              </div>
            ))}
        </ReactCarousel>
      </div>

      <div className="md:hidden">
        <ReactCarousel showThumbs={false} autoPlay swipeable infiniteLoop>
          {posts &&
            posts.length > 0 &&
            posts.map((item: any) => (
              <div key={`m-slide-${item.id}`} className="position-relative">
                <a
                  href={item.destination_url}
                  target={item.tab === 'new' ? '_blank' : '_self'}
                  rel="noreferrer"
                >
                  {' '}
                </a>
                <Image
                  src={withCdn({
                    w: 414,
                    h: 220,
                    q: 70,
                    img: `${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.banner}`,
                  })}
                  alt={item.title}
                  width={414}
                  height={220}
                  loading="eager"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
        </ReactCarousel>
      </div>
      <style jsx>{`
        a {
          position: absolute;
          z-index: 100;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Carousel;
