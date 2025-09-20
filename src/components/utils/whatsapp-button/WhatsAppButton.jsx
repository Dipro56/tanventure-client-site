'use client';
import informationServices from '@/service/informationService';
import { useEffect, useState } from 'react';
// components/WhatsAppButton.js
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '8801717680510';
  const message = 'Hello, I would like to chat with you!';

  const [loading, setLoading] = useState(true);

  const [fetchedInfo, setFetchedInfo] = useState({
    phone: '',
  });

  const fetchInformation = async () => {
    try {
      setLoading(true);
      const result = await informationServices.getInformations();
      console.log('Fetched Information:', result?.statusCode, result?.data);

      // Update form data with fetched information
      if (result?.statusCode === 200) {
        let infoData = result.data;
        setFetchedInfo({
          phone: infoData.whatsAppNumber || '',

          // youtube: infoData.youtubeLink || '',
        });
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  const handleClick = () => {
    // Open WhatsApp with the specified number and message
    window.open(
      `https://wa.me/${fetchedInfo?.phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (fetchedInfo?.phone) {
    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-green-600 hover:shadow-xl z-50 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
        <span className="absolute bottom-12 right-0 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </button>
    );
  } else {
    return null;
  }
};

export default WhatsAppButton;
