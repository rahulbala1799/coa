import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || 'fallback-secret-key'
      ) as jwt.JwtPayload;

      // Check if it's a refresh token
      if (decoded.type !== 'refresh') {
        return NextResponse.json({ error: 'Invalid token type' }, { status: 401 });
      }

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }

      // Generate new access token
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          type: 'access'
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '15m' }
      );

      // Generate new refresh token
      const newRefreshToken = jwt.sign(
        {
          id: user.id,
          type: 'refresh'
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '7d' }
      );

      // Create response with new access token
      const response = NextResponse.json({
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

      // Set new refresh token in cookie
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      return response;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Error refreshing token' }, { status: 500 });
  }
} 