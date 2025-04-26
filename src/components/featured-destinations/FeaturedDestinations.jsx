// components/FeaturedDestinations.tsx

import React from "react";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    location: "Cyclades Islands",
    rating: "4.9",
    price: "899",
    image:
      "https://readdy.ai/api/search-image?query=Santorini%2C%20Greece%20with%20white%20buildings%2C%20blue%20domed%20churches%2C%20overlooking%20the%20Aegean%20Sea.%20Stunning%20sunset%20view%20with%20orange%20and%20pink%20sky.%20Beautiful%20coastal%20landscape%20with%20cliffs%20and%20crystal%20clear%20water.%20Professional%20travel%20photography%20with%20vibrant%20colors.&width=600&height=400&seq=2&orientation=landscape",
  },
  {
    name: "Bali",
    country: "Indonesia",
    location: "Ubud & Seminyak",
    rating: "4.8",
    price: "749",
    image:
      "https://readdy.ai/api/search-image?query=Bali%2C%20Indonesia%20with%20lush%20green%20rice%20terraces%2C%20tropical%20palm%20trees%2C%20and%20traditional%20temples.%20Beautiful%20beach%20scene%20with%20turquoise%20water%20and%20white%20sand.%20Balinese%20culture%20and%20architecture.%20Professional%20travel%20photography%20with%20vibrant%20colors.&width=600&height=400&seq=3&orientation=landscape",
  },
  {
    name: "Kyoto",
    country: "Japan",
    location: "Gion & Arashiyama",
    rating: "4.7",
    price: "1099",
    image:
      "https://readdy.ai/api/search-image?query=Kyoto%2C%20Japan%20with%20traditional%20Japanese%20temples%2C%20cherry%20blossoms%2C%20and%20autumn%20foliage.%20Ancient%20wooden%20architecture%2C%20zen%20gardens%20with%20stone%20paths%20and%20moss.%20Professional%20travel%20photography%20with%20vibrant%20colors%20showing%20Japanese%20culture%20and%20history.&width=600&height=400&seq=4&orientation=landscape",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    location: "Positano & Ravello",
    rating: "4.9",
    price: "1249",
    image:
      "https://readdy.ai/api/search-image?query=Amalfi%20Coast%2C%20Italy%20with%20colorful%20cliffside%20villages%2C%20azure%20Mediterranean%20sea%2C%20and%20winding%20coastal%20roads.%20Picturesque%20harbors%20with%20boats%2C%20Italian%20architecture%20with%20terracotta%20roofs.%20Professional%20travel%20photography%20with%20vibrant%20colors%20showing%20Italian%20coastal%20beauty.&width=600&height=400&seq=5&orientation=landscape",
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
          <a href="#" className="text-primary font-medium flex items-center hover:underline">
            View all <i className="ri-arrow-right-line ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-56 object-cover object-top"
                />
                <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition">
                  <i className="ri-heart-line text-gray-700 hover:text-red-500" />
                </button>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600">{destination.country}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400" />
                    <span className="ml-1 text-gray-700">{destination.rating}</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-line text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{destination.location}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-primary font-bold">${destination.price}</p>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 transition whitespace-nowrap">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
