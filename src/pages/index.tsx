import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LatestUpdates from '@/components/LatestUpdates';
import ProductsCarousel from '@/components/ProductsCarousel';
import TipsAndTricks from '@/components/TipsAndTricks';
import VideoCarousel from '@/components/VideoCarousel';

const Index = () => {
  return (
    <>
      <Header />

      <Carousel />

      <VideoCarousel />

      <ProductsCarousel />

      <LatestUpdates />

      <TipsAndTricks />

      <Footer />
    </>
  );
};

export default Index;
