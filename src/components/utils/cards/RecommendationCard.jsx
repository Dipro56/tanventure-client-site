import React from "react";
import { FaStar, FaMapPin, FaStarHalf } from "react-icons/fa";

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        <img
          src={recommendation.imageUrl}
          alt={recommendation.title}
          className="w-full md:w-32 h-32 object-cover object-top"
        />
        <div className="p-4 flex-1">
          <h4 className="font-medium text-gray-900 mb-1">
            {recommendation.title}
          </h4>
          <div className="flex items-center mb-2">
            <FaMapPin className="text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">
              {recommendation.location}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(Math.floor(recommendation.rating))].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {recommendation.rating % 1 !== 0 && (
                <FaStarHalf className="text-yellow-400" />
              )}
              <span className="ml-1 text-gray-700">
                {recommendation.rating}
              </span>
            </div>
            <p className="text-[#4F46E5] font-bold">{recommendation.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
