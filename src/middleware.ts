import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures that environment variables are accessible
// and handles any global request modifications
export function middleware(request: NextRequest) {
  // You can modify response headers, redirect users, etc.
  // Add CORS and debugging headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname === '/tag-cloud') {
    
    // Log the request for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] Processing request to: ${request.nextUrl.pathname}`);
    }
    
    // Create a response with CORS headers
    const response = NextResponse.next();
    
    // Add headers that might help with Supabase connection issues
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
  
  // For other routes, just pass through
  return NextResponse.next();
} 