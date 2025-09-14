import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const reviewServices = {};

// Get all reviews
reviewServices.getAllReviews = async () => {
  try {
    const response = await axios.get(`${baseUrl}/review/get-all-reviews`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reviews. Please try again later.');
  }
};

// Create a new review
reviewServices.createReview = async (reviewData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/review/create-review`,
      reviewData
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to create review. Please try again later.');
  }
};

// Delete a review by ID
reviewServices.deleteReview = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.delete(
      `${baseUrl}/review/delete-review/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to delete review. Please try again later.');
  }
};

export default reviewServices;
