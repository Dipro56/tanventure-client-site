// app/page.js
'use client';
import { Suspense, useState, useEffect } from 'react';
import FeaturedDestinations from '@/components/featured-destinations/FeaturedDestinations';
import HeroSection from '@/components/hero-section/HeroSection';
import ReviewRecommendation from '@/components/review-recommendation/ReviewRecommendation';
import TravelInspirationSection from '@/components/travel-inspiration-section/TravelInspirationSection';
import AboutUs from '@/components/utils/about-us/AboutUs';
import { useSearchParams } from 'next/navigation';
import ContactReviewSection from '@/components/section/ContactReviewSection';

// Create a separate component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');

  useEffect(() => {
    if (!scrollTo) return;

    const scrollToSection = () => {
      const element = document.getElementById(scrollTo);
      if (element) {
        // Calculate position with offset for header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // setHasScrolled(true);
      }
    };

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(scrollToSection, 300);

    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <main>
      <HeroSection />
      <div id="packages">
        <FeaturedDestinations />
      </div>
      <div>
        <ContactReviewSection />
      </div>
      {/* <div id="about">
        <AboutUs />
      </div> */}
      <div id="reviews">
        <ReviewRecommendation />
      </div>
      <div id="blog">
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
