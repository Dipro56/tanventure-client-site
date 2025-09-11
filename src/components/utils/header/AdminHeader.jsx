'use client';
import { useState } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import React from 'react';
import Link from 'next/link';
import AdminSidebar from '../sidebar/AdminSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';


const AdminHeader = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth();

  const { sidebarOpen, closeSidebar,openSidebar } = useSidebar();

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={openSidebar}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          >
            <FiMenu size={20} />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FiUser size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                Admin User
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                {/* <Link href="/profile">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </div>
                </Link> */}
                <div className="border-t border-gray-100"></div>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
