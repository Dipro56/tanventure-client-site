import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const serviceServices = {};

// Get all services (public)
serviceServices.getAllServices = async () => {
  try {
    const response = await axios.get(`${baseUrl}/service/get-all-services`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to fetch services. Please try again later.');
  } finally {
    console.log('Get all services operation completed');
  }
};

// Create a new service (admin only)
serviceServices.createService = async (serviceData) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.post(
      `${baseUrl}/service/create-service`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response?.data?.errors) {
      throw new Error(error.response.data.errors.join(', '));
    }
    throw new Error('Failed to create service. Please try again later.');
  } finally {
    console.log('Create service operation completed');
  }
};

// Update a service by ID (admin only)
serviceServices.updateService = async (id, serviceData) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.put(
      `${baseUrl}/service/update-service/${id}`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response?.data?.errors) {
      throw new Error(error.response.data.errors.join(', '));
    }
    throw new Error('Failed to update service. Please try again later.');
  } finally {
    console.log('Update service operation completed');
  }
};

// Delete a service by ID (admin only)
serviceServices.deleteService = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.delete(
      `${baseUrl}/service/delete-service/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to delete service. Please try again later.');
  } finally {
    console.log('Delete service operation completed');
  }
};

export default serviceServices;
