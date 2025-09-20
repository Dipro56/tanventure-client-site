'use client';

import React, { useState, useEffect } from 'react';
import {
  FaPlane,
  FaHotel,
  FaUmbrellaBeach,
  FaCar,
  FaMapMarkedAlt,
  FaUserTie,
  FaPassport,
  FaShieldAlt,
  FaShip,
  FaHiking,
  FaGlobe,
} from 'react-icons/fa';
import serviceServices from '@/service/serviceService';
import Link from 'next/link';

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping based on service type
  const getServiceIcon = (type) => {
    const iconMap = {
      flight: FaPlane,
      'flight booking': FaPlane,
      hotel: FaHotel,
      'hotel reservations': FaHotel,
      vacation: FaUmbrellaBeach,
      'vacation packages': FaUmbrellaBeach,
      transportation: FaCar,
      'car rental': FaCar,
      tour: FaMapMarkedAlt,
      'tour planning': FaMapMarkedAlt,
      corporate: FaUserTie,
      'corporate travel': FaUserTie,
      visa: FaPassport,
      'visa services': FaPassport,
      insurance: FaShieldAlt,
      'travel insurance': FaShieldAlt,
      cruise: FaShip,
      'cruise packages': FaShip,
      adventure: FaHiking,
      'adventure tours': FaHiking,
    };

    const IconComponent = iconMap[type.toLowerCase()] || FaGlobe;
    return <IconComponent className="text-3xl" />;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceServices.getAllServices();
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything if no services are available
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden px-4 sm:px-6 lg:px-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="text-indigo-600">Services</span>
            </h2>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="animate-pulse">
                  <div className="h-16 w-16 bg-gray-300 rounded-2xl mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Return null if no services are available after loading
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden px-4 sm:px-6 lg:px-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-indigo-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the world with confidence. We offer comprehensive travel
            services tailored to make your journey unforgettable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                {getServiceIcon(service.type)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Ready to Plan Your Next Adventure?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={'/?scrollTo=packages'}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 cursor-pointer">
                Explore Packages
              </button>
            </Link>

            <Link href={'/?scrollTo=contact'}>
              <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg transition-colors duration-300 cursor-pointer">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default OurServices;
