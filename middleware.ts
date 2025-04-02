import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/canteens',
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Get token from header
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication token is required' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Add user info to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(decoded))

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid authentication token' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/cart/:path*',
    '/admin/:path*',
  ],
} 