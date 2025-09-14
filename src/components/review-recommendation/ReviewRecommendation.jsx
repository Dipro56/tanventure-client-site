'use client';
import React, { useState, useEffect } from 'react';
import { FaRedo, FaUser } from 'react-icons/fa';
import ReviewCard from '../utils/cards/ReviewCard';
import RecommendationCard from '../utils/cards/RecommendationCard';
import packageServices from '@/service/packageService';
import reviewServices from '@/service/reviewService';

const ReviewRecommendation = () => {
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      const result = await packageServices.getPackages();
      console.log('package data', result?.data?.packages);
      
      // Shuffle the packages array for variety
      const shuffledPackages = shuffleArray(result?.data?.packages || []);
      setPackages(shuffledPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to fetch packages');
    }
  };

  const fetchReviews = async () => {
    try {
      const result = await reviewServices.getAllReviews();
      console.log('reviews data', result?.data?.reviews);
      
      // Get the latest 3 reviews
      const latestReviews = (result?.data?.reviews || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      
      setReviews(latestReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to fetch reviews');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchPackages(), fetchReviews()]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
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

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white mx-6 lg:mx-28">
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
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-100 p-4 rounded-lg mb-4 animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                      <FaUser className="text-gray-400 text-xl" />
                    </div>
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
      <section className="py-16 bg-white mx-6 lg:mx-28">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Reviews & Recommendations
          </h2>
          <div className="text-center text-red-500 mb-6">{error}</div>
          <div className="text-center">
            <button
              onClick={fetchAllData}
              className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center mx-auto"
            >
              <FaRedo className="mr-2" />
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
    <section className="py-16 bg-white mx-6 lg:mx-28">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Reviews & Recommendations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Reviews Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <button 
                onClick={fetchReviews}
                className="text-sm text-gray-600 hover:text-primary flex items-center"
              >
                <FaRedo className="mr-1" /> Refresh
              </button>
            </div>

            {/* Render Review Cards from API */}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard 
                  key={review._id} 
                  review={{
                    name: review.name,
                    imageUrl: null, // No image, will use avatar icon
                    rating: review.stars,
                    date: formatDate(review.createdAt),
                    text: `"${review.description}"`,
                    location: '' // Location not available in review model
                  }} 
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No reviews yet. Be the first to leave a review!
              </div>
            )}
          </div>

          {/* Recommendations Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Recommended Packages
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