// components/ArticleCard.js
import Link from 'next/link';
import Image from 'next/image';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.category.bgColor} ${article.category.textColor}`}>
            {article.category.name}
          </span>
          <span className="text-gray-500 text-sm">{article.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{article.date}</span>
          <Link 
            href={`/blog/${article.id}`}
            className="text-primary font-medium flex items-center hover:underline"
          >
            Read more <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;