'use client';

import React, { useEffect, useState } from 'react';
import blogServices from '@/service/blogService';
import ArticleCard from '../utils/cards/ArticleCard';

const TravelInspirationSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogServices.getAllBlogs();
        const blogs = response.data.blogs || [];

        // Map API data to article format
        const formattedArticles = blogs.map(blog => ({
          id: blog._id,
          title: blog.title,
          imageUrl: blog.image,
          category: {
            name: blog.category,
            bgColor: getCategoryColor(blog.category).bgColor,
            textColor: getCategoryColor(blog.category).textColor,
          },
          date: new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          description: blog.description,
          link: `/blog/${blog._id}`,
          readTime: blog.readTime,
        }));

        setArticles(formattedArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog articles');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper function to assign colors based on category
  const getCategoryColor = (category) => {
    const colorMap = {
      'Travel Tips': { bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      'Photography': { bgColor: 'bg-green-100', textColor: 'text-green-800' },
      'Food & Culture': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
      'Eco Travel': { bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
      'Destinations': { bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
      'Budget Travel': { bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
      'Technology': { bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
      'Lifestyle': { bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
      'Adventure': { bgColor: 'bg-red-100', textColor: 'text-red-800' },
    };

    return colorMap[category] || { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 px-6 lg:px-28" id="blog">
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
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading blog articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 px-6 lg:px-28" id="blog">
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
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-4 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 px-6 lg:px-28" id="blog">
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

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-4 text-gray-600">
              No blog articles yet. Check back soon for travel inspiration!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelInspirationSection;

// import React from 'react';
// import ArticleCard from '../utils/cards/ArticleCard';

// const TravelInspirationSection = () => {
//   const articles = [
//     {
//       id: 1,
//       title: '10 Essential Packing Tips for Long-Term Travel',
//       imageUrl:
//         'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Travel Tips',
//         bgColor: 'bg-blue-100',
//         textColor: 'text-blue-800',
//       },
//       date: 'April 22, 2025',
//       description:
//         'Learn how to pack efficiently for extended trips while keeping your luggage light and manageable. These expert tips will help you prepare for any travel situation.',
//       link: '#',
//       readTime: '5 min read',
//     },
//     {
//       id: 2,
//       title: 'How to Capture Stunning Travel Photos with Your Smartphone',
//       imageUrl:
//         'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Photography',
//         bgColor: 'bg-green-100',
//         textColor: 'text-green-800',
//       },
//       date: 'April 18, 2025',
//       description:
//         "You don't need expensive equipment to take amazing travel photos. Discover techniques to elevate your smartphone photography and create memories that last a lifetime.",
//       link: '#',
//       readTime: '7 min read',
//     },
//     {
//       id: 3,
//       title: 'The Ultimate Guide to Street Food Around the World',
//       imageUrl:
//         'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Food & Culture',
//         bgColor: 'bg-yellow-100',
//         textColor: 'text-yellow-800',
//       },
//       date: 'April 14, 2025',
//       description:
//         'Explore the vibrant world of street food and learn how to find the most authentic local dishes wherever you travel. Includes safety tips and must-try specialties.',
//       link: '#',
//       readTime: '8 min read',
//     },
//     {
//       id: 4,
//       title: 'Sustainable Travel: How to Reduce Your Environmental Impact',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Eco Travel',
//         bgColor: 'bg-emerald-100',
//         textColor: 'text-emerald-800',
//       },
//       date: 'April 10, 2025',
//       description:
//         'Discover practical ways to make your travels more eco-friendly, from choosing sustainable accommodations to reducing plastic waste on the road.',
//       link: '#',
//       readTime: '6 min read',
//     },
//     {
//       id: 5,
//       title: 'Hidden Gems: Unexplored Destinations for 2025',
//       imageUrl:
//         'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Destinations',
//         bgColor: 'bg-purple-100',
//         textColor: 'text-purple-800',
//       },
//       date: 'April 5, 2025',
//       description:
//         'Skip the crowded tourist spots and explore these breathtaking destinations that remain off the beaten path. Perfect for travelers seeking authentic experiences.',
//       link: '#',
//       readTime: '9 min read',
//     },
//     {
//       id: 6,
//       title: 'Budget Travel: How to See the World Without Breaking the Bank',
//       imageUrl:
//         'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       category: {
//         name: 'Budget Travel',
//         bgColor: 'bg-orange-100',
//         textColor: 'text-orange-800',
//       },
//       date: 'March 28, 2025',
//       description:
//         'Proven strategies for traveling on a tight budget. Learn about finding cheap flights, affordable accommodations, and free activities in any destination.',
//       link: '#',
//       readTime: '10 min read',
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-50 px-6 lg:px-28 ">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Travel Tips & Inspiration
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Discover new destinations, travel hacks, and cultural insights to
//               fuel your wanderlust.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {articles.map((article) => (
//             <ArticleCard key={article.id} article={article} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TravelInspirationSection;
