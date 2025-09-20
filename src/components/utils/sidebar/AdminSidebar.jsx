'use client';
import React from 'react';
import {
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiEdit,
  FiPlus,
  FiArrowRight,
  FiMessageSquare,
  FiThumbsUp,
  FiHome,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiGlobe,
  FiBook,
  FiBarChart2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLink,
  FiBookmark,
  FiActivity,
  FiList
} from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar = () => {
  const { sidebarOpen, closeSidebar } = useSidebar();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Admin Dashboard', icon: <FiHome />, link: '/admin-dashboard' },
    { name: 'Packages', icon: <FiPackage />, link: '/packages' },
    { name: 'Booking', icon: <FiBookmark />, link: '/booking' },
    { name: 'Blog', icon: <FiEdit />, link: '/blog' },
    { name: 'Information', icon: <FiBarChart2 />, link: '/information' },
    { name: 'Messages', icon: <FiMail />, link: '/messages' },
    { name: 'Banner', icon: <FiSettings />, link: '/banner' },
    { name: 'Review', icon: <FiMessageSquare />, link: '/review' },
    { name: 'Contact', icon: <FiPhone />, link: '/contact' },
    { name: 'Service', icon: <FiList />, link: '/service' },
    // { name: 'Users', icon: <FiUsers />, link: '/users' },
    // { name: 'Analytics', icon: <FiTrendingUp />, link: '/analytics' },
    // { name: 'Calendar', icon: <FiCalendar />, link: '/calendar' },
    // { name: 'Notifications', icon: <FiBell />, link: '/notifications' },
    // { name: 'Profile', icon: <FiUser />, link: '/profile' },
    // { name: 'Social Media', icon: <FiGlobe />, link: '/social-media' },
    // { name: 'Documents', icon: <FiBook />, link: '/documents' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-blue-600">NagarUSA CMS</h1>
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div className="h-[calc(100vh-8rem)] overflow-y-auto">
        <nav className="mt-4">
          <ul className="space-y-1 px-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link} onClick={closeSidebar}>
                  <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Fixed Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
