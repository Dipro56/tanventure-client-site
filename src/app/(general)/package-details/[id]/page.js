// app/package-details/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';
import {
  IoIosStar,
  IoIosTime,
  IoIosInformationCircle,
  IoIosCheckmarkCircle,
  IoIosArrowBack,
} from 'react-icons/io';
import {
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaHeart,
  FaShare,
} from 'react-icons/fa';
import packageServices from '@/service/packageService';

const PackageDetails = () => {
  const params = useParams();
  const packageId = params.id;

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      // You'll need to implement getPackageById in your service
      const result = await packageServices.getPackageDetailsById(packageId);
      setPackageData(result.data.package);
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('Failed to load package details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-80 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Package Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The package you are looking for does not exist.'}
          </p>
          <Link
            href="/tour-packages"
            className="inline-flex items-center bg-[#4F46E5] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <IoIosArrowBack className="mr-2" />
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  // Sample gallery images (in a real app, you might have multiple images for a package)
  const galleryImages = [
    packageData.avatar,
    'https://readdy.ai/api/search-image?query=Tour+group+enjoying+scenic+view+of+mountains+and+valley',
    'https://readdy.ai/api/search-image?query=Luxury+resort+with+infinity+pool+overlooking+ocean',
    'https://readdy.ai/api/search-image?query=Local+cultural+experience+with+traditional+dance',
  ];

  // Sample itinerary (in a real app, this would come from your database)
  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Welcome',
      description: 'Arrive at destination, transfer to hotel, welcome dinner',
    },
    {
      day: 2,
      title: 'City Exploration',
      description: 'Guided tour of main attractions and historical sites',
    },
    {
      day: 3,
      title: 'Adventure Activities',
      description: 'Choose from hiking, water sports, or cultural workshops',
    },
    {
      day: 4,
      title: 'Local Experience',
      description: 'Visit local markets and traditional craft villages',
    },
    {
      day: 5,
      title: 'Free Day',
      description: 'Relax or explore on your own with optional activities',
    },
    {
      day: 6,
      title: 'Nature Excursion',
      description: 'Explore natural wonders and scenic landscapes',
    },
    {
      day: 7,
      title: 'Departure',
      description: 'Farewell breakfast and transfer to airport',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {packageData.packagename}
          </h1>
          <div className="flex items-center text-gray-600">
            <IoLocationSharp className="text-red-500 mr-1" />
            <span className="capitalize">{packageData.location}</span>
            <span className="mx-2">•</span>
            <IoIosStar className="text-yellow-400 mr-1" />
            <span>5.0 (24 reviews)</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 row-span-2">
              <img
                src={galleryImages[selectedImage]}
                alt={packageData.packagename}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      $
                      {typeof packageData.price === 'number'
                        ? packageData.price.toFixed(2)
                        : packageData.price}
                    </span>
                    {packageData.discount > 0 && (
                      <span className="text-sm text-red-500 line-through">
                        ${(packageData.price + packageData.discount).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">per person</p>
                  {packageData.discount > 0 && (
                    <div className="mt-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                      Save ${packageData.discount.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travelers
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

                {/* <button className="w-full bg-[#4F46E5] text-white py-3 rounded-lg font-semibold mt-6 hover:bg-blue-600 transition-colors">
                Book Now
              </button> */}

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Why Book With Us?
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      Best price guarantee
                    </li>
                    <li className="flex items-center">
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      Free cancellation up to 24 hours
                    </li>
                    <li className="flex items-center">
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      Instant confirmation
                    </li>
                    <li className="flex items-center">
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      24/7 customer support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {galleryImages.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  selectedImage === index + 1 ? 'ring-2 ring-[#4F46E5]' : ''
                }`}
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-44 object-cover rounded-xl"
                />
              </div>
            ))} */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'itinerary', 'inclusions', 'reviews'].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-[#4F46E5] text-[#4F46E5]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Tour
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {packageData.description ||
                    'Discover the beauty and culture of this amazing destination with our expertly crafted tour package. Experience the perfect blend of adventure, relaxation, and cultural immersion.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center">
                    <IoIosTime className="text-[#4F46E5] text-2xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Duration</h3>
                      <p className="text-gray-600">
                        {packageData.duration || '7 days, 6 nights'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-[#4F46E5] text-xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Group Size
                      </h3>
                      <p className="text-gray-600">Max 12 people</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-[#4F46E5] text-xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Destinations
                      </h3>
                      <p className="text-gray-600 capitalize">
                        {packageData.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-[#4F46E5] text-xl mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Tour Pace</h3>
                      <p className="text-gray-600">Moderate</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Tour Itinerary
                </h2>
                <div className="space-y-4">
                  {itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      Included
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'Accommodation',
                        'Professional guide',
                        'All transportation',
                        'Entrance fees',
                        'Daily breakfast',
                        '24/7 support',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                      <IoIosInformationCircle className="text-red-500 mr-2" />
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'International flights',
                        'Travel insurance',
                        'Personal expenses',
                        'Optional activities',
                        'Visa fees',
                        'Lunch & dinner',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Customer Reviews
                </h2>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="bg-white p-6 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Customer {review}
                          </h3>
                          <div className="flex items-center text-gray-500">
                            <IoIosStar className="text-yellow-400 mr-1" />
                            <span>5.0</span>
                            <span className="mx-2">•</span>
                            <span>2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Amazing experience! The tour was well-organized, the
                        guide was knowledgeable, and the destinations were
                        breathtaking. Would definitely recommend this package to
                        anyone looking for an adventure.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
