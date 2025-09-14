// components/featured-destinations/FeaturedDestinations.js
'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import packageServices from '@/service/packageService';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Card Component
function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-xl animate-fadeIn flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={pkg.avatar || '/placeholder-image.jpg'}
          alt={pkg.packagename}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Duration Badge */}
        <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-md shadow-sm">
          {pkg.duration ? `${pkg.duration} Days` : 'Custom Package'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title + Rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {pkg.packagename}
          </h3>
          <div className="flex items-center text-yellow-500">
            <IoIosStar className="text-base" />
            <span className="ml-1 font-medium text-sm text-gray-800">5.0</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-600 flex items-center mb-4">
          <IoLocationSharp className="mr-1 text-red-500" />
          {pkg.location
            ? pkg.location.charAt(0).toUpperCase() + pkg.location.slice(1)
            : 'Unknown Location'}
        </p>

        {/* Price + Button */}
        <div className="mt-auto flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">From</span>
            <p className="font-bold text-lg text-gray-900">
              $
              {typeof pkg.price === 'number'
                ? pkg.price.toFixed(2)
                : pkg.price}
            </p>
          </div>

          <Link href={`/package-details/${pkg._id}`}>
            <button className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm cursor-pointer">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main Content Component
function FeaturedDestinationsContent() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') || '';

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const result = await packageServices.getPackages();
      setPackages(result?.data?.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    if (!searchValue) return packages;
    return packages.filter((pkg) =>
      pkg.packagename?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [packages, searchValue]);

  return (
    <section className="mb-12 mx-6 lg:mx-28 my-6 lg:my-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">🌍 Trending Packages</h2>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      )}
    </section>
  );
}

// Loading Skeleton
function FeaturedDestinationsLoading() {
  return (
    <section className="mb-12 mx-6 lg:mx-28 my-6 lg:my-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">🌍 Trending Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
          >
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-5">
              <div className="h-4 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Add fadeIn animation with Tailwind
// (Add this in globals.css or tailwind.css if not already there)
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.6s ease-out forwards;
// }

export default function FeaturedDestinations() {
  return (
    <Suspense fallback={<FeaturedDestinationsLoading />}>
      <FeaturedDestinationsContent />
    </Suspense>
  );
}
