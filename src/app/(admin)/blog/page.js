'use client';

import blogServices from '@/service/blogService';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    readTime: '',
    blogImage: null,
  });
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  // Show toast for 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: '', type: '', visible: false }), 3000);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogServices.getAllBlogs();
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error(err.message);
      showToast('Failed to fetch blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('content', formData.content);
      data.append('category', formData.category);
      data.append('readTime', formData.readTime);
      if (formData.blogImage) {
        data.append('blogImage', formData.blogImage);
      }

      if (isEditing) {
        await blogServices.updateBlog(editingId, data);
        showToast('Blog updated successfully!', 'success');
      } else {
        await blogServices.createBlog(data);
        showToast('Blog created successfully!', 'success');
      }

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error(err.message);
      showToast(`Failed to ${isEditing ? 'update' : 'create'} blog`, 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      readTime: '',
      blogImage: null,
    });
    setImagePreview(null);
    setIsCreating(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      category: blog.category,
      readTime: blog.readTime,
      blogImage: null,
    });
    setImagePreview(blog.image || null);
    setIsEditing(true);
    setEditingId(blog._id);
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogServices.deleteBlog(id);
      showToast('Blog deleted successfully!', 'success');
      fetchBlogs();
    } catch (err) {
      console.error(err.message);
      showToast('Failed to delete blog', 'error');
    }
  };

  const toggleExpand = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  // Function to safely render HTML content
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast notification - Fixed positioning issue */}
      {toast.visible && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg text-white flex items-center ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
          <button
            onClick={() => {
              if (isCreating) {
                resetForm();
              } else {
                setIsCreating(true);
                setIsEditing(false);
                setEditingId(null);
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            {isCreating ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Blog
              </>
            )}
          </button>
        </div>

        {/* Blog creation/edition form */}
        {isCreating && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditing ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g., Technology, Lifestyle"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Write a brief description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (HTML supported)
                </label>
                <textarea
                  name="content"
                  placeholder="Write the main content of your blog. You can use HTML tags like <p>, <h2>, etc."
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  You can use HTML tags for formatting. Example:
                  &lt;p&gt;Paragraph&lt;/p&gt;, &lt;h2&gt;Heading&lt;/h2&gt;,
                  etc.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Read Time (minutes)
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    placeholder="e.g., 5 min read"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Image {isEditing && '(Leave empty to keep current)'}
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-600 cursor-pointer hover:bg-indigo-50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="mt-1 text-sm">Choose Image</span>
                      <input
                        type="file"
                        name="blogImage"
                        onChange={handleChange}
                        className="hidden"
                        required={!isEditing}
                      />
                    </label>
                    {imagePreview && (
                      <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {isEditing ? 'Update Blog' : 'Publish Blog'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog list */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Published Blogs
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-gray-600">
                No blogs yet. Create your first blog post!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start">
                    {blog.image && (
                      <div className="md:w-48 md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="rounded-lg w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {blog.title}
                          </h3>
                          <p className="mt-1 text-gray-600">
                            {blog.description}
                          </p>

                          {/* HTML Content with Read More toggle */}
                          <div className="mt-3 prose prose-sm max-w-none">
                            {expandedBlogs[blog._id] ? (
                              <div
                                dangerouslySetInnerHTML={renderHTML(
                                  blog.content
                                )}
                                className="blog-content"
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={renderHTML(
                                  blog.content.length > 200
                                    ? blog.content.substring(0, 200) + '...'
                                    : blog.content
                                )}
                                className="blog-content"
                              />
                            )}

                            {blog.content.length > 200 && (
                              <button
                                onClick={() => toggleExpand(blog._id)}
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2"
                              >
                                {expandedBlogs[blog._id]
                                  ? 'Read Less'
                                  : 'Read More'}
                              </button>
                            )}
                          </div>

                          <div className="mt-3 flex items-center space-x-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {blog.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {blog.readTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                            title="Edit blog"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete blog"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Style for the rendered HTML content */
        .blog-content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .blog-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .blog-content ul,
        .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .blog-content li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
