import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const packageServices = {};

packageServices.getPackages = async () => {
  try {
    const response = await axios.get(`${baseUrl}/packages/get-packages`);

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

packageServices.getPackageDetailsById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/packages/get-package/${id}`);

    return response.data;
  } catch (error) {
    // Use the custom error handler for consistent logging

    throw new Error('Failed to fetch information. Please try again later.');
  }
};

packageServices.createPackage = async (infoData) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.post(
      `${baseUrl}/packages/create-package`,
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

packageServices.updatePackage = async (id, infoData) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.put(
      `${baseUrl}/packages/update-package/${id}`,
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

packageServices.deletePackage = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    console.log('tokentoken', token);
    const response = await axios.delete(
      `${baseUrl}/packages/delete-package/${id}`,
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

export default packageServices;
