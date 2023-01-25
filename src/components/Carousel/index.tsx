import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import useSWR from 'swr';

const Carousel = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PB_URL}/api/collections/hero_banner/records?page=1&perPage=3&sort=+sequence`
  );

  const loading = !data && !error;
  const posts = data && data.items;

  return (
    <ReactCarousel showThumbs={false} autoPlay swipeable>
      {!loading &&
        posts &&
        posts.length > 0 &&
        posts.map((item: any) => (
          <div key={`slide-${item.id}`}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.collectionId}/${item.id}/${item?.banner}`}
              alt={item.title}
            />
          </div>
        ))}
    </ReactCarousel>
  );
};

export default Carousel;
