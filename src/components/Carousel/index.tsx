import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

const Carousel = () => {
  return (
    <ReactCarousel showThumbs={false}>
      <div>
        <img src="/assets/images/banner2-1 1.jpg" alt="test" />
      </div>
      <div>
        <img src="/assets/images/banner2-1 1.jpg" alt="test" />
      </div>
      <div>
        <img src="/assets/images/banner2-1 1.jpg" alt="test" />
      </div>
    </ReactCarousel>
  );
};

export default Carousel;
