'use client'

import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setFeedback(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setFeedback(data.error ?? 'Erro ao enviar a mensagem. Tente novamente.')
        return
      }

      setStatus('success')
      setFeedback(data.message ?? 'Mensagem enviada com sucesso!')
      form.reset()
    } catch {
      setStatus('error')
      setFeedback('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nome</label>
          <input
            name="name"
            required
            minLength={2}
            className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">E-mail</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60"
            placeholder="seu@email.com"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Assunto</label>
        <select
          name="subject"
          required
          className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60"
        >
          <option>Suporte técnico</option>
          <option>Financeiro / Faturamento</option>
          <option>Parceria comercial</option>
          <option>Impressa</option>
          <option>Outro</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Mensagem</label>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none"
          placeholder="Como podemos ajudar?"
        />
      </div>

      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {status === 'success' ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{feedback}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === 'loading' && <Loader2 className="size-4 animate-spin" />}
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
