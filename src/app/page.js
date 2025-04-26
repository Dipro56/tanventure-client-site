import FeaturedDestinations from '@/components/featured-destinations/FeaturedDestinations';
import HeroSection from '@/components/hero-section/HeroSection';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedDestinations />
    </main>
  );
}
