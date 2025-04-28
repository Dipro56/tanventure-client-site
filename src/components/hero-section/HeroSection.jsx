// components/HeroSection.tsx

import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section relative">
      <div className="hero-overlay w-full h-full absolute inset-0"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          {/* Search Bar */}
          <div className="bg-white text-gray p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-map-pin-line text-gray-400" />
                </div> */}
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full text-black pl-5 pr-4 py-3 border-none rounded focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-calendar-line text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-10 pr-10 py-3 border-none rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Check-in"
                />
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-calendar-line text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-10 pr-10 py-3 border-none rounded focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Check-out"
                />
              </div> */}

              <button className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          {/* <div className="flex flex-wrap gap-4 mt-8">
            {[
              { icon: "ri-sun-line", label: "Beaches" },
              { icon: "ri-mountain-line", label: "Mountains" },
              { icon: "ri-building-line", label: "Cities" },
              { icon: "ri-ancient-gate-line", label: "Cultural" },
            ].map((filter) => (
              <a
                key={filter.label}
                href="#"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 transition px-6 py-3 rounded-full text-black font-medium flex items-center"
              >
                <i className={`${filter.icon} mr-2`} />
                {filter.label}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
