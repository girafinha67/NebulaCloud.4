'use client'

import { Bell, Plus, Send, Users, User } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

export default function AdminNotificacoesPage() {
  return (
    <AppShell title="Central de Notificações">
      <div className="mx-auto max-w-4xl space-y-5">
        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Enviar notificação</h2>
            <p className="mt-1 text-sm text-muted-foreground">Envie notificações para todos os usuários ou para um usuário específico.</p>
            <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-2 block text-sm font-medium">Destinatário</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="flex items-center gap-2 rounded-2xl border border-accent bg-accent/10 px-4 py-3 text-sm text-accent">
                    <Users className="size-4" /> Todos os usuários
                  </button>
                  <button type="button" className="flex items-center gap-2 rounded-2xl border border-border bg-card/30 px-4 py-3 text-sm text-muted-foreground hover:bg-secondary">
                    <User className="size-4" /> Usuário específico
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Tipo</label>
                <select className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60">
                  <option>Informação</option>
                  <option>Aviso</option>
                  <option>Sucesso</option>
                  <option>Erro</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Título</label>
                <input className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" placeholder="Título da notificação" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Mensagem</label>
                <textarea rows={3} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none" placeholder="Digite a mensagem..." />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                <Send className="size-4" /> Enviar notificação
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Notificações enviadas</h2>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Manutenção programada', msg: 'O servidor BR-RJ-01 entrará em manutenção dia 30/07 às 02:00.', target: 'Todos', date: 'Hoje, 10:00', type: 'warning' },
                { title: 'Nova funcionalidade disponível', msg: 'O painel de backups foi atualizado com novas opções de restauração.', target: 'Todos', date: 'Ontem, 14:00', type: 'info' },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card/30 p-4">
                  <Bell className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.msg}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Para: {n.target} · {n.date}</p>
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
