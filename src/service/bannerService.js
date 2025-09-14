import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const bannerServices = {};

bannerServices.getBannerDetails = async () => {
  try {
    const response = await axios.get(`${baseUrl}/banner/get-banner-details`);

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

bannerServices.createBanner = async (bannerData) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.post(
      `${baseUrl}/banner/create-banner`,
      bannerData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

bannerServices.updateBanner = async (id, infoData) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.put(
      `${baseUrl}/banner/update-banner/${id}`,
      infoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

export default bannerServices;
