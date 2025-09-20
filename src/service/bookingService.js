import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const bookingServices = {};

// Get all bookings (admin only)
bookingServices.getAllBookings = async () => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.get(`${baseUrl}/booking/get-all-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to fetch bookings. Please try again later.');
  } finally {
    console.log('Get all bookings operation completed');
  }
};

// Create a new booking (public)
bookingServices.createBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/booking/create-booking`,
      bookingData
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to create booking. Please try again later.');
  } finally {
    console.log('Create booking operation completed');
  }
};

// Delete a booking by ID (admin only)
bookingServices.deleteBooking = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.delete(
      `${baseUrl}/booking/delete-booking/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to delete booking. Please try again later.');
  } finally {
    console.log('Delete booking operation completed');
  }
};

export default bookingServices;
