import React from "react";
import { FaStar, FaMapPin, FaStarHalf,FaUser  } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <div className="flex items-center mb-3">
        {/* User Avatar with Icon */}
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <FaUser className="text-gray-600 text-xl" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{review.name}</h4>
          <div className="flex items-center">
            {/* Star Rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`text-lg ${
                  index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {review.rating}.0
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-2 italic">{review.text}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{review.date}</span>
        {review.location && (
          <span className="text-sm text-gray-500">{review.location}</span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;