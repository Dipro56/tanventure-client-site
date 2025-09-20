// app/admin/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import AdminHeader from '@/components/utils/header/AdminHeader';
import AdminSidebar from '@/components/utils/sidebar/AdminSidebar';
import { SidebarProvider } from '@/context/SidebarContext';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Nagar USA | Service',
  description: 'Nagar USA your trusted partner for tour booking in USA',
  icons: {
    icon: ['/logo.svg'],
  },
};
export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            <div className="flex h-screen bg-gray-50">
              <AdminSidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
