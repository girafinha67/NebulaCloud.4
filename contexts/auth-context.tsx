'use client'

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from 'react'
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import type { UserRole } from '@/types'

interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: UserRole
  plan: string
  affiliateCode?: string | null
  twoFactorEnabled?: boolean
  planExpiresAt?: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const rawRole = (session?.user as any)?.role as string | undefined
  const role: UserRole = rawRole === 'ADMIN' ? 'admin' : rawRole === 'OWNER' ? 'owner' : 'client'

  const user: AuthUser | null = session?.user
    ? {
        id: (session.user as any).id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role,
        plan: (session.user as any).plan ?? 'Free',
        affiliateCode: (session.user as any).affiliateCode ?? null,
        twoFactorEnabled: (session.user as any).twoFactorEnabled ?? false,
        planExpiresAt: (session.user as any).planExpiresAt ?? null,
      }
    : null

  const logout = useCallback(async () => {
    await nextAuthSignOut({ callbackUrl: '/login' })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: role === 'admin' || role === 'owner',
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
