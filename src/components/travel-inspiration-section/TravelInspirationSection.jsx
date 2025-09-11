import React from 'react';
import ArticleCard from '../utils/cards/ArticleCard';

const TravelInspirationSection = () => {
  const articles = [
    {
      id: 1,
      title: '10 Essential Packing Tips for Long-Term Travel',
      imageUrl:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Travel Tips',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
      },
      date: 'April 22, 2025',
      description:
        'Learn how to pack efficiently for extended trips while keeping your luggage light and manageable. These expert tips will help you prepare for any travel situation.',
      link: '#',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'How to Capture Stunning Travel Photos with Your Smartphone',
      imageUrl:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Photography',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
      },
      date: 'April 18, 2025',
      description:
        "You don't need expensive equipment to take amazing travel photos. Discover techniques to elevate your smartphone photography and create memories that last a lifetime.",
      link: '#',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'The Ultimate Guide to Street Food Around the World',
      imageUrl:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Food & Culture',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
      },
      date: 'April 14, 2025',
      description:
        'Explore the vibrant world of street food and learn how to find the most authentic local dishes wherever you travel. Includes safety tips and must-try specialties.',
      link: '#',
      readTime: '8 min read',
    },
    {
      id: 4,
      title: 'Sustainable Travel: How to Reduce Your Environmental Impact',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Eco Travel',
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-800',
      },
      date: 'April 10, 2025',
      description:
        'Discover practical ways to make your travels more eco-friendly, from choosing sustainable accommodations to reducing plastic waste on the road.',
      link: '#',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'Hidden Gems: Unexplored Destinations for 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Destinations',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
      },
      date: 'April 5, 2025',
      description:
        'Skip the crowded tourist spots and explore these breathtaking destinations that remain off the beaten path. Perfect for travelers seeking authentic experiences.',
      link: '#',
      readTime: '9 min read',
    },
    {
      id: 6,
      title: 'Budget Travel: How to See the World Without Breaking the Bank',
      imageUrl:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: {
        name: 'Budget Travel',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
      },
      date: 'March 28, 2025',
      description:
        'Proven strategies for traveling on a tight budget. Learn about finding cheap flights, affordable accommodations, and free activities in any destination.',
      link: '#',
      readTime: '10 min read',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">
              Travel Tips & Inspiration
            </h2>
            <p className="text-gray-600 mt-2">
              Discover new destinations, travel hacks, and cultural insights to
              fuel your wanderlust.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelInspirationSection;
