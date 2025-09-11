// middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/admin-dashboard',
  '/information',
  '/packages',
  '/api/admin',
];

// Public routes that should redirect to dashboard if already authenticated
const publicRoutes = ['/admin-login'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check for cmsToken cookie
  const cmsToken = request.cookies.get('cmsToken');

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is a public route that should redirect if authenticated
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user has token and is trying to access login page, redirect to dashboard
  if (cmsToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url));
  }

  // If it's not a protected route, continue without checking
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // If no token found on protected route, redirect to login
  if (!cmsToken) {
    const loginUrl = new URL('/admin-login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow access to protected route
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/information/:path*',
    '/packages/:path*',
    '/api/admin/:path*',
    '/admin-login/:path*', // Add login page to matcher
  ],
};
