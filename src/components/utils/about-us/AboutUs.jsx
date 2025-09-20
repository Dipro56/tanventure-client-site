'use client';

import { useState, useEffect } from 'react';
import informationServices from '@/service/informationService';

export default function AboutUs() {
  const [aboutUs, setAboutUs] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setIsLoading(true);
        const result = await informationServices.getInformations();
        if (result?.statusCode === 200) {
          setAboutUs(result.data?.aboutUs || '');
        } else {
          setError('Failed to load information');
        }
      } catch (err) {
        console.error('Error fetching about us:', err);
        setError('Something went wrong while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 bg-red-50 text-red-600 rounded-lg">{error}</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">About Us</h1>

      <div className="  rounded-2xl p-6">
        {aboutUs ? (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {aboutUs}
          </p>
        ) : (
          <p className="text-gray-500 italic">No information available.</p>
        )}
      </div>
    </section>
  );
}
