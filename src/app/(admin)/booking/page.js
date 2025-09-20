'use client';

import bookingServices from '@/service/bookingService';
import React, { useEffect, useState } from 'react';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [expandedMessages, setExpandedMessages] = useState({});
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    booking: null,
  });

  // Show toast for 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: '', type: '', visible: false }), 3000);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingServices.getAllBookings();
      if (res.data?.length) {
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error(err.message);
      showToast('Failed to fetch bookings', 'error');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openDeleteModal = (booking) => {
    setDeleteModal({ isOpen: true, booking });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, booking: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.booking) return;

    try {
      await bookingServices.deleteBooking(deleteModal.booking._id);
      showToast('Booking deleted successfully!', 'success');
      fetchBookings();
    } catch (err) {
      console.error(err.message);
      showToast('Failed to delete booking', 'error');
    } finally {
      closeDeleteModal();
    }
  };

  const toggleExpand = (bookingId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
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

  // Format booking date
  const formatBookingDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
                Delete Booking
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete the booking for{' '}
                <span className="font-semibold text-gray-900">
                  {deleteModal.booking?.name}
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
          <h1 className="text-3xl font-bold text-gray-800">Tour Bookings</h1>
          <button
            onClick={fetchBookings}
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

        {/* Bookings list */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Customer Bookings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : bookings.length === 0 ? (
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-600">
                No bookings yet. Bookings will appear here when customers make
                reservations.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {booking.name}
                          </h3>
                          <div className="flex flex-col mt-1 space-y-1">
                            <span className="text-sm text-gray-600">
                              Email: {booking.email}
                            </span>
                            <span className="text-sm text-gray-600">
                              Phone: {booking.phone}
                            </span>
                            <span className="text-sm text-gray-600">
                              Package: {booking.packageName}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Booking Details:
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Travel Date:</span>{' '}
                              {formatBookingDate(booking.date)}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Duration:</span>{' '}
                              {booking.days} day{booking.days !== 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Package ID:</span>{' '}
                              {booking.packageId}
                            </p>
                          </div>
                        </div>

                        {booking.message && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Message:
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700">
                                {expandedMessages[booking._id]
                                  ? booking.message
                                  : booking.message.length > 200
                                  ? `${booking.message.substring(0, 200)}...`
                                  : booking.message}
                              </p>
                              {booking.message.length > 200 && (
                                <button
                                  onClick={() => toggleExpand(booking._id)}
                                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2"
                                >
                                  {expandedMessages[booking._id]
                                    ? 'Show Less'
                                    : 'Read More'}
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => openDeleteModal(booking)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete booking"
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

export default AdminBookingsPage;
