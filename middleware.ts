import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

const PUBLIC_PATHS = ['/', '/login', '/registro', '/planos', '/sobre', '/status', '/faq', '/blog', '/carreiras', '/contato', '/base-de-conhecimento', '/termos', '/privacidade', '/lgpd', '/sla']
const ADMIN_PATHS = ['/admin']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const isAdmin = ADMIN_PATHS.some((p) => pathname.startsWith(p))
  const isApiAuth = pathname.startsWith('/api/auth')

  if (isApiAuth) return NextResponse.next()
  if (isPublic) return NextResponse.next()

  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdmin) {
    const role = (req.auth?.user as any)?.role
    if (role !== 'ADMIN' && role !== 'OWNER') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
