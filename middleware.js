import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/login(.*)',
  '/signup(.*)',
  '/home(.*)',
  '/careerplanning(.*)',
  '/job-board(.*)',
  '/learn(.*)',
  '/api/gemini/(.*)',
  '/students(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  // Always serve favicon.ico from local folder icon (PNG), not .ico
  if (request.nextUrl.pathname === '/favicon.ico') {
    const url = new URL('/favicon-32x32.png?v=3', request.url);
    const res = NextResponse.redirect(url, { status: 308 });
    // Explicitly disable caching to force Chrome to refetch the PNG
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};