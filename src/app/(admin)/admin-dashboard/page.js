'use client';

import { useState, useEffect } from 'react';
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
import AdminHeader from '@/components/utils/header/AdminHeader';
import AdminSidebar from '@/components/utils/sidebar/AdminSidebar';
import packageServices from '@/service/packageService';
import informationServices from '@/service/informationService';

export default function DashboardSummary() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  const [fetchedInfo, setFetchedInfo] = useState({
    email: '',
    phone: '',
    address: '',
    facebook: '',
    tiktok: '',
    instagram: '',
    youtube: '',
  });

  const fetchInformation = async () => {
    try {
      setLoading(true);
      const result = await informationServices.getInformations();
      console.log('Fetched Information:', result?.statusCode, result?.data);

      // Update form data with fetched information
      if (result?.statusCode === 200) {
        let infoData = result.data;
        setFetchedInfo({
          email: infoData.email || '',
          phone: infoData.phone || '',
          address: infoData.address || '',
          facebook: infoData.facebookLink || '',
          tiktok: infoData.ticktokLink || '',
          instagram: infoData.instaLink || '',
          // youtube: infoData.youtubeLink || '',
        });
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const result = await packageServices.getPackages();
      console.log('package data', result?.data?.packages);
      setPackages(result?.data?.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      showToast('Failed to fetch packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Simulate data loading
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 800);
    // return () => clearTimeout(timer);
    fetchPackages();
    fetchInformation();
  }, []);

  // Company information data
  const companyInfo = {
    name: 'Wanderlust Travels',
    phone: '+1 (555) 123-4567',
    email: 'info@wanderlusttravels.com',
    address: '123 Adventure Lane, Travel City, TC 12345',
    socialMedia: {
      facebook: 'facebook.com/wanderlusttravels',
      instagram: 'instagram.com/wanderlusttravels',
      youtube: 'youtube.com/wanderlusttravels',
      tiktok: 'tiktok.com/@wanderlusttravels',
    },
  };

  // Sample summary data
  const stats = [
    {
      title: 'Active Packages',
      value: loading ? '...' : packages.length.toString(),
      icon: <FiPackage className="text-blue-500 text-xl" />,
      link: '/packages',
    },
    // {
    //   title: 'Total Bookings',
    //   value: '142',
    //   change: '+18%',
    //   icon: <FiCalendar className="text-green-500 text-xl" />,
    //   link: '/bookings',
    // },
    // {
    //   title: 'Revenue',
    //   value: '$24,751',
    //   change: '+22%',
    //   icon: <FiDollarSign className="text-purple-500 text-xl" />,
    //   link: '/finance',
    // },
    // {
    //   title: 'New Customers',
    //   value: '42',
    //   change: '+5%',
    //   icon: <FiUsers className="text-orange-500 text-xl" />,
    //   link: '/customers',
    // },
  ];

  const recentPackages = [
    { id: 1, name: 'Tropical Bali Escape', bookings: 24, status: 'Active' },
    { id: 2, name: 'European Adventure Tour', bookings: 18, status: 'Active' },
    {
      id: 3,
      name: 'Japanese Cultural Experience',
      bookings: 12,
      status: 'Active',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'Alex Johnson',
      package: 'Bali Escape',
      date: '15 Jun 2023',
      status: 'Confirmed',
    },
    {
      id: 2,
      customer: 'Mia Wong',
      package: 'European Tour',
      date: '18 Jun 2023',
      status: 'Pending',
    },
    {
      id: 3,
      customer: 'Samuel Lee',
      package: 'Japan Experience',
      date: '20 Jun 2023',
      status: 'Confirmed',
    },
  ];

  const quickActions = [
    { title: 'Add New Package', icon: <FiPlus />, link: '/packages' },
    // { title: 'Manage Bookings', icon: <FiCalendar />, link: '/bookings' },
    // { title: 'View Reports', icon: <FiTrendingUp />, link: '/reports' },
    // { title: 'Write Blog Post', icon: <FiEdit />, link: '/blog/new' },
  ];

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, link: '/dashboard' },
    { name: 'Packages', icon: <FiPackage />, link: '/packages' },
    { name: 'Bookings', icon: <FiCalendar />, link: '/bookings' },
    { name: 'Customers', icon: <FiUsers />, link: '/customers' },
    { name: 'Blog', icon: <FiEdit />, link: '/blog' },
    { name: 'Information', icon: <FiBarChart2 />, link: '/information' },
    { name: 'Destinations', icon: <FiGlobe />, link: '/destinations' },
    { name: 'Messages', icon: <FiMail />, link: '/messages' },
    { name: 'Settings', icon: <FiSettings />, link: '/settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome message */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, Admin!
        </h2>
        <p className="text-gray-600">
          Here is what is happening with your travel agency today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link href={stat.link} key={index}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">{stat.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Packages & Bookings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Information Summary Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Company Information
            </h2>

            <div className="grid grid-cols-1 w-full gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-medium text-gray-700 mb-4">
                  Contact Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiPhone className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{fetchedInfo.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiMail className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{fetchedInfo.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiMapPin className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{fetchedInfo.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Social Media</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiFacebook className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Facebook</p>
                      <p>{fetchedInfo.facebook || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <FiInstagram className="text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instagram</p>
                      <p>{fetchedInfo.instagram || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                      <FiLink className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">TikTok</p>
                      <p>{fetchedInfo.tiktok || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/information">
              <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center cursor-pointer">
                <FiEdit className="mr-2" /> Edit Information
              </button>
            </Link>
          </div>

          {/* Recent Packages */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Packages
              </h2>
              <Link
                href="/packages"
                className="text-blue-500 flex items-center text-sm"
              >
                View all <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex justify-between items-center p-3 border-b border-gray-100"
                >
                  <div>
                    <h3 className="font-medium">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">
                      {pkg.bookings} bookings
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {pkg.status}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/packages/new">
              <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
                <FiPlus className="mr-2" /> Add New Package
              </button>
            </Link>
          </div> */}
        </div>

        {/* Quick Actions & Recommendations */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link href={action.link} key={index}>
                  <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                      {action.icon}
                    </div>
                    <span className="font-medium">{action.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Recommendations
            </h2>

            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                <div className="flex items-start">
                  <FiThumbsUp className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Summer Promotion</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Create a special summer promotion to boost bookings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                <div className="flex items-start">
                  <FiMessageSquare className="text-yellow-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Customer Feedback</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      5 customers requested more family-friendly packages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Blog Summary */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Blog Summary
              </h2>
              <Link
                href="/blog"
                className="text-blue-500 flex items-center text-sm"
              >
                View all <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-md">
                <h3 className="font-medium">
                  10 Hidden Gems in Southeast Asia
                </h3>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    Published: Jun 12
                  </span>
                  <span className="text-sm text-gray-500">1,243 views</span>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-md">
                <h3 className="font-medium">Traveling on a Budget</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">Draft</span>
                  <span className="text-sm text-blue-500">
                    Continue writing
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    // <div className="flex h-screen bg-gray-50">
    //   {/* Sidebar */}
    //   {/* <div
    //     className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
    //       sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    //     }`}
    //   >
    //     <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
    //       <h1 className="text-xl font-bold text-blue-600">Travel Agency CMS</h1>
    //       <button
    //         onClick={() => setSidebarOpen(false)}
    //         className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
    //       >
    //         <FiX size={20} />
    //       </button>
    //     </div>
    //     <nav className="mt-8">
    //       <ul className="space-y-2 px-4">
    //         {navItems.map((item, index) => (
    //           <li key={index}>
    //             <Link href={item.link}>
    //               <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
    //                 <span className="mr-3">{item.icon}</span>
    //                 <span>{item.name}</span>
    //               </div>
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //     <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
    //       <button className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
    //         <FiLogOut className="mr-3" />
    //         <span>Logout</span>
    //       </button>
    //     </div>
    //   </div> */}
    //   {/* <AdminSidebar /> */}

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     {/* Header */}
    //     {/* <header className="bg-white shadow-sm z-10">
    //       <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
    //         <div className="flex items-center">
    //           <button
    //             onClick={() => setSidebarOpen(true)}
    //             className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
    //           >
    //             <FiMenu size={20} />
    //           </button>
    //           <div className="ml-4 lg:ml-0">
    //             <h1 className="text-xl font-semibold text-gray-800">
    //               Dashboard Overview
    //             </h1>
    //           </div>
    //         </div>

    //         <div className="flex items-center space-x-4">
    //           <div className="relative">
    //             <button
    //               onClick={() => setUserMenuOpen(!userMenuOpen)}
    //               className="flex items-center space-x-2"
    //             >
    //               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
    //                 <FiUser size={16} />
    //               </div>
    //               <span className="hidden md:block text-sm font-medium text-gray-700">
    //                 Admin User
    //               </span>
    //             </button>

    //             {userMenuOpen && (
    //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
    //                 <Link href="/profile">
    //                   <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    //                     Your Profile
    //                   </div>
    //                 </Link>
    //                 <Link href="/settings">
    //                   <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    //                     Settings
    //                   </div>
    //                 </Link>
    //                 <div className="border-t border-gray-100"></div>
    //                 <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
    //                   Sign out
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </header> */}

    //     {/* <AdminHeader /> */}

    //     {/* Main content */}
    //     <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
    //       <div className="max-w-7xl mx-auto">
    //         {/* Welcome message */}
    //         <div className="mb-8">
    //           <h2 className="text-2xl font-bold text-gray-800">
    //             Welcome back, Admin!
    //           </h2>
    //           <p className="text-gray-600">
    //             Here is what is happening with your travel agency today.
    //           </p>
    //         </div>

    //         {/* Stats Cards */}
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    //           {stats.map((stat, index) => (
    //             <Link href={stat.link} key={index}>
    //               <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
    //                 <div className="flex justify-between items-start">
    //                   <div>
    //                     <p className="text-sm text-gray-500">{stat.title}</p>
    //                     <p className="text-2xl font-bold text-gray-800 mt-1">
    //                       {stat.value}
    //                     </p>
    //                     <p
    //                       className={`text-sm mt-1 ${
    //                         stat.change.includes('+')
    //                           ? 'text-green-500'
    //                           : 'text-red-500'
    //                       }`}
    //                     >
    //                       {stat.change} from last month
    //                     </p>
    //                   </div>
    //                   <div className="p-2 bg-gray-100 rounded-lg">
    //                     {stat.icon}
    //                   </div>
    //                 </div>
    //               </div>
    //             </Link>
    //           ))}
    //         </div>

    //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //           {/* Recent Packages & Bookings */}
    //           <div className="lg:col-span-2 space-y-6">
    //             {/* Information Summary Section */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <h2 className="text-xl font-semibold text-gray-800 mb-6">
    //                 Company Information
    //               </h2>

    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                 {/* Contact Information */}
    //                 <div>
    //                   <h3 className="font-medium text-gray-700 mb-4">
    //                     Contact Details
    //                   </h3>
    //                   <div className="space-y-3">
    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
    //                         <FiPhone className="text-blue-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">Phone</p>
    //                         <p>{companyInfo.phone}</p>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
    //                         <FiMail className="text-blue-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">Email</p>
    //                         <p>{companyInfo.email}</p>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
    //                         <FiMapPin className="text-blue-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">Address</p>
    //                         <p>{companyInfo.address}</p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* Social Media Links */}
    //                 <div>
    //                   <h3 className="font-medium text-gray-700 mb-4">
    //                     Social Media
    //                   </h3>
    //                   <div className="space-y-3">
    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
    //                         <FiFacebook className="text-blue-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">Facebook</p>
    //                         <p>{companyInfo.socialMedia.facebook}</p>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
    //                         <FiInstagram className="text-pink-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">Instagram</p>
    //                         <p>{companyInfo.socialMedia.instagram}</p>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
    //                         <FiYoutube className="text-red-500" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">YouTube</p>
    //                         <p>{companyInfo.socialMedia.youtube}</p>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center">
    //                       <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
    //                         <FiLink className="text-white" />
    //                       </div>
    //                       <div>
    //                         <p className="text-sm text-gray-500">TikTok</p>
    //                         <p>{companyInfo.socialMedia.tiktok}</p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
    //                 <FiEdit className="mr-2" /> Edit Information
    //               </button>
    //             </div>

    //             {/* Recent Packages */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <div className="flex justify-between items-center mb-6">
    //                 <h2 className="text-xl font-semibold text-gray-800">
    //                   Recent Packages
    //                 </h2>
    //                 <Link
    //                   href="/packages"
    //                   className="text-blue-500 flex items-center text-sm"
    //                 >
    //                   View all <FiArrowRight className="ml-1" />
    //                 </Link>
    //               </div>

    //               <div className="space-y-4">
    //                 {recentPackages.map((pkg) => (
    //                   <div
    //                     key={pkg.id}
    //                     className="flex justify-between items-center p-3 border-b border-gray-100"
    //                   >
    //                     <div>
    //                       <h3 className="font-medium">{pkg.name}</h3>
    //                       <p className="text-sm text-gray-500">
    //                         {pkg.bookings} bookings
    //                       </p>
    //                     </div>
    //                     <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
    //                       {pkg.status}
    //                     </span>
    //                   </div>
    //                 ))}
    //               </div>

    //               <Link href="/packages/new">
    //                 <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
    //                   <FiPlus className="mr-2" /> Add New Package
    //                 </button>
    //               </Link>
    //             </div>

    //             {/* Recent Bookings */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <div className="flex justify-between items-center mb-6">
    //                 <h2 className="text-xl font-semibold text-gray-800">
    //                   Recent Bookings
    //                 </h2>
    //                 <Link
    //                   href="/bookings"
    //                   className="text-blue-500 flex items-center text-sm"
    //                 >
    //                   View all <FiArrowRight className="ml-1" />
    //                 </Link>
    //               </div>

    //               <div className="space-y-4">
    //                 {recentBookings.map((booking) => (
    //                   <div
    //                     key={booking.id}
    //                     className="flex justify-between items-center p-3 border-b border-gray-100"
    //                   >
    //                     <div>
    //                       <h3 className="font-medium">{booking.customer}</h3>
    //                       <p className="text-sm text-gray-500">
    //                         {booking.package} • {booking.date}
    //                       </p>
    //                     </div>
    //                     <span
    //                       className={`px-3 py-1 text-xs rounded-full ${
    //                         booking.status === 'Confirmed'
    //                           ? 'bg-green-100 text-green-800'
    //                           : 'bg-yellow-100 text-yellow-800'
    //                       }`}
    //                     >
    //                       {booking.status}
    //                     </span>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Quick Actions & Recommendations */}
    //           <div className="space-y-6">
    //             {/* Quick Actions */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <h2 className="text-xl font-semibold text-gray-800 mb-6">
    //                 Quick Actions
    //               </h2>

    //               <div className="space-y-3">
    //                 {quickActions.map((action, index) => (
    //                   <Link href={action.link} key={index}>
    //                     <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
    //                       <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
    //                         {action.icon}
    //                       </div>
    //                       <span className="font-medium">{action.title}</span>
    //                     </div>
    //                   </Link>
    //                 ))}
    //               </div>
    //             </div>

    //             {/* Recommendations */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <h2 className="text-xl font-semibold text-gray-800 mb-6">
    //                 Recommendations
    //               </h2>

    //               <div className="space-y-4">
    //                 <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
    //                   <div className="flex items-start">
    //                     <FiThumbsUp className="text-blue-500 mt-1 mr-3" />
    //                     <div>
    //                       <h3 className="font-medium">Summer Promotion</h3>
    //                       <p className="text-sm text-gray-600 mt-1">
    //                         Create a special summer promotion to boost bookings.
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
    //                   <div className="flex items-start">
    //                     <FiMessageSquare className="text-yellow-500 mt-1 mr-3" />
    //                     <div>
    //                       <h3 className="font-medium">Customer Feedback</h3>
    //                       <p className="text-sm text-gray-600 mt-1">
    //                         5 customers requested more family-friendly packages.
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Blog Summary */}
    //             <div className="bg-white rounded-lg shadow p-6">
    //               <div className="flex justify-between items-center mb-6">
    //                 <h2 className="text-xl font-semibold text-gray-800">
    //                   Blog Summary
    //                 </h2>
    //                 <Link
    //                   href="/blog"
    //                   className="text-blue-500 flex items-center text-sm"
    //                 >
    //                   View all <FiArrowRight className="ml-1" />
    //                 </Link>
    //               </div>

    //               <div className="space-y-4">
    //                 <div className="p-3 border border-gray-200 rounded-md">
    //                   <h3 className="font-medium">
    //                     10 Hidden Gems in Southeast Asia
    //                   </h3>
    //                   <div className="flex justify-between mt-2">
    //                     <span className="text-sm text-gray-500">
    //                       Published: Jun 12
    //                     </span>
    //                     <span className="text-sm text-gray-500">
    //                       1,243 views
    //                     </span>
    //                   </div>
    //                 </div>

    //                 <div className="p-3 border border-gray-200 rounded-md">
    //                   <h3 className="font-medium">Traveling on a Budget</h3>
    //                   <div className="flex justify-between mt-2">
    //                     <span className="text-sm text-gray-500">Draft</span>
    //                     <span className="text-sm text-blue-500">
    //                       Continue writing
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>

    //   {/* Overlay for mobile sidebar */}
    //   {sidebarOpen && (
    //     <div
    //       className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
    //       onClick={() => setSidebarOpen(false)}
    //     ></div>
    //   )}
    // </div>
  );
}
