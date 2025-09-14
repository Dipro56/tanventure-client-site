'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';

// Create a separate component that uses navigation hooks
function HeaderContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollToParam = searchParams.get('scrollTo');

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/?scrollTo=packages', label: 'Packages' },
    { href: '/?scrollTo=reviews', label: 'Reviews' },
    { href: '/?scrollTo=about', label: 'About' },
    { href: '/?scrollTo=blog', label: 'Blog' },
  ];

  const phoneNumbers = [
    { label: 'Sales', number: '+1 (123) 456-7890' },
    { label: 'Support', number: '+1 (234) 567-8901' },
    { label: 'Emergency', number: '+1 (345) 678-9012' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return !scrollToParam; // Home
    if (href.includes('scrollTo') && scrollToParam) {
      return href.includes(scrollToParam);
    }
    return false;
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    setIsPhoneDropdownOpen(!isPhoneDropdownOpen);
  };

  const handlePhoneOptionClick = (number) => {
    setIsPhoneDropdownOpen(false);
    setIsMenuOpen(false);
    window.location.href = `tel:${number.replace(/\D/g, '')}`;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src={'/logo/nagar_usa_logo.png'}
              alt={'Nagar USA Logo'}
              height={60}
              width={50}
              className="h-10 w-auto"
            />
            <span className="hidden sm:block text-xl font-semibold text-gray-800">Nagar USA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 mx-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Phone Section - Desktop */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <button
                onClick={handlePhoneClick}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                aria-expanded={isPhoneDropdownOpen}
                aria-haspopup="true"
              >
                <FaPhone className="text-sm" />
                <span>Contact Us</span>
                <FaChevronDown className="text-xs" />
              </button>
              
              {isPhoneDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Call us at:</p>
                  </div>
                  {phoneNumbers.map((phone, index) => (
                    <button
                      key={index}
                      onClick={() => handlePhoneOptionClick(phone.number)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-medium">{phone.label}</div>
                      <div className="text-xs text-gray-500">{phone.number}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            {/* Mobile Phone Button */}
            <button
              onClick={handlePhoneClick}
              className="p-2 mr-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Contact us"
            >
              <FaPhone className="text-xl" />
            </button>
            
            <button
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <nav className="flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Phone Options */}
              <div className="px-4 py-3 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Call Us</h3>
                {phoneNumbers.map((phone, index) => (
                  <button
                    key={index}
                    onClick={() => handlePhoneOptionClick(phone.number)}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-medium">{phone.label}:</div>
                    <div className="text-sm text-gray-500">{phone.number}</div>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}

        {/* Phone Dropdown for Mobile (when only phone button is clicked) */}
        {isPhoneDropdownOpen && !isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40">
            <div className="px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Call Us</h3>
              {phoneNumbers.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => handlePhoneOptionClick(phone.number)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="font-medium">{phone.label}:</div>
                  <div className="text-sm text-gray-500">{phone.number}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Loading component for Suspense fallback
function HeaderLoading() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 w-10 h-10 rounded-lg animate-pulse"></div>
            <div className="hidden sm:block w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="flex lg:hidden items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-2"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main export with Suspense
export default function Header() {
  return (
    <Suspense fallback={<HeaderLoading />}>
      <HeaderContent />
    </Suspense>
  );
}