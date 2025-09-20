import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Header from '@/components/utils/header/Header';
import Footer from '@/components/utils/footer/Footer';
import WhatsAppButton from '@/components/utils/whatsapp-button/WhatsAppButton';

export const metadata = {
  title: 'Nagar USA',
  description: 'Nagar USA your trusted partner for tour booking in USA',
  icons: {
    icon: ['/logo.svg'],
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
