// components/HeroSection.tsx
'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


// Create a separate component that uses useSearchParams
function HeroSectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') || '');
  const debouncedQuery = useDebounce(query, 600);

  // Update path when debounced query changes
  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      current.set('search', debouncedQuery);
    } else {
      current.delete('search');
    }
    router.push(`?${current.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  return (
    <section className="hero-section relative">
      <div className="hero-overlay w-full h-full absolute inset-0"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          {/* Search Bar */}
          <div className="bg-white text-gray p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full text-black pl-5 pr-4 py-3 border-none rounded focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                onClick={() => router.push(`?search=${query}`)}
                className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// debounce helper
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

// Loading component for Suspense fallback
function HeroSectionLoading() {
  return (
    <section className="hero-section relative">
      <div className="hero-overlay w-full h-full absolute inset-0"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          
          {/* Loading state for search bar */}
          <div className="bg-white text-gray p-4 rounded-lg shadow-lg animate-pulse">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main export with Suspense
export default function HeroSection() {
  return (
    <Suspense fallback={<HeroSectionLoading />}>
      <HeroSectionContent />
    </Suspense>
  );
}