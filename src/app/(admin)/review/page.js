'use client';

import reviewServices from '@/service/reviewService';
import React, { useEffect, useState } from 'react';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [expandedReviews, setExpandedReviews] = useState({});
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    review: null,
  });

  // Show toast for 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: '', type: '', visible: false }), 3000);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await reviewServices.getAllReviews();
      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err.message);
      showToast('Failed to fetch reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openDeleteModal = (review) => {
    setDeleteModal({ isOpen: true, review });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, review: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.review) return;

    try {
      await reviewServices.deleteReview(deleteModal.review._id);
      showToast('Review deleted successfully!', 'success');
      fetchReviews();
    } catch (err) {
      console.error(err.message);
      showToast('Failed to delete review', 'error');
    } finally {
      closeDeleteModal();
    }
  };

  const toggleExpand = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast notification */}
      {toast.visible && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg text-white flex items-center ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform scale-100 opacity-100 transition-all duration-300">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
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
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Review
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete the review from{' '}
                <span className="font-semibold text-gray-900">
                  {deleteModal.review?.name}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Reviews Management
          </h1>
          <button
            onClick={fetchReviews}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Reviews list */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Customer Reviews
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : reviews.length === 0 ? (
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="mt-4 text-gray-600">
                No reviews yet. Reviews will appear here when customers submit
                them.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {review.name}
                          </h3>
                          <div className="flex items-center mt-1">
                            {renderStars(review.stars)}
                            <span className="ml-2 text-sm text-gray-500">
                              {review.stars}.0 rating
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="text-gray-700">
                          {expandedReviews[review._id]
                            ? review.description
                            : review.description.length > 150
                            ? `${review.description.substring(0, 150)}...`
                            : review.description}
                        </p>
                        {review.description.length > 150 && (
                          <button
                            onClick={() => toggleExpand(review._id)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2"
                          >
                            {expandedReviews[review._id]
                              ? 'Show Less'
                              : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0 ">
                      <button
                        onClick={() => openDeleteModal(review)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete review"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        {reviews.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-indigo-600">
                {reviews.length}
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-green-600">
                {reviews.filter((r) => r.stars >= 4).length}
              </div>
              <div className="text-sm text-gray-600">
                Positive Reviews (4-5 stars)
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {reviews.filter((r) => r.stars === 3).length}
              </div>
              <div className="text-sm text-gray-600">
                Neutral Reviews (3 stars)
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-red-600">
                {reviews.filter((r) => r.stars <= 2).length}
              </div>
              <div className="text-sm text-gray-600">
                Negative Reviews (1-2 stars)
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminReviewsPage;
