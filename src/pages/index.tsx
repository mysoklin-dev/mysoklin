import Carousel from '@/components/Carousel';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import TipsAndTricks from '@/components/TipsAndTricks';
import VideoCarousel from '@/components/VideoCarousel';
import Main from '@/layouts/Main';

const Index = () => {
  return (
    <Main>
      <Carousel />

      <VideoCarousel />

      <ProductsCarousel />

      <LatestUpdates />

      <TipsAndTricks />
    </Main>
  );
};

export default Index;
