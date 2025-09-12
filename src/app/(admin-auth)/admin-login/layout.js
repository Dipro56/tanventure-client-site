// app/admin/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Nagar USA',
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
        <div className="admin-container">{children}</div>
      </body>
    </html>
  );
}
