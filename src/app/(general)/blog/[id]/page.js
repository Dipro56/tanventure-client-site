// app/blog/[id]/page.js
import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Sample blog data (in a real app, this would come from an API or database)
const blogPosts = {
  1: {
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
    readTime: '5 min read',
    content: `
      <p>Packing for long-term travel requires a different approach than packing for a short vacation. You'll need to balance versatility with minimalism, ensuring you have everything you need without overpacking.</p>
      
      <h2>1. Choose the Right Luggage</h2>
      <p>Select a durable, lightweight suitcase or backpack that meets airline carry-on requirements if possible. This will save you time at airports and money on baggage fees.</p>
      
      <h2>2. Use Packing Cubes</h2>
      <p>Packing cubes are a traveler's best friend. They help compress your clothes and keep everything organized, making it easy to find what you need without unpacking everything.</p>
      
      <h2>3. Versatile Clothing is Key</h2>
      <p>Choose clothing items that can be mixed and matched to create multiple outfits. Neutral colors work best, and items that can be layered will prepare you for various climates.</p>
      
      <p>Remember, the goal is to pack light while still being prepared for your adventure. Happy travels!</p>
    `,
  },
  2: {
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
    readTime: '7 min read',
    content: `
      <p>In today's world, smartphone cameras are powerful enough to capture professional-quality travel photos. With a few techniques, you can take your travel photography to the next level.</p>
      
      <h2>1. Master the Rule of Thirds</h2>
      <p>Enable the grid lines on your camera app and position key elements along these lines or at their intersections. This creates a more balanced and engaging composition.</p>
      
      <h2>2. Golden Hour is Your Best Friend</h2>
      <p>The hour after sunrise and before sunset provides the most flattering natural light. The soft, warm glow will make your photos stand out.</p>
      
      <h2>3. Clean Your Lens</h2>
      <p>It sounds simple, but a clean lens makes a huge difference. Smartphone lenses collect fingerprints and smudges that can ruin your photos.</p>
      
      <p>With practice and these tips, you'll be capturing stunning travel memories in no time!</p>
    `,
  },
  3: {
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
    readTime: '8 min read',
    content: `
      <p>Street food is often the heart and soul of a destination's culinary scene. It offers an authentic taste of local culture at affordable prices.</p>
      
      <h2>1. Research Before You Go</h2>
      <p>Look up popular street food dishes in your destination. Food blogs and travel forums are great resources for finding the best spots.</p>
      
      <h2>2. Follow the Locals</h2>
      <p>The longest lines are usually a good sign. If locals are willing to wait, the food is probably worth it.</p>
      
      <h2>3. Safety First</h2>
      <p>Look for vendors who practice good hygiene. Food should be cooked fresh in front of you, and the cooking area should be clean.</p>
      
      <p>Exploring street food is one of the best ways to immerse yourself in a new culture. Bon appétit!</p>
    `,
  },
  4: {
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
    readTime: '6 min read',
    content: `
      <p>Sustainable travel is no longer a niche concept but a necessity in our changing world. By making conscious choices, we can explore the world while minimizing our environmental impact.</p>
      
      <h2>1. Choose Eco-Friendly Accommodations</h2>
      <p>Look for hotels and lodges with sustainability certifications. These establishments typically use renewable energy, reduce water consumption, and support local communities.</p>
      
      <h2>2. Reduce Plastic Waste</h2>
      <p>Bring a reusable water bottle, shopping bag, and utensils. Many destinations now have water refill stations, making it easier to avoid single-use plastics.</p>
      
      <h2>3. Support Local Economies</h2>
      <p>Eat at local restaurants, hire local guides, and purchase souvenirs from local artisans. This ensures your travel spending benefits the community directly.</p>
      
      <p>Every small action contributes to a more sustainable future for travel. Let's explore responsibly!</p>
    `,
  },
  5: {
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
    readTime: '9 min read',
    content: `
      <p>While popular destinations have their appeal, there's something magical about discovering places that haven't yet been overrun by tourists. These hidden gems offer authentic experiences and unforgettable memories.</p>
      
      <h2>1. The Azores, Portugal</h2>
      <p>This archipelago in the mid-Atlantic offers stunning volcanic landscapes, lush greenery, and thermal springs. It's a paradise for nature lovers and adventure seekers.</p>
      
      <h2>2. Albania's Riviera</h2>
      <p>With crystal-clear waters and beautiful beaches at a fraction of the cost of neighboring Greece and Croatia, Albania's coastline is Europe's best-kept secret.</p>
      
      <h2>3. Georgia (the country)</h2>
      <p>From the Caucasus Mountains to ancient monasteries and a unique wine culture, Georgia offers diverse experiences that few other destinations can match.</p>
      
      <p>Venture off the beaten path in 2025 and create memories that will last a lifetime in these incredible destinations.</p>
    `,
  },
  6: {
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
    readTime: '10 min read',
    content: `
      <p>Traveling doesn't have to be expensive. With some planning and smart strategies, you can explore the world without draining your savings account.</p>
      
      <h2>1. Be Flexible with Your Travel Dates</h2>
      <p>Flight prices can vary significantly depending on the day of the week and time of year. Use fare comparison tools and be open to traveling during shoulder seasons for the best deals.</p>
      
      <h2>2. Consider Alternative Accommodations</h2>
      <p>Beyond hotels, consider hostels, guesthouses, vacation rentals, or even house sitting. These options often provide more authentic experiences at lower prices.</p>
      
      <h2>3. Eat Like a Local</h2>
      <p>Skip tourist restaurants and eat where locals do. Street food and market stalls often offer the most authentic and affordable culinary experiences.</p>
      
      <p>With these budget travel tips, you'll be able to stretch your travel funds further and enjoy more adventures around the world.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((id) => ({
    id: id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts[params.id];

  if (!post) {
    return {
      title: 'Post Not Found | Travel Blog',
    };
  }

  return {
    title: `${post.title} | Travel Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}

export default function BlogPost({ params }) {
  const post = blogPosts[params.id];

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/?scrollTo=blog"
              className="text-primary font-medium flex items-center hover:underline"
            >
              <i className="ri-arrow-left-line mr-2"></i> Back to Articles
            </Link>
          </div>
        </nav>

        {/* Blog Content */}
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${post.category.bgColor} ${post.category.textColor} mb-4`}
              >
                {post.category.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">{post.description}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(blogPosts)
                  .filter((p) => p.id !== post.id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                    >
                      <h3 className="font-bold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Read article
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
