// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken } from './utils';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Retrieve the auth token from cookies
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from the root login page (/)
  if (await validateToken(token) && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Redirect authenticated users away from the /auth directory
  if (await validateToken(token) && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Redirect unauthenticated users away from the /home directory
  if (!token && pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow all other requests to continue
  return NextResponse.next();
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/', '/auth/:path*', '/home/:path*'], // Add '/' to protect the root path
};
