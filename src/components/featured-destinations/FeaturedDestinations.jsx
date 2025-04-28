// components/FeaturedDestinations.tsx

import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

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
  const trendingPackages = [
    {
      id: 1,
      name: "Maldives Luxury Escape",
      location: "Maldives",
      image:
        "https://readdy.ai/api/search-image?query=Luxury%20overwater%20bungalows%20in%20Maldives%20with%20crystal%20clear%20turquoise%20water%2C%20white%20sandy%20beaches%2C%20palm%20trees%2C%20coral%20reefs%2C%20stunning%20sunset%2C%20private%20infinity%20pools%2C%20romantic%20getaway%2C%20high-end%20resort%2C%20professional%20travel%20photography%20with%20perfect%20lighting&width=400&height=300&seq=4&orientation=landscape",
      price: 2499,
      rating: 4.9,
      duration: "7 days",
    },
    {
      id: 2,
      name: "Paris City Break",
      location: "France",
      image:
        "https://readdy.ai/api/search-image?query=Romantic%20Paris%20cityscape%20with%20Eiffel%20Tower%2C%20Seine%20River%2C%20historic%20architecture%2C%20charming%20cafes%2C%20beautiful%20gardens%2C%20autumn%20leaves%2C%20cobblestone%20streets%2C%20artistic%20atmosphere%2C%20professional%20travel%20photography%20with%20warm%20lighting%20and%20perfect%20composition&width=400&height=300&seq=5&orientation=landscape",
      price: 1099,
      rating: 4.7,
      duration: "5 days",
    },
    {
      id: 3,
      name: "Swiss Alps Adventure",
      location: "Switzerland",
      image:
        "https://readdy.ai/api/search-image?query=Majestic%20Swiss%20Alps%20with%20snow-capped%20mountains%2C%20green%20valleys%2C%20alpine%20lakes%2C%20traditional%20chalets%2C%20hiking%20trails%2C%20cable%20cars%2C%20wildflowers%2C%20pristine%20nature%2C%20dramatic%20landscape%2C%20professional%20travel%20photography%20with%20crisp%20clear%20lighting&width=400&height=300&seq=6&orientation=landscape",
      price: 1899,
      rating: 4.8,
      duration: "6 days",
    },
    {
      id: 4,
      name: "Thailand Beach Getaway",
      location: "Thailand",
      image:
        "https://readdy.ai/api/search-image?query=Tropical%20Thailand%20beach%20paradise%20with%20limestone%20cliffs%2C%20long-tail%20boats%2C%20crystal%20clear%20turquoise%20water%2C%20white%20sandy%20beaches%2C%20lush%20vegetation%2C%20palm%20trees%2C%20island%20hopping%2C%20snorkeling%20spots%2C%20professional%20travel%20photography%20with%20vibrant%20colors&width=400&height=300&seq=7&orientation=landscape",
      price: 999,
      rating: 4.6,
      duration: "8 days",
    },
  ];

  return (
    // <section className="py-16 bg-white">
    //   <div className="container mx-auto px-4">
    //     <div className="flex justify-between items-center mb-10">
    //       <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
    //       <a href="#" className="text-primary font-medium flex items-center hover:underline">
    //         View all <i className="ri-arrow-right-line ml-2" />
    //       </a>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //       {destinations.map((destination, index) => (
    //         <div
    //           key={index}
    //           className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
    //         >
    //           <div className="relative">
    //             <img
    //               src={destination.image}
    //               alt={destination.name}
    //               className="w-full h-56 object-cover object-top"
    //             />
    //             <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition">
    //               <i className="ri-heart-line text-gray-700 hover:text-red-500" />
    //             </button>
    //           </div>

    //           <div className="p-5">
    //             <div className="flex justify-between items-start mb-2">
    //               <div>
    //                 <h3 className="font-semibold text-lg text-gray-900">
    //                   {destination.name}
    //                 </h3>
    //                 <p className="text-gray-600">{destination.country}</p>
    //               </div>
    //               <div className="flex items-center">
    //                 <i className="ri-star-fill text-yellow-400" />
    //                 <span className="ml-1 text-gray-700">{destination.rating}</span>
    //               </div>
    //             </div>

    //             <div className="flex items-center mb-4">
    //               <i className="ri-map-pin-line text-gray-500 mr-1" />
    //               <span className="text-sm text-gray-500">{destination.location}</span>
    //             </div>

    //             <div className="flex justify-between items-center">
    //               <div>
    //                 <span className="text-sm text-gray-500">Starting from</span>
    //                 <p className="text-primary font-bold">${destination.price}</p>
    //               </div>
    //               <button className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 transition whitespace-nowrap">
    //                 Book Now
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section className="mb-12 mx-6 lg:mx-28 my-4 lg:my-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Trending Packages</h2>
        <a
          href="#"
          className="text-[#4F46E5] hover:text-blue-700 text-sm font-medium flex items-center"
        >
          View all <i className="fas fa-chevron-right ml-1 text-xs"></i>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover object-top"
              />
              <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                <IoMdHeartEmpty className="far fa-heart text-gray-600" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#4F46E5]  text-white text-xs font-bold px-2 py-1 rounded">
                {pkg.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black text-lg mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center mb-2">
                    <IoLocationSharp className="fas fa-map-marker-alt mr-1 text-red-500" />{" "}
                    {pkg.location}
                  </p>
                </div>
                <div className="flex items-center">
                  <IoIosStar className="fas fa-star text-yellow-400 mr-1 text-sm" />
                  <span className="font-medium text-black">{pkg.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-gray-500 text-sm">From</span>
                  <p className="font-bold text-lg text-black">${pkg.price}</p>
                </div>
                <button className="bg-[#4F46E5] hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out !rounded-button whitespace-nowrap">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
