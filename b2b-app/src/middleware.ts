import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Allow all API routes to be accessed directly, except admin routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      return validateAuth(request);
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return validateAuth(request);
  }

  return NextResponse.next();
}

function validateAuth(request: NextRequest) {
  // Check for access token in Authorization header
  const authHeader = request.headers.get('Authorization');
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  // Check for refresh token in cookies
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify access token if present
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || 'fallback-secret-key');
      if (typeof decoded === 'object' && decoded.type === 'access') {
        return NextResponse.next();
      }
    }

    // Verify refresh token if present
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'fallback-secret-key');
      if (typeof decoded === 'object' && decoded.type === 'refresh') {
        return NextResponse.next();
      }
    }

    // If neither token is valid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  } catch (error) {
    // If token verification fails, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
}; 