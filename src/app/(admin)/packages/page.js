// app/tour-packages/page.js
'use client';

import packageServices from '@/service/packageService';
import { useState, useEffect } from 'react';

export default function TourPackages() {
  // State for modal visibility and mode (add/edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchPackages();
  }, []);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const result = await packageServices.getPackages();
      console.log('package data', result?.data?.packages);
      setPackages(result?.data?.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      showToast('Failed to fetch packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  // State for form inputs
  const [formData, setFormData] = useState({
    packagename: '',
    location: '',
    price: '',
    discount: '',
    duration: '',
    description: '',
    avatar: null,
    avatarPreview: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: file,
          avatarPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('packagename', formData.packagename);
      formDataToSend.append('location', formData.location.toLowerCase().trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discount', formData.discount || '0');
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('description', formData.description);

      // Append avatar file if exists
      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      if (modalMode === 'add') {
        // Create new package
        const result = await packageServices.createPackage(formDataToSend);
        console.log('create package result', result);

        if (result.statusCode === 200) {
          // Show success message
          showToast('Package created successfully!');
          // Refresh packages list
          fetchPackages();
          // Reset form and close modal
          resetForm();
          setIsModalOpen(false);
        }
      } else if (modalMode === 'edit' && editingPackageId) {
        // Update existing package
        const result = await packageServices.updatePackage(
          editingPackageId,
          formDataToSend
        );

        if (result.statusCode === 200) {
          // Show success message
          showToast('Package updated successfully!');
          // Refresh packages list
          fetchPackages();
          // Reset form and close modal
          resetForm();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error submitting package:', error);
      showToast('Failed to save package', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle package deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      // Call delete service
      const result = await packageServices.deletePackage(id);
      console.log('delete package result', result);
      if (result.statusCode === 200) {
        // Show success message
        showToast('Package deleted successfully!');
        // Update the local state
        setPackages(packages.filter((pkg) => pkg._id !== id));
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      showToast('Failed to delete package', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (id) => {
    const packageToEdit = packages.find((pkg) => pkg._id === id);
    if (packageToEdit) {
      setFormData({
        packagename: packageToEdit.packagename,
        location: packageToEdit.location,
        price: packageToEdit.price,
        discount: packageToEdit.discount,
        duration: packageToEdit.duration,
        description: packageToEdit.description,
        avatar: null,
        avatarPreview: packageToEdit.avatar,
      });
      setModalMode('edit');
      setEditingPackageId(id);
      setIsModalOpen(true);
    }
  };

  // Reset form and close modal
  const resetForm = () => {
    setFormData({
      packagename: '',
      location: '',
      price: '',
      discount: '',
      duration: '',
      description: '',
      avatar: null,
      avatarPreview: '',
    });
    setModalMode('add');
    setEditingPackageId(null);
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white font-medium transition-opacity duration-300 ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Tour Packages Management
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Easily manage your tour offerings
          </p>
        </div>

        {/* Packages Table Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Tour Packages
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
              disabled={loading}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              {loading ? 'Loading...' : 'Add Package'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading packages...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No packages yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by adding your first tour package.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                Add Package
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Package Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packages.map((pkg) => (
                    <tr
                      key={pkg._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={pkg.avatar}
                          alt={pkg.packagename}
                          className="h-14 w-20 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pkg.packagename}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {pkg.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                        ${pkg.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${pkg.discount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(pkg._id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-200"
                          disabled={loading}
                        >
                          <svg
                            className="w-5 h-5 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          onClick={() => handleDelete(pkg._id)}
                          disabled={loading}
                        >
                          <svg
                            className="w-5 h-5 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <h2 className="text-2xl font-bold">
                {modalMode === 'add'
                  ? 'Add New Tour Package'
                  : 'Edit Tour Package'}
              </h2>
              <p className="text-blue-100 mt-1">
                {modalMode === 'add'
                  ? 'Fill in the details for your new tour package'
                  : 'Update the details for your tour package'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="packagename"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Package Name
                </label>
                <input
                  type="text"
                  id="packagename"
                  name="packagename"
                  value={formData.packagename}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter package name"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter destination location"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="999.99"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Discount ($)
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    min="0"
                    step="0.01"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="50.00"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5 days, 4 nights"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter package description"
                  disabled={loading}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Package Image
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={loading}
                />
                {formData.avatarPreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                    <img
                      src={formData.avatarPreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading
                    ? 'Processing...'
                    : modalMode === 'add'
                    ? 'Add Package'
                    : 'Update Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
