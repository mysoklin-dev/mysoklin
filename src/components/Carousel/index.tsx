import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import useSWR from 'swr';

const Carousel = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/hero_banner/records?page=1&perPage=3&sort=+sequence&filter=status%20%3D%20true`
  );

  const loading = !data && !error;
  const posts = data && data.items;

  return (
    <>
      <ReactCarousel showThumbs={false} autoPlay swipeable infiniteLoop>
        {!loading &&
          posts &&
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
