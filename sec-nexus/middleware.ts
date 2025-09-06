import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HARD_CODED_ADMIN } from '@/lib/config/admin';

const isPublicRoute = createRouteMatcher([
  '/',
  '/events',
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/users-sync",
  '/api/uploadthing'
]);

export default clerkMiddleware(async (auth, request) => {
  console.log('Middleware processing request:', request.url);

  if (isPublicRoute(request)) {
    console.log('Public route detected, allowing access');
    return; // Don't require authentication for public routes
  }

  // Protect all other routes
  await auth.protect();

  // Check if this is an admin route
  if (request.url.includes('/admin')) {
    console.log('Admin route detected:', request.url);
    try {
      const authResult = await auth();

      console.log('User ID from auth:', authResult.userId);
      console.log('Hardcoded admin ID:', HARD_CODED_ADMIN.clerkId);

      if (!authResult.userId) {
        console.log('No user ID, redirecting to sign-in');
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      // Allow access if this is the hardcoded admin
      if (authResult.userId === HARD_CODED_ADMIN.clerkId) {
        console.log('Admin access granted for user:', authResult.userId);
        return; // Allow access for hardcoded admin
      }

      console.log('Admin access denied for user:', authResult.userId);
      // For other users, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
      console.error('RBAC middleware error:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  console.log('Request allowed to proceed');
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/admin',
    '/admin/dashboard'
  ],
};
