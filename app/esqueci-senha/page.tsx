'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { AuthLayout } from '@/components/auth/auth-layout'
import { FloatingInput } from '@/components/auth/floating-input'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao enviar e-mail.'); return }
      setSent(true)
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <AuthLayout
        title="E-mail enviado!"
        subtitle="Verifique sua caixa de entrada e pasta de spam"
        footer={
          <Link href="/login" className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
            <ArrowLeft className="size-3.5" /> Voltar para o login
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Se o endereço <strong className="text-foreground">{email}</strong> estiver cadastrado na Nebula, você receberá as instruções para redefinir sua senha em instantes.
          </p>
          <p className="text-xs text-muted-foreground">O link expira em 1 hora.</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Informe seu e-mail e enviaremos as instruções"
      footer={
        <Link href="/login" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Voltar para o login
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FloatingInput
          label="E-mail cadastrado"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? 'Enviando...' : 'Enviar instruções'}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>
    </AuthLayout>
  )
}
