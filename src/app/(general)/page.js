// app/page.js
'use client';
import { Suspense } from 'react';
import FeaturedDestinations from '@/components/featured-destinations/FeaturedDestinations';
import HeroSection from '@/components/hero-section/HeroSection';
import ReviewRecommendation from '@/components/review-recommendation/ReviewRecommendation';
import TravelInspirationSection from '@/components/travel-inspiration-section/TravelInspirationSection';
import AboutUs from '@/components/utils/about-us/AboutUs';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Create a separate component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');

  const packagesRef = useRef();
  const reviewsRef = useRef();
  const aboutRef = useRef();
  const blogRef = useRef();

  useEffect(() => {
    if (!scrollTo) return;

    let element = null;

    switch (scrollTo) {
      case 'packages':
        element = packagesRef.current;
        break;
      case 'reviews':
        element = reviewsRef.current;
        break;
      case 'about':
        element = aboutRef.current;
        break;
      case 'blog':
        element = blogRef.current;
        break;
      default:
        break;
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTo]);

  return (
    <main>
      <HeroSection />
      <div ref={packagesRef}>
        <FeaturedDestinations />
      </div>
      <div ref={aboutRef}>
        <AboutUs />
      </div>
      <div ref={reviewsRef}>
        <ReviewRecommendation />
      </div>
      <div ref={blogRef}>
        <TravelInspirationSection />
      </div>
    </main>
  );
}

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Main export with Suspense
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
