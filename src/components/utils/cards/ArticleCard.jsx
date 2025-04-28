import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-56 object-cover object-top"
      />
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span
            className={`text-xs font-medium ${article.category.bgColor} ${article.category.textColor} rounded-full px-3 py-1`}
          >
            {article.category.name}
          </span>
          <span className="text-gray-500 text-sm ml-3">{article.date}</span>
        </div>
        <h3 className="font-semibold text-xl text-gray-900 mb-3">
          {article.title}
        </h3>
        <p className="text-gray-700 mb-4">{article.description}</p>
        <a
          href={article.link}
          className="text-[#4F46E5] font-medium hover:underline flex items-center"
        >
          Read more <FaArrowRight className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
