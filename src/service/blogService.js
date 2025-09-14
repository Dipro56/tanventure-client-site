import { baseUrl } from '@/utils/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const blogServices = {};

// Get all blogs
blogServices.getAllBlogs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/blog/get-blogs`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch blogs. Please try again later.');
  }
};

// Get all blogs by id
blogServices.getAllBlogsById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/blog/get-blogs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch blogs. Please try again later.');
  }
};

// Create a new blog
blogServices.createBlog = async (blogData) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.post(`${baseUrl}/blog/create-blog`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create blog. Please try again later.');
  }
};

// Update a blog by ID
blogServices.updateBlog = async (id, blogData) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.put(
      `${baseUrl}/blog/update-blog/${id}`,
      blogData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update blog. Please try again later.');
  }
};

// Delete a blog by ID
blogServices.deleteBlog = async (id) => {
  try {
    const token = Cookies.get('cmsToken');
    const response = await axios.delete(`${baseUrl}/blog/delete-blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete blog. Please try again later.');
  }
};

export default blogServices;
