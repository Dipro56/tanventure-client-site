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
  IoIosClose,
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
import bookingServices from '@/service/bookingService';

const PackageDetails = () => {
  const params = useParams();
  const packageId = params.id;

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    days: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const result = await packageServices.getPackageDetailsById(packageId);
      setPackageData(result.data.package);
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('Failed to load package details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!bookingForm.name.trim()) errors.name = 'Name is required';
    if (!bookingForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!bookingForm.phone.trim()) errors.phone = 'Phone is required';
    if (!bookingForm.date) errors.date = 'Date is required';
    if (!bookingForm.days || bookingForm.days < 1)
      errors.days = 'Number of days must be at least 1';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowBookingModal(false);
    setIsSubmitting(true);
    setBookingMessage(null);

    try {
      const bookingData = {
        ...bookingForm,
        packageId,
        packageName: packageData.packagename,
      };

      // Send booking request using the booking service
      const result = await bookingServices.createBooking(bookingData);

      // Success handling

      if (result?.statusCode == 201) {
        setIsBookingSuccess(true);
        setBookingMessage(
          'Booking request submitted successfully! We will contact you soon.'
        );
      } else {
        setIsBookingSuccess(false);
        setBookingMessage(null);
      }

      // Reset form and close modal after delay
      setTimeout(() => {
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          date: '',
          days: '',
          message: '',
        });
        setIsBookingSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsBookingSuccess(false);
      setBookingMessage(
        error.message || 'Failed to submit booking. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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

  const galleryImages = [
    packageData.avatar,
    'https://readdy.ai/api/search-image?query=Tour+group+enjoying+scenic+view+of+mountains+and+valley',
    'https://readdy.ai/api/search-image?query=Luxury+resort+with+infinity+pool+overlooking+ocean',
    'https://readdy.ai/api/search-image?query=Local+cultural+experience+with+traditional+dance',
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

                <hr />

                {/* Booking Status Message */}
                {bookingMessage && isBookingSuccess && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      isBookingSuccess
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center">
                      {isBookingSuccess ? (
                        <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                      ) : (
                        <IoIosClose className="text-red-500 mr-2" />
                      )}
                      <span className="text-sm font-medium">
                        {bookingMessage}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-[#4F46E5] text-white py-3 rounded-lg font-semibold mt-6 hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview'].map((tab) => (
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
                ))}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book {packageData.packagename}
                </h2>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingMessage(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoIosClose size={24} />
                </button>
              </div>

              {/* Booking Status Message in Modal */}
              {bookingMessage && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    isBookingSuccess
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  <div className="flex items-center">
                    {isBookingSuccess ? (
                      <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                    ) : (
                      <IoIosClose className="text-red-500 mr-2" />
                    )}
                    <IoIosCheckmarkCircle className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">
                      {bookingMessage}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approximate Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
                      formErrors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.date && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Days *
                  </label>
                  <input
                    type="number"
                    name="days"
                    min="1"
                    value={bookingForm.days}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] ${
                      formErrors.days ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter number of days"
                  />
                  {formErrors.days && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.days}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                    placeholder="Any special requests or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4F46E5] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
