import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
                src={withCdn({
                  w: 1440,
                  h: 720,
                  q: 100,
                  img: `${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.banner}`,
                })}
                alt={item.title}
              />
            </div>
          ))}
      </ReactCarousel>
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
