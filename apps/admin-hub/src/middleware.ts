import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // RBAC: Only ADMINs can access admin routes
    if (pathname.startsWith('/dashboard/admin') && (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Redirect authenticated users away from login
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
