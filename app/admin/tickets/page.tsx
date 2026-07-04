'use client'

import { Search, MessageSquare, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

const tickets = [
  { id: '#4821', user: 'Lucas Andrade', subject: 'Bot reiniciando sozinho', priority: 'high', status: 'aberto', date: '5 min' },
  { id: '#4820', user: 'Marina Costa', subject: 'Configurar domínio personalizado', priority: 'medium', status: 'respondido', date: '1 h' },
  { id: '#4819', user: 'Rafael Oliveira', subject: 'Fatura com erro', priority: 'critical', status: 'aberto', date: '2 h' },
  { id: '#4818', user: 'Bianca Souza', subject: 'Dúvida sobre deploy via Git', priority: 'low', status: 'resolvido', date: 'ontem' },
]

const priorityColor: Record<string, string> = {
  critical: 'bg-destructive/10 text-destructive',
  high: 'bg-amber-500/10 text-amber-400',
  medium: 'bg-accent/10 text-accent',
  low: 'bg-muted text-muted-foreground',
}
const statusColor: Record<string, string> = {
  aberto: 'bg-accent/15 text-accent',
  respondido: 'bg-amber-500/10 text-amber-400',
  resolvido: 'bg-emerald-500/10 text-emerald-400',
}

export default function AdminTicketsPage() {
  const [search, setSearch] = useState('')
  const filtered = tickets.filter((t) => t.subject.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppShell title="Gestão de Tickets">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2.5 sm:w-72">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar ticket..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="space-y-3">
              {filtered.map((t) => (
                <div key={t.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-4">
                  <MessageSquare className="size-5 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{t.subject}</p>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${priorityColor[t.priority]}`}>{t.priority}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.id} · {t.user} · {t.date}</p>
                  </div>
                  <span className={`shrink-0 inline-flex rounded-full px-2.5 py-1 text-xs ${statusColor[t.status]}`}>{t.status}</span>
                  <div className="flex gap-1 shrink-0">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" title="Resolver"><CheckCircle2 className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" title="Fechar"><XCircle className="size-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
