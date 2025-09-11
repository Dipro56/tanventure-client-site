import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const informationServices = {};

informationServices.getInformations = async () => {
  try {
    const response = await axios.get(`${baseUrl}/info/get-info`);

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

informationServices.updateInformations = async (infoData) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.post(`${baseUrl}/info/create-info`, infoData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

export default informationServices;
