'use client'

import { useState } from 'react'
import { Send, LifeBuoy, Plus, MessageSquare, Book, Zap, X } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { faqs } from '@/lib/site'
import { cn } from '@/lib/utils'
import { useState as useLocalState } from 'react'

const ticketColor: Record<string, string> = {
  aberto: 'bg-accent/15 text-accent',
  respondido: 'bg-amber-500/10 text-amber-400',
  resolvido: 'bg-emerald-500/10 text-emerald-400',
  fechado: 'bg-muted text-muted-foreground',
}

type Msg = { from: 'me' | 'agent'; text: string }

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(v => !v)} className="flex w-full items-center justify-between py-4 text-left text-sm">
        <span>{q}</span>
        <span className={cn('ml-2 shrink-0 text-muted-foreground transition-transform', open && 'rotate-45')}>+</span>
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground">{a}</p>}
    </div>
  )
}

export default function SuportePage() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'agent', text: 'Olá! Sou a Nova, da equipe Nebula. Como posso ajudar?' },
  ])
  const [input, setInput] = useState('')
  const [tickets] = useState([
    { id: '#4821', subject: 'Bot reiniciando sozinho', status: 'aberto', last: '5 min' },
    { id: '#4810', subject: 'Dúvida sobre deploy via Git', status: 'respondido', last: '2 h' },
    { id: '#4799', subject: 'Upgrade de RAM no VPS', status: 'resolvido', last: 'ontem' },
  ])
  const [showNewTicket, setShowNewTicket] = useState(false)

  function send() {
    if (!input.trim()) return
    setMessages((m) => [...m, { from: 'me', text: input.trim() }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'agent', text: 'Perfeito! Já estou cuidando disso para você.' }])
    }, 900)
  }

  return (
    <AppShell title="Suporte">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, title: 'Resposta média', desc: 'Menos de 4 minutos' },
            { icon: MessageSquare, title: 'Chat ao vivo', desc: 'Online 24/7' },
            { icon: Book, title: 'Base de conhecimento', desc: '+200 artigos' },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-3xl border border-border glass p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><c.icon className="size-5" /></span>
                <div>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Seus tickets</h2>
                <button onClick={() => setShowNewTicket(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  <Plus className="size-3.5" /> Novo
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {tickets.map((t) => (
                  <button key={t.id} className="flex w-full items-center justify-between rounded-2xl border border-border bg-card/30 p-4 text-left transition-colors hover:bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium">{t.subject}</p>
                      <p className="text-xs text-muted-foreground">{t.id} · {t.last}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs ${ticketColor[t.status]}`}>{t.status}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-border glass-strong shadow-soft">
              <div className="flex items-center gap-3 border-b border-border p-4">
                <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><LifeBuoy className="size-5" /></span>
                <div>
                  <p className="text-sm font-medium">Nova · Suporte Nebula</p>
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400" /> Online agora</p>
                </div>
              </div>
              <div className="scroll-slim flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[80%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed', m.from === 'me' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-secondary text-foreground')}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/40 px-2 py-1.5">
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Escreva uma mensagem..." className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground" />
                  <button onClick={send} className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105" aria-label="Enviar">
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Perguntas frequentes</h2>
            <div className="mt-3">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
