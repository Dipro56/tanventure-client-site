'use client';
import authServices from '@/service/authService';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchLogin = async (authData) => {
    try {
      const result = await authServices.login(authData);
      console.log('fetchLogin', result);

      if (result?.data?.data?.accessToken) {
        const token = result.data.data.accessToken;

        Cookies.set('cmsToken', token);
        router.push('/admin-dashboard');

        console.log('Token set in cookies via js-cookie');
      } else {
        console.warn('Login failed or token missing');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let authData = {
      username: formData?.username,
      password: formData?.password,
    };

    fetchLogin(authData);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
