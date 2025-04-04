import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export type JWTPayload = {
  id: string;
  email: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
};

export async function authenticateRequest(request: NextRequest) {
  try {
    // Get the token from the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authenticated: false, message: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return { authenticated: false, message: 'Invalid token format' };
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback-secret-key'
      ) as JWTPayload;

      // Check if it's an access token
      if (decoded.type !== 'access') {
        return { authenticated: false, message: 'Invalid token type' };
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return { authenticated: false, message: 'User not found' };
      }

      return { authenticated: true, user };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { 
          authenticated: false, 
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        };
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        return { authenticated: false, message: 'Invalid token' };
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return { authenticated: false, message: 'Authentication failed' };
  }
}

export function isAdmin(user: any) {
  return user.role === 'ADMIN';
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Middleware to protect admin routes
export async function adminGuard(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  
  if (!authResult.authenticated) {
    return unauthorized();
  }
  
  if (!isAdmin(authResult.user)) {
    return forbidden();
  }
  
  return null; // Continue to the route handler
}

// Helper to get user from request
export async function getUser(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  return authResult.authenticated ? authResult.user : null;
} 