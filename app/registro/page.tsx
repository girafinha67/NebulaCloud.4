'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '@/components/auth/auth-layout'
import { FloatingInput } from '@/components/auth/floating-input'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

export default function RegistroPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) { setError('Você precisa aceitar os termos.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao criar conta.'); return }

      const result = await signIn('credentials', { email, password, redirect: false })
      router.push(result?.error ? '/login' : '/dashboard')
      router.refresh()
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Coloque seu projeto no ar em menos de 60 segundos"
      footer={
        <>
          Já tem uma conta?{' '}
          <Link href="/login" className="text-foreground underline-offset-4 hover:underline">Entrar</Link>
        </>
      }
    >
      <div className="space-y-4">
        <OAuthButtons callbackUrl="/dashboard" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FloatingInput label="Nome completo" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FloatingInput label="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FloatingInput label="Senha (mín. 8 caracteres)" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-4 rounded border-border bg-card accent-[var(--accent)]" />
            <span>
              Concordo com os{' '}
              <Link href="/termos" className="text-foreground underline-offset-4 hover:underline">Termos de Serviço</Link>{' '}
              e a{' '}
              <Link href="/privacidade" className="text-foreground underline-offset-4 hover:underline">Política de Privacidade</Link>.
            </span>
          </label>

          <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60">
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
