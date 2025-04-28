import React from "react";
import ArticleCard from "../utils/cards/ArticleCard";

const TravelInspirationSection = () => {
  const articles = [
    {
      title: "10 Essential Packing Tips for Long-Term Travel",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Travel%20packing%20essentials%20neatly%20organized%20on%20wooden%20table.%20Passport%2C%20camera%2C%20map%2C%20sunglasses%2C%20and%20travel%20accessories.%20Professional%20flat%20lay%20photography%20with%20warm%20lighting.&width=600&height=400&seq=18&orientation=landscape",
      category: {
        name: "Travel Tips",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      date: "April 22, 2025",
      description:
        "Learn how to pack efficiently for extended trips while keeping your luggage light and manageable. These expert tips will help you prepare for any travel situation.",
      link: "#",
    },
    {
      title: "How to Capture Stunning Travel Photos with Your Smartphone",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Person%20taking%20photo%20with%20smartphone%20of%20beautiful%20mountain%20landscape%20at%20sunset.%20Travel%20photography%20concept.%20Professional%20lifestyle%20photography%20with%20warm%20golden%20light.&width=600&height=400&seq=19&orientation=landscape",
      category: {
        name: "Photography",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      },
      date: "April 18, 2025",
      description:
        "You don't need expensive equipment to take amazing travel photos. Discover techniques to elevate your smartphone photography and create memories that last a lifetime.",
      link: "#",
    },
    {
      title: "The Ultimate Guide to Street Food Around the World",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Local%20street%20food%20market%20in%20Asia%20with%20colorful%20dishes%2C%20vendors%2C%20and%20customers.%20Authentic%20cultural%20food%20experience.%20Professional%20food%20photography%20with%20vibrant%20colors%20and%20atmospheric%20lighting.&width=600&height=400&seq=20&orientation=landscape",
      category: {
        name: "Food & Culture",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
      },
      date: "April 14, 2025",
      description:
        "Explore the vibrant world of street food and learn how to find the most authentic local dishes wherever you travel. Includes safety tips and must-try specialties.",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Travel Tips & Inspiration
          </h2>
          <a
            href="#"
            className="text-primary font-medium flex items-center hover:underline"
          >
            View all articles <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render Article Cards dynamically from JSON */}
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelInspirationSection;
