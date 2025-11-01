import { baseUrl } from '@/utils/config';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaMapPin,
  FaPhone,
  FaMailBulk,
} from 'react-icons/fa';


const Footer = async () => {
  let infoDetails = null;
  
  try {
    // Use native fetch with Next.js caching
    const response = await fetch(`${baseUrl}/info/get-info`, {
      next: { revalidate: 300 } // 5 minutes
    });
    
    if (response.ok) {
      const result = await response.json();
      infoDetails = result?.data;
    }
  } catch (error) {
    console.error('Error fetching footer info:', error);
  }

  return (
    <footer className="bg-[#101828] text-white pt-16 pb-8 px-6 lg:px-28 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Nagar USA</h2>
            <p className="text-gray-400 mb-6">
              We create unforgettable travel experiences tailored to your
              preferences and dreams.
            </p>
            <div className="flex space-x-4">
              <Link
                href={infoDetails?.facebookLink || '#'}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaFacebook />
              </Link>
              <Link
                href={infoDetails?.instaLink || '#'}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/?scrollTo=about`}
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`/?scrollTo=packages`}
                  className="text-gray-400 hover:text-white transition"
                >
                  Travel Deals
                </Link>
              </li>
              <li>
                <Link
                  href={`/?scrollTo=blog`}
                  className="text-gray-400 hover:text-white transition"
                >
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Packages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/?scrollTo=packages`}
                  className="text-gray-400 hover:text-white transition"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href={`/?scrollTo=blog`}
                  className="text-gray-400 hover:text-white transition"
                >
                  Tours & Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapPin className="mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">
                  {infoDetails?.address || 'Loading...'}
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <a
                  href={`tel:${infoDetails?.phone}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  {infoDetails?.phone || 'Loading...'}
                </a>
              </li>
              <li className="flex items-center">
                <FaMailBulk className="mr-3 text-gray-400" />
                <a
                  href={`mailto:${infoDetails?.email}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  {infoDetails?.email || 'Loading...'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Nagar USA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;