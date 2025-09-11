'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLink,
} from 'react-icons/fi';
import informationServices from '@/service/informationService';

export default function InformationForm() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    facebookLink: '',
    ticktokLink: '',
    instaLink: '',
    youtube: '',
  });

  const [fetchedInfo, setFetchedInfo] = useState({
    email: '',
    phone: '',
    address: '',
    facebook: '',
    tiktok: '',
    instagram: '',
    youtube: '',
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
        let infoData = result.data;
        setFetchedInfo({
          email: infoData.email || '',
          phone: infoData.phone || '',
          address: infoData.address || '',
          facebook: infoData.facebookLink || '',
          tiktok: infoData.ticktokLink || '',
          instagram: infoData.instaLink || '',
          // youtube: infoData.youtubeLink || '',
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
    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
      <Card className="w-full rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-800">
            Edit Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              <div key={id} className="grid gap-2">
                <Label htmlFor={id} className="flex items-center gap-2">
                  {icon}
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  value={formData[id]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Information'}
            </Button>

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
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow p-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Current Company Information
        </h2>

        <div className="grid grid-cols-1 w-full gap-6">
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
                  <p>{fetchedInfo.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiMail className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{fetchedInfo.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiMapPin className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{fetchedInfo.address || 'Not provided'}</p>
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
                  <p>{fetchedInfo.facebook || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <FiInstagram className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p>{fetchedInfo.instagram || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                  <FiLink className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">TikTok</p>
                  <p>{fetchedInfo.tiktok || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
