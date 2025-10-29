/**
 * Next.js Middleware
 * Runs before every request for authentication and security
 * Note: Using mock authentication with localStorage
 */

import { NextRequest, NextResponse } from 'next/server';

// Security headers configuration
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
};

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/contact',
  '/products',
  '/resources',
  '/partners',
  '/apply',
  '/track-application',
  '/support',
  '/grievance',
  '/nodal-officer',
  '/branches',
  '/downloads',
  '/report-fraud',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/mock-login',
  '/api/health',
  '/api/subscribe',
  '/api/contact',
  '/calculate-emi',
  '/careers',
  '/blog',
  '/privacy',
  '/terms',
  '/admin',
  '/user',
  '/underwriter',
  '/collection-agent',
  '/finance-manager',
  '/risk-analyst',
  '/support-agent'
];

// API routes with specific rate limits
const apiRateLimits: Record<string, { windowMs: number; maxRequests: number }> = {
  '/api/auth': { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  '/api/payments': { windowMs: 60 * 60 * 1000, maxRequests: 10 },
  '/api/ai': { windowMs: 60 * 60 * 1000, maxRequests: 20 },
  '/api': { windowMs: 15 * 60 * 1000, maxRequests: 100 } // Default for all API routes
};

// Role-based route access
const roleBasedRoutes: Record<string, string[]> = {
  '/admin': ['SUPER_ADMIN', 'ADMIN'],
  '/underwriter': ['UNDERWRITER', 'LOAN_OFFICER', 'SUPER_ADMIN'],
  '/collection-agent': ['COLLECTION_AGENT', 'SUPER_ADMIN'],
  '/finance-manager': ['FINANCE_MANAGER', 'SUPER_ADMIN'],
  '/risk-analyst': ['RISK_ANALYST', 'SUPER_ADMIN'],
  '/support-agent': ['SUPPORT_AGENT', 'SUPER_ADMIN'],
  '/user': ['USER', 'PREMIUM_USER', 'SUPER_ADMIN']
};


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add security headers to all responses
  const headers = new Headers(request.headers);
  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next({ headers });
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  // Skip auth for public routes
  if (isPublicRoute) {
    return NextResponse.next({ headers });
  }

  // Check authentication - using cookies instead of NextAuth
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // If not authenticated, redirect to login
  if (!token || !userRole) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Find matching role requirement
  let requiredRoles: string[] | undefined;
  for (const [route, roles] of Object.entries(roleBasedRoutes)) {
    if (pathname.startsWith(route)) {
      requiredRoles = roles;
      break;
    }
  }

  // If route has role requirements, check if user has access
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const dashboards: Record<string, string> = {
      USER: '/user',
      ADMIN: '/admin',
      SUPER_ADMIN: '/admin',
      UNDERWRITER: '/underwriter',
      COLLECTION_AGENT: '/collection-agent',
      FINANCE_MANAGER: '/finance-manager',
      RISK_ANALYST: '/risk-analyst',
      SUPPORT_AGENT: '/support-agent'
    };

    const dashboard = dashboards[userRole] || '/';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Add user info to headers for downstream use
  if (userRole) {
    headers.set('X-User-Role', userRole);
  }

  return NextResponse.next({ headers });
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};