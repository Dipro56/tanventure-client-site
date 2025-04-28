import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <a href="#" class="text-3xl text-black text-primary">
            logo
          </a>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            class="font-medium text-gray-900 hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            href="#"
            class="font-medium text-gray-600 hover:text-primary transition"
          >
            Destinations
          </Link>
          <Link
            href="#"
            class="font-medium text-gray-600 hover:text-primary transition"
          >
            Deals
          </Link>
          <Link
            href="#"
            class="font-medium text-gray-600 hover:text-primary transition"
          >
            Reviews
          </Link>
        </nav>

        <div class="flex items-center space-x-6">
          <button className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
