'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  FiImage,
  FiType,
  FiFileText,
  FiUpload,
  FiTrash2,
} from 'react-icons/fi';
import bannerServices from '@/service/bannerService';

export default function BannerForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
  });

  const [fetchedBanner, setFetchedBanner] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Fetch banner data when component mounts
  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      setIsLoading(true);
      const result = await bannerServices.getBannerDetails();
      console.log('Fetched Banner:', result);

      if (result?.statusCode === 200) {
        const bannerData = result.data.bannerDetails;
        setFetchedBanner({
          title: bannerData.bannerTitle || '',
          description: bannerData.bannerDescription || '',
          imageUrl: bannerData.bannerImage || '',
        });

        console.log('bannerData', bannerData);

        // Also set form data with fetched values
        setFormData((prev) => ({
          ...prev,
          title: bannerData.title || '',
          description: bannerData.description || '',
          imagePreview: bannerData.imageUrl || '', // Set image preview from fetched data
        }));
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdateBanner = async (bannerData) => {
    try {
      setSaveStatus('saving');

      console.log('handleCreateOrUpdateBanner', bannerData);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', bannerData.title);
      formData.append('description', bannerData.description);

      if (imageFile) {
        formData.append('bannerImage', imageFile);
      }

      const result = await bannerServices.createBanner(formData);
      console.log('Banner Update Result:', result);

      setSaveStatus('success');

      // Refresh the banner data
      fetchBanner();
    } catch (error) {
      console.error('Error updating banner:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      imagePreview: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateOrUpdateBanner(formData);
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
      {/* Edit Banner Form */}
      <Card className="w-full rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-800">
            Edit Banner Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Field */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FiType className="text-gray-400" />
                Banner Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter banner title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FiFileText className="text-gray-400" />
                Banner Description
              </Label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter banner description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Image Upload Field */}
            <div className="grid gap-2">
              <Label htmlFor="image" className="flex items-center gap-2">
                <FiImage className="text-gray-400" />
                Banner Image
              </Label>

              {formData.imagePreview ? (
                <div className="relative">
                  <div className="w-full h-48 relative rounded-lg overflow-hidden border">
                    <Image
                      src={formData.imagePreview}
                      alt="Banner preview"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 mb-2">
                    Drag & drop an image here or click to browse
                  </p>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Choose Image
                  </Label>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Banner'}
            </Button>

            {saveStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                Banner saved successfully!
              </div>
            )}

            {saveStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                Error saving banner. Please try again.
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Current Banner Preview */}
      <Card className="bg-white rounded-lg shadow p-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Current Banner Preview
        </h2>

        <div className="space-y-6">
          {/* Banner Image Preview */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Banner Image</h3>
            {fetchedBanner.imageUrl ? (
              <div className="w-full h-48 relative rounded-lg overflow-hidden border">
                <Image
                  src={fetchedBanner.imageUrl}
                  alt="Current banner"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <FiImage className="text-gray-400" size={32} />
                <span className="ml-2 text-gray-500">No image uploaded</span>
              </div>
            )}
          </div>

          {/* Banner Title Preview */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Banner Title</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold">
                {fetchedBanner.title || 'No title set'}
              </p>
            </div>
          </div>

          {/* Banner Description Preview */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">
              Banner Description
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">
                {fetchedBanner.description || 'No description set'}
              </p>
            </div>
          </div>

          {/* Live Preview */}
        </div>
      </Card>
    </div>
  );
}
