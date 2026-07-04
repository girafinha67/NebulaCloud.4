'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '@/components/auth/auth-layout'
import { FloatingInput } from '@/components/auth/floating-input'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('E-mail ou senha inválidos.')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <OAuthButtons callbackUrl={callbackUrl} />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FloatingInput label="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FloatingInput label="Senha" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="size-4 rounded border-border bg-card accent-[var(--accent)]" />
            Lembrar de mim
          </label>
          <Link href="/esqueci-senha" className="text-muted-foreground hover:text-foreground">Esqueceu a senha?</Link>
        </div>

        <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60">
          {loading ? 'Entrando...' : 'Entrar'}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta para gerenciar seus servidores"
      footer={
        <>
          Não tem uma conta?{' '}
          <Link href="/registro" className="text-foreground underline-offset-4 hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}
