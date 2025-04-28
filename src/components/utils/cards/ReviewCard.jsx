import React from "react";
import { FaStar, FaMapPin, FaStarHalf } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-start mb-4">
        <img
          src={review.imageUrl}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900">{review.name}</h4>
          <div className="flex items-center mt-1">
            <div className="flex">
              {/* {[...Array(review?.rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400" />
              ))}
              {review.rating % 1 !== 0 && (
                <FaStarHalf className="text-yellow-400" />
              )} */}
            </div>
            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{review.text}</p>
      <div className="flex items-center text-sm text-[#4F46E5]">
        <FaMapPin className="mr-1" />
        <span>{review.location}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
