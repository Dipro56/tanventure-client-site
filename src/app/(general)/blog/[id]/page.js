import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import blogServices from '@/service/blogService';

export default async function BlogPost({ params }) {
  let post;

  try {
    const res = await blogServices.getAllBlogsById(params.id);
    post = res.data.blog; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
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
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime || '5 min read'}</span>
            </div>
          </div>

          {post.image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">{post.description}</p>
            {/* Render full content if available */}
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-gray-600">Full content coming soon...</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
