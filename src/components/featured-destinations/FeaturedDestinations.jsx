// components/featured-destinations/FeaturedDestinations.js
'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import packageServices from '@/service/packageService';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Create a separate component that uses useSearchParams
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
    <section className="mb-12 mx-6 lg:mx-28 my-4 lg:my-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Trending Packages</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={pkg.avatar || '/placeholder-image.jpg'}
                alt={pkg.packagename}
                fill
                className="object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <div className="absolute bottom-3 left-3 bg-[#4F46E5] text-white text-xs font-bold px-2 py-1 rounded">
                {pkg.duration ? `${pkg.duration} Days` : 'Custom Package'}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black text-lg mb-1 line-clamp-1">
                    {pkg.packagename}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center mb-2">
                    <IoLocationSharp className="mr-1 text-red-500" />
                    {pkg.location
                      ? pkg.location.charAt(0).toUpperCase() +
                        pkg.location.slice(1)
                      : 'Unknown Location'}
                  </p>
                </div>
                <div className="flex items-center">
                  <IoIosStar className="text-yellow-400 mr-1 text-sm" />
                  <span className="font-medium text-black">5</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-gray-500 text-sm">From</span>
                  <p className="font-bold text-lg text-black">
                    $
                    {typeof pkg.price === 'number'
                      ? pkg.price.toFixed(2)
                      : pkg.price}
                  </p>
                </div>

                <Link href={`/package-details/${pkg._id}`}>
                  <button className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Loading component for Suspense fallback
function FeaturedDestinationsLoading() {
  return (
    <section className="mb-12 mx-6 lg:mx-28 my-4 lg:my-16">
      <h2 className="text-xl font-bold text-black mb-4">Trending Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
          >
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main export with Suspense
export default function FeaturedDestinations() {
  return (
    <Suspense fallback={<FeaturedDestinationsLoading />}>
      <FeaturedDestinationsContent />
    </Suspense>
  );
}
