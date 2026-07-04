import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export default {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role ?? 'CLIENT'
        token.plan = (user as any).plan ?? 'Free'
        token.affiliateCode = (user as any).affiliateCode ?? null
        token.twoFactorEnabled = (user as any).twoFactorEnabled ?? false
        token.planExpiresAt = (user as any).planExpiresAt ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
        ;(session.user as any).plan = token.plan
        ;(session.user as any).affiliateCode = token.affiliateCode ?? null
        ;(session.user as any).twoFactorEnabled = token.twoFactorEnabled ?? false
        ;(session.user as any).planExpiresAt = token.planExpiresAt ?? null
      }
      return session
    },
  },
} satisfies NextAuthConfig
