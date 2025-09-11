import { baseUrl } from '@/utils/config';
import axios from 'axios';

const authServices = {};

authServices.login = async (loginData) => {
  try {
    // Make the POST request for login
    const response = await axios.post(`${baseUrl}/auth/login`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    // Log the error for debugging
    console.error('Login Error:', error.response || error.message);

    // Return a user-friendly error message
    throw new Error(
      error.response?.data?.message || 'Login failed. Please try again.'
    );
  }
};

export default authServices;
