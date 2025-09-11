'use client';
import React, { useState, useEffect } from 'react';
import { FaRedo } from 'react-icons/fa';
import ReviewCard from '../utils/cards/ReviewCard';
import RecommendationCard from '../utils/cards/RecommendationCard';
import packageServices from '@/service/packageService';

const ReviewRecommendation = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const result = await packageServices.getPackages();
      console.log('package data', result?.data?.packages);
      
      // Shuffle the packages array for variety
      const shuffledPackages = shuffleArray(result?.data?.packages || []);
      setPackages(shuffledPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const reviews = [
    {
      name: 'Emily Johnson',
      imageUrl:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20woman%20with%20brown%20hair%20in%20her%2030s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=11&orientation=squarish',
      rating: 5,
      date: 'April 18, 2025',
      text: `"Our Hollywood tour was absolutely incredible! Seeing the Walk of Fame and the Hollywood Sign up close was a dream come true. Our guide was knowledgeable and made the experience unforgettable."`,
      location: 'Hollywood, Los Angeles',
    },
    {
      name: 'Michael Chen',
      imageUrl:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20man%20with%20dark%20hair%20and%20glasses%20in%20his%2040s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=12&orientation=squarish',
      rating: 4.5,
      date: 'April 10, 2025',
      text: `"The Santa Monica Pier and Venice Beach experience was fantastic! The vibrant atmosphere, street performers, and beautiful ocean views made for a perfect day. The bike tour along the beach was the highlight of our trip."`,
      location: 'Santa Monica, Los Angeles',
    },
    {
      name: 'Sophia Williams',
      imageUrl:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20woman%20with%20blonde%20hair%20in%20her%2020s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=13&orientation=squarish',
      rating: 5,
      date: 'April 2, 2025',
      text: `"The Getty Center tour exceeded all expectations! The stunning architecture, world-class art collection, and breathtaking views of LA were incredible. The gardens were absolutely beautiful and the tram ride up was so much fun!"`,
      location: 'Brentwood, Los Angeles',
    },
  

  ];

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Reviews & Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Reviews Column Skeleton */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="h-7 w-32 bg-gray-300 rounded"></div>
              </div>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-gray-100 p-4 rounded-lg mb-4 animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            
            {/* Recommendations Column Skeleton */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="h-7 w-40 bg-gray-300 rounded"></div>
              </div>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-100 p-3 rounded-lg mb-4 animate-pulse">
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Reviews & Recommendations
          </h2>
          <div className="text-center text-red-500 mb-6">{error}</div>
          <div className="text-center">
            <button
              onClick={fetchPackages}
              className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Get first 6 packages for recommendations (or fewer if not enough)
  const recommendedPackages = packages.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Reviews & Recommendations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Reviews Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
            </div>

            {/* Render Review Cards */}
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          {/* Recommendations Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Recommendation
              </h3>
              <button 
                onClick={fetchPackages}
                className="text-sm text-gray-600 hover:text-primary flex items-center"
              >
                <FaRedo className="mr-1" /> Refresh
              </button>
            </div>

            {/* Render Package Cards from API */}
            {recommendedPackages.length > 0 ? (
              recommendedPackages.map((pkg) => (
                <RecommendationCard 
                  key={pkg._id} 
                  recommendation={{
                    title: pkg.packagename,
                    location: pkg.location ? pkg.location.charAt(0).toUpperCase() + pkg.location.slice(1) : 'Unknown Location',
                    rating: 5, // Default rating since it's not in your package model
                    price: `$${typeof pkg.price === 'number' ? pkg.price.toFixed(2) : pkg.price}`,
                    imageUrl: pkg.avatar || '/placeholder-image.jpg'
                  }} 
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No packages available for recommendations.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewRecommendation;