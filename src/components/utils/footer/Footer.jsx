import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaArrowRight,
  FaMapPin,
  FaPhone,
  FaMailBulk,
  FaRegClock,
  FaVisa,
  FaMastercard,
  FaPaypal,
  FaApple,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <a
              href="#"
              className="text-3xl font-['Pacifico'] text-white mb-6 block"
            >
              logo
            </a>
            <p className="text-gray-400 mb-6">
              We create unforgettable travel experiences tailored to your
              preferences and dreams.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <FaPinterest />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Tours & Activities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Travel Deals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Travel Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Trust & Safety
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Accessibility
                </a>
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
                  123 Travel Street, Suite 500
                  <br />
                  New York, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white transition"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <FaMailBulk className="mr-3 text-gray-400" />
                <a
                  href="mailto:info@travelagency.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  info@travelagency.com
                </a>
              </li>
              <li className="flex items-center">
                <FaRegClock className="mr-3 text-gray-400" />
                <span className="text-gray-400">Mon-Fri: 9AM - 6PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Tranventure. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-3">
                {/* <FaVisa className="text-xl text-gray-300" /> */}
                {/* <FaMastercard className="text-xl text-gray-300" /> */}
                <FaPaypal className="text-xl text-gray-300" />
                <FaApple className="text-xl text-gray-300" />
                <FaGoogle className="text-xl text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
