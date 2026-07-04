'use client'

import { Link2, Copy, Users, DollarSign, TrendingUp, CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { useAuth } from '@/contexts/auth-context'

export default function AfiliadosPage() {
  const { user } = useAuth()
  const affiliateLink = `https://nebula.app/r/${user?.affiliateCode ?? 'NEBULA-XXX'}`

  function copyLink() {
    navigator.clipboard.writeText(affiliateLink)
  }

  return (
    <AppShell title="Programa de Afiliados">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border glass p-6 shadow-soft sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/15 blur-3xl" />
            <p className="text-sm font-medium text-accent">Seu link de afiliado</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Indique e ganhe comissões</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ganhe 20% de comissão recorrente em cada cliente que contratar um plano pelo seu link.</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card/40 px-4 py-3">
                <Link2 className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate font-mono text-sm">{affiliateLink}</span>
              </div>
              <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                <Copy className="size-4" /> Copiar
              </button>
            </div>
          </div>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, label: 'Indicações', value: '0' },
            { icon: CheckCircle2, label: 'Conversões', value: '0' },
            { icon: DollarSign, label: 'Comissão pendente', value: 'R$ 0,00' },
            { icon: TrendingUp, label: 'Total ganho', value: 'R$ 0,00' },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><s.icon className="size-5" /></span>
                <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Como funciona</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { step: '1', title: 'Compartilhe seu link', desc: 'Divulgue seu link único nas redes sociais, grupos e comunidades.' },
                { step: '2', title: 'Cliente se cadastra', desc: 'Quando alguém acessar seu link e contratar um plano, você é creditado.' },
                { step: '3', title: 'Receba comissões', desc: 'Ganhe 20% de comissão recorrente enquanto o cliente permanecer ativo.' },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-card/30 p-5">
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">{s.step}</span>
                  <h3 className="mt-3 font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
