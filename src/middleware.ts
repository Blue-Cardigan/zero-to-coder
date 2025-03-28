import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures that environment variables are accessible
// and handles any global request modifications
export function middleware(request: NextRequest) {
  // You can modify response headers, redirect users, etc.
  // For now, we're just passing the request through
  return NextResponse.next();
} 