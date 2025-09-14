// components/HeroSection.tsx
'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import bannerServices from '@/service/bannerService';

// Create a separate component that uses useSearchParams
function HeroSectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [bannerImage, setBannerImage] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const debouncedQuery = useDebounce(query, 600);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedBanner, setFetchedBanner] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const fetchBanner = async () => {
    try {
      setIsLoading(true);
      const result = await bannerServices.getBannerDetails();
      console.log('Fetched Banner:', result);

      if (result?.statusCode === 200) {
        const bannerData = result.data.bannerDetails;
        setFetchedBanner({
          title: bannerData.bannerTitle || '',
          description: bannerData.bannerDescription || '',
          imageUrl: bannerData.bannerImage || '',
        });
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch banner image from API
  useEffect(() => {
    fetchBanner();
  }, []);

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
    <section
      className="hero-section relative min-h-[500px] md:min-h-[600px] flex items-center"
      style={{
        backgroundImage: `url(${fetchedBanner?.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay with gradient for better text readability */}
      <div className="absolute hero-overlay inset-0 bg-black bg-opacity-40"></div>

      {/* Loading spinner for image */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-28 py-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {fetchedBanner?.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {fetchedBanner?.description}
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
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
    <section className="hero-section relative min-h-[500px] md:min-h-[600px] flex items-center bg-gray-200">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="container mx-auto px-6 lg:px-28 py-12 relative z-10">
        <div className="max-w-3xl">
          {/* Title Skeleton */}
          <div className="h-12 bg-gray-300 rounded-lg animate-pulse mb-6 w-3/4"></div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-5 bg-gray-300 rounded-lg animate-pulse w-full"></div>
            <div className="h-5 bg-gray-300 rounded-lg animate-pulse w-5/6"></div>
            <div className="h-5 bg-gray-300 rounded-lg animate-pulse w-4/6"></div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input Skeleton */}
              <div className="flex-1">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Search Button Skeleton */}
              <div className="w-28">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
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

// // components/HeroSection.tsx
// 'use client';
// import React, { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// // Create a separate component that uses useSearchParams
// function HeroSectionContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [query, setQuery] = useState(searchParams.get('search') || '');
//   const debouncedQuery = useDebounce(query, 600);

//   // Update path when debounced query changes
//   useEffect(() => {
//     const current = new URLSearchParams(searchParams.toString());
//     if (debouncedQuery) {
//       current.set('search', debouncedQuery);
//     } else {
//       current.delete('search');
//     }
//     router.push(`?${current.toString()}`);
//   }, [debouncedQuery, router, searchParams]);

//   return (
//     <section className="hero-section relative">
//       <div className="hero-overlay w-full h-full absolute inset-0"></div>
//       <div className="container mx-auto px-6  lg:px-28  py-24 relative z-10 ">
//         <div className="max-w-3xl">
//           <h1 className="text-5xl font-bold text-white mb-6">
//             Discover Your Next Adventure
//           </h1>
//           <p className="text-xl text-gray-200 mb-8">
//             Explore breathtaking destinations and create unforgettable memories
//             with our curated travel experiences.
//           </p>

//           {/* Search Bar */}
//           <div className="bg-white text-gray p-4 rounded-lg shadow-lg">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Where are you going?"
//                   className="w-full text-black pl-5 pr-4 py-3 border-none rounded focus:ring-2 focus:ring-primary focus:outline-none"
//                 />
//               </div>

//               <button
//                 onClick={() => router.push(`?search=${query}`)}
//                 className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // debounce helper
// function useDebounce(value, delay = 500) {
//   const [debounced, setDebounced] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debounced;
// }

// // Loading component for Suspense fallback
// function HeroSectionLoading() {
//   return (
//     <section className="hero-section relative">
//       <div className="hero-overlay w-full h-full absolute inset-0"></div>
//       <div className="container mx-auto px-4 py-24 relative z-10">
//         <div className="max-w-3xl">
//           <h1 className="text-5xl font-bold text-white mb-6">
//             Discover Your Next Adventure
//           </h1>
//           <p className="text-xl text-gray-200 mb-8">
//             Explore breathtaking destinations and create unforgettable memories
//             with our curated travel experiences.
//           </p>

//           {/* Loading state for search bar */}
//           <div className="bg-white text-gray p-4 rounded-lg shadow-lg animate-pulse">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 h-12 bg-gray-200 rounded"></div>
//               <div className="w-24 h-12 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Main export with Suspense
// export default function HeroSection() {
//   return (
//     <Suspense fallback={<HeroSectionLoading />}>
//       <HeroSectionContent />
//     </Suspense>
//   );
// }
