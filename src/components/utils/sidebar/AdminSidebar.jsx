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
    // { name: 'Blog', icon: <FiEdit />, link: '/blog' },
    { name: 'Information', icon: <FiBarChart2 />, link: '/information' },
    // { name: 'Messages', icon: <FiMail />, link: '/messages' },
    // { name: 'Settings', icon: <FiSettings />, link: '/settings' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">NagarUSA CMS</h1>
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button onClick={logout} className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <FiLogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
