import React from "react";
import { FaRedo } from "react-icons/fa";
import ReviewCard from "../utils/cards/ReviewCard";
import RecommendationCard from "../utils/cards/RecommendationCard";

const ReviewRecommendation = () => {
  const reviews = [
    {
      name: "Emily Johnson",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20woman%20with%20brown%20hair%20in%20her%2030s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=11&orientation=squarish",
      rating: 5,
      date: "April 18, 2025",
      text: `"Our trip to Santorini was absolutely magical! The accommodations were perfect, and the guided tour of the island provided insights we would have never discovered on our own. The sunset cruise was the highlight of our vacation."`,
      location: "Santorini, Greece",
    },
    {
      name: "Michael Chen",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20man%20with%20dark%20hair%20and%20glasses%20in%20his%2040s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=12&orientation=squarish",
      rating: 4.5,
      date: "April 10, 2025",
      text: `"The cooking class in Florence was the perfect way to experience authentic Italian culture. Our chef was knowledgeable and entertaining, and we learned to make pasta from scratch. The wine pairing was excellent, and we've already recreated the recipes at home!"`,
      location: "Florence, Italy",
    },
    {
      name: "Sophia Williams",
      imageUrl:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20smiling%20woman%20with%20blonde%20hair%20in%20her%2020s%2C%20neutral%20background%2C%20professional%20portrait%20photography&width=100&height=100&seq=13&orientation=squarish",
      rating: 5,
      date: "April 2, 2025",
      text: `"The Northern Lights tour exceeded all expectations! Our guide was incredibly knowledgeable about the best viewing spots and photography tips. We were lucky enough to see an amazing display, and the hot chocolate provided during the tour was a perfect touch for the cold night."`,
      location: "Tromsø, Norway",
    },
  ];

  const recommendations = [
    {
      title: "Machu Picchu Explorer",
      location: "Peru",
      rating: 4.9,
      price: "$1,299",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Machu%20Picchu%2C%20Peru%20with%20ancient%20Incan%20ruins%20on%20mountain%20top%2C%20misty%20clouds%2C%20and%20lush%20green%20surroundings.%20Professional%20travel%20photography%20showing%20historical%20site%20and%20Andean%20mountains.&width=300&height=200&seq=14&orientation=landscape",
    },
    {
      title: "Maldives Luxury Escape",
      location: "Maldives",
      rating: 4.8,
      price: "$2,499",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Maldives%20overwater%20bungalows%20with%20crystal%20clear%20turquoise%20water%2C%20white%20sand%20beaches%2C%20and%20palm%20trees.%20Luxury%20tropical%20resort.%20Professional%20travel%20photography%20showing%20paradise%20island%20destination.&width=300&height=200&seq=15&orientation=landscape",
    },
    {
      title: "Romantic Paris Getaway",
      location: "France",
      rating: 4.7,
      price: "$1,199",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Paris%2C%20France%20with%20Eiffel%20Tower%2C%20Seine%20River%2C%20and%20traditional%20Parisian%20cafes.%20Beautiful%20European%20architecture%2C%20cobblestone%20streets%2C%20and%20spring%20blossoms.%20Professional%20travel%20photography%20showing%20romantic%20city%20destination.&width=300&height=200&seq=16&orientation=landscape",
    },
    {
      title: "New Zealand Adventure",
      location: "New Zealand",
      rating: 4.9,
      price: "$1,899",
      imageUrl:
        "https://readdy.ai/api/search-image?query=New%20Zealand%20fjords%20with%20dramatic%20mountains%2C%20waterfalls%2C%20and%20crystal%20clear%20water.%20Lush%20green%20forests%20and%20snow-capped%20peaks.%20Professional%20travel%20photography%20showing%20pristine%20natural%20landscape.&width=300&height=200&seq=17&orientation=landscape",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Reviews & Recommendations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Reviews Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Latest Reviews
              </h3>
              <a
                href="#"
                className="text-[#4F46E5] font-medium hover:underline"
              >
                View all
              </a>
            </div>

            {/* Render Review Cards dynamically from JSON */}
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          {/* Recommendations Column */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Recommended for You
              </h3>
              <button className="text-sm text-gray-600 hover:text-primary flex items-center">
                <FaRedo className="mr-1" /> Refresh
              </button>
            </div>

            {/* Render Recommendation Cards dynamically from JSON */}
            {recommendations.map((recommendation, index) => (
              <RecommendationCard key={index} recommendation={recommendation} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewRecommendation;
