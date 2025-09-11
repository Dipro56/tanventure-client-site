'use client';
import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;