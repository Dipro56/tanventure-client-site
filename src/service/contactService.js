import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const contactServices = {};

// Get all contact messages (admin only)
contactServices.getAllContacts = async () => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.get(`${baseUrl}/contact/get-all-contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(
      'Failed to fetch contact messages. Please try again later.'
    );
  } finally {
    // Any cleanup or final actions can go here
    console.log('Get all contacts operation completed');
  }
};

// Create a new contact message (public)
contactServices.createContact = async (contactData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/contact/create-contact`,
      contactData
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to send message. Please try again later.');
  } finally {
    // Any cleanup or final actions can go here
    console.log('Create contact operation completed');
  }
};

// Delete a contact message by ID (admin only)
contactServices.deleteContact = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.delete(
      `${baseUrl}/contact/delete-contact/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(
      'Failed to delete contact message. Please try again later.'
    );
  } finally {
    // Any cleanup or final actions can go here
    console.log('Delete contact operation completed');
  }
};

export default contactServices;
