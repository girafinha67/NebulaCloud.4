import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import authConfig from '@/auth.config'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    ...authConfig.providers,
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null

        if (user.status === 'SUSPENDED') return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          plan: user.plan,
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role ?? 'CLIENT'
        token.plan = (user as any).plan ?? 'Free'
        token.affiliateCode = (user as any).affiliateCode ?? null
        token.twoFactorEnabled = (user as any).twoFactorEnabled ?? false
        token.planExpiresAt = (user as any).planExpiresAt ?? null
      }
      // On OAuth sign-in, fetch fresh role/plan from DB
      if (account && account.provider !== 'credentials') {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email! },
          select: { id: true, role: true, plan: true, affiliateCode: true, twoFactorEnabled: true, planExpiresAt: true },
        })
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
          token.plan = dbUser.plan
          token.affiliateCode = dbUser.affiliateCode ?? null
          token.twoFactorEnabled = dbUser.twoFactorEnabled ?? false
          token.planExpiresAt = dbUser.planExpiresAt ? dbUser.planExpiresAt.toISOString() : null
        }
      }
      return token
    },
    async signIn({ user, account }) {
      // Auto-create affiliateCode for OAuth users
      if (account?.provider !== 'credentials' && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
          select: { affiliateCode: true },
        })
        if (existing && !existing.affiliateCode) {
          const code = 'NEBULA-' + Math.random().toString(36).slice(2, 8).toUpperCase()
          await prisma.user.update({
            where: { email: user.email },
            data: { affiliateCode: code },
          })
        }
      }
      return true
    },
  },
})
