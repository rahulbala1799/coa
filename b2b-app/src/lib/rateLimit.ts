import { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // 5 attempts per window

export function checkRateLimit(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  const userRateLimit = rateLimit.get(ip);
  
  if (!userRateLimit) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_SIZE });
    return { blocked: false, remainingAttempts: MAX_REQUESTS - 1 };
  }
  
  if (now > userRateLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_SIZE });
    return { blocked: false, remainingAttempts: MAX_REQUESTS - 1 };
  }
  
  if (userRateLimit.count >= MAX_REQUESTS) {
    return { 
      blocked: true, 
      remainingAttempts: 0,
      resetTime: userRateLimit.resetTime 
    };
  }
  
  userRateLimit.count += 1;
  rateLimit.set(ip, userRateLimit);
  
  return { 
    blocked: false, 
    remainingAttempts: MAX_REQUESTS - userRateLimit.count 
  };
} 