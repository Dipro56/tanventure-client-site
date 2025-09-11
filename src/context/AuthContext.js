// contexts/AuthContext.js
'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = Cookies.get('cmsToken');

        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    Cookies.remove('cmsToken');
    setIsAuthenticated(false);
    router.push('/admin-login');
  };

  const value = {
    loading,
    isAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
