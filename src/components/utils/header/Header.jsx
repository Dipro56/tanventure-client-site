"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { FaBars, FaTimes, FaBriefcase } from "react-icons/fa";

// Create a separate component that uses navigation hooks
function HeaderContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollToParam = searchParams.get("scrollTo");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/?scrollTo=packages", label: "Packages" },
    { href: "/?scrollTo=reviews", label: "Reviews" },
    { href: "/?scrollTo=about", label: "About" },
    { href: "/?scrollTo=blog", label: "Blog" }
  ];

  const isActive = (href) => {
    if (href === "/" && pathname === "/") return !scrollToParam; // Home
    if (href.includes("scrollTo") && scrollToParam) {
      return href.includes(scrollToParam);
    }
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
              <FaBriefcase className="text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NagarUSA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Loading component for Suspense fallback
function HeaderLoading() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 w-10 h-10 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Navigation skeleton */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </nav>

          {/* Mobile menu button skeleton */}
          <div className="lg:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
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