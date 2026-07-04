'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/auth/auth-layout'
import { FloatingInput } from '@/components/auth/floating-input'

function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="size-8 text-destructive" />
        </div>
        <p className="text-sm text-muted-foreground">
          Link inválido ou expirado. Solicite um novo link de redefinição.
        </p>
        <Link href="/esqueci-senha" className="text-sm font-medium text-primary hover:underline">
          Solicitar novo link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="size-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Sua senha foi redefinida com sucesso!
        </p>
        <button
          onClick={() => router.push('/login')}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Ir para o login <ArrowRight className="size-4" />
        </button>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 8) { setError('A senha deve ter ao menos 8 caracteres.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao redefinir senha.'); return }
      setSuccess(true)
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FloatingInput
        label="Nova senha (mín. 8 caracteres)"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <FloatingInput
        label="Confirmar nova senha"
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />

      {error && (
        <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {loading ? 'Salvando...' : 'Salvar nova senha'}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}

export default function RedefinirSenhaPage() {
  return (
    <AuthLayout
      title="Criar nova senha"
      subtitle="Escolha uma senha forte para sua conta"
      footer={
        <Link href="/login" className="text-muted-foreground hover:text-foreground text-sm">
          Voltar para o login
        </Link>
      }
    >
      <Suspense fallback={null}>
        <ResetForm />
      </Suspense>
    </AuthLayout>
  )
}
