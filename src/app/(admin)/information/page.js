'use client';

import { useState, useEffect } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiMessageSquare,
  FiLink,
  FiInfo,
} from 'react-icons/fi';
import informationServices from '@/service/informationService';

export default function InformationForm() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    whatsAppNumber: '',
    facebookLink: '',
    ticktokLink: '',
    instaLink: '',
    aboutUs: '',
  });

  const [fetchedInfo, setFetchedInfo] = useState({
    email: '',
    phone: '',
    address: '',
    whatsAppNumber: '',
    facebookLink: '',
    ticktokLink: '',
    instaLink: '',
    aboutUs: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch information when component mounts
  useEffect(() => {
    fetchInformation();
  }, []);

  const fetchInformation = async () => {
    try {
      setIsLoading(true);
      const result = await informationServices.getInformations();
      console.log('Fetched Information:', result?.statusCode, result?.data);

      // Update form data with fetched information
      if (result?.statusCode === 200) {
        const infoData = result.data;
        setFetchedInfo({
          email: infoData.email || '',
          phone: infoData.phone || '',
          address: infoData.address || '',
          whatsAppNumber: infoData.whatsAppNumber || '',
          facebookLink: infoData.facebookLink || '',
          ticktokLink: infoData.ticktokLink || '',
          instaLink: infoData.instaLink || '',
          aboutUs: infoData.aboutUs || '',
        });

        // Also set form data for editing
        setFormData({
          email: infoData.email || '',
          phone: infoData.phone || '',
          address: infoData.address || '',
          whatsAppNumber: infoData.whatsAppNumber || '',
          facebookLink: infoData.facebookLink || '',
          ticktokLink: infoData.ticktokLink || '',
          instaLink: infoData.instaLink || '',
          aboutUs: infoData.aboutUs || '',
        });
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreateInfo = async (infoData) => {
    try {
      setSaveStatus('saving');
      const result = await informationServices.updateInformations(infoData);
      console.log('Update Result:', result);
      setSaveStatus('success');

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
      fetchInformation();
    } catch (error) {
      console.error('Error updating information:', error);
      setSaveStatus('error');

      // Clear error message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    await fetchCreateInfo(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-4">
      {/* Edit Form */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Edit Company Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'example@example.com',
              icon: <FiMail className="text-gray-400" />,
            },
            {
              id: 'phone',
              label: 'Phone',
              type: 'tel',
              placeholder: '+1 (555) 123-4567',
              icon: <FiPhone className="text-gray-400" />,
            },
            {
              id: 'whatsAppNumber',
              label: 'WhatsApp Number',
              type: 'tel',
              placeholder: '+1 (555) 123-4567',
              icon: <FiMessageSquare className="text-gray-400" />,
            },
            {
              id: 'address',
              label: 'Address',
              type: 'text',
              placeholder: '123 Main St, City, Country',
              icon: <FiMapPin className="text-gray-400" />,
            },
            {
              id: 'facebookLink',
              label: 'Facebook',
              type: 'url',
              placeholder: 'https://facebook.com/yourpage',
              icon: <FiFacebook className="text-gray-400" />,
            },
            {
              id: 'ticktokLink',
              label: 'TikTok',
              type: 'url',
              placeholder: 'https://tiktok.com/@yourhandle',
              icon: <FiLink className="text-gray-400" />,
            },
            {
              id: 'instaLink',
              label: 'Instagram',
              type: 'url',
              placeholder: 'https://instagram.com/yourprofile',
              icon: <FiInstagram className="text-gray-400" />,
            },
          ].map(({ id, label, type, placeholder, icon }) => (
            <div key={id} className="space-y-2">
              <label
                htmlFor={id}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                {icon}
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ))}

          {/* About Us Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="aboutUs"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FiInfo className="text-gray-400" />
              About Us
            </label>
            <textarea
              id="aboutUs"
              name="aboutUs"
              placeholder="Write about your company here..."
              value={formData.aboutUs}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
            <p className="text-sm text-gray-500">
              {formData.aboutUs.length}/2000 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Information'}
          </button>

          {saveStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              Information saved successfully!
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              Error saving information. Please try again.
            </div>
          )}
        </form>
      </div>

      {/* Preview Card */}
      <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Current Company Information
        </h2>

        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Contact Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiPhone className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">
                    {fetchedInfo.phone || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiMessageSquare className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="text-gray-800">
                    {fetchedInfo.whatsAppNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiMail className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">
                    {fetchedInfo.email || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiMapPin className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800">
                    {fetchedInfo.address || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Social Media</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiFacebook className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Facebook</p>
                  <p className="text-gray-800 break-all">
                    {fetchedInfo.facebookLink || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <FiInstagram className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p className="text-gray-800 break-all">
                    {fetchedInfo.instaLink || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                  <FiLink className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">TikTok</p>
                  <p className="text-gray-800 break-all">
                    {fetchedInfo.ticktokLink || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          {fetchedInfo.aboutUs && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">About Us</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {fetchedInfo.aboutUs}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
