'use client'

import { Users, DollarSign, Server, TrendingUp, MoreHorizontal, LifeBuoy, Activity } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { AreaChart } from '@/components/app/area-chart'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const revenue = [42, 48, 45, 53, 60, 58, 67, 72, 68, 80, 86, 94]

const recentUsers = [
  { name: 'Lucas Andrade', email: 'lucas@email.com', plan: 'Pro', status: 'ativo', spent: 'R$ 588' },
  { name: 'Marina Costa', email: 'marina@email.com', plan: 'Ultra', status: 'ativo', spent: 'R$ 1.188' },
  { name: 'Rafael Oliveira', email: 'rafael@email.com', plan: 'VPS', status: 'ativo', spent: 'R$ 1.908' },
  { name: 'Bianca Souza', email: 'bianca@email.com', plan: 'Starter', status: 'pendente', spent: 'R$ 76' },
  { name: 'Pedro Lima', email: 'pedro@email.com', plan: 'Pro', status: 'inativo', spent: 'R$ 245' },
]

const statusColor: Record<string, string> = {
  ativo: 'bg-emerald-500/10 text-emerald-400',
  pendente: 'bg-amber-500/10 text-amber-400',
  inativo: 'bg-muted text-muted-foreground',
}

export default function AdminPage() {
  return (
    <AppShell title="Painel Admin">
      <div className="mx-auto max-w-6xl space-y-5">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: DollarSign, label: 'Receita (mês)', value: 'R$ 94.280', sub: '+18%' },
            { icon: Users, label: 'Usuários ativos', value: '8.412', sub: '+312' },
            { icon: Server, label: 'Servidores', value: '12.480', sub: '+126' },
            { icon: TrendingUp, label: 'Conversão', value: '6,8%', sub: '+0,9%' },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><s.icon className="size-5" /></span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">{s.sub}</span>
                </div>
                <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: LifeBuoy, label: 'Tickets abertos', value: '24', color: 'text-accent' },
            { icon: Activity, label: 'Uptime médio', value: '99,99%', color: 'text-emerald-400' },
            { icon: Server, label: 'Serviços ativos', value: '12.480', color: 'text-foreground' },
          ].map((s) => (
            <Reveal key={s.label}>
              <div className="flex items-center gap-4 rounded-3xl border border-border glass p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><s.icon className="size-5" /></span>
                <div>
                  <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium">Receita mensal</h2>
                  <p className="text-sm text-muted-foreground">Últimos 12 meses</p>
                </div>
                <span className="text-2xl font-semibold tracking-tight">R$ 94.280</span>
              </div>
              <div className="mt-4"><AreaChart data={revenue} height={160} /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">Planos vendidos</h2>
              <div className="mt-5 space-y-4">
                {[{ name: 'Pro', pct: 42 }, { name: 'Ultra', pct: 28 }, { name: 'VPS', pct: 18 }, { name: 'Starter', pct: 12 }].map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm"><span>{p.name}</span><span className="text-muted-foreground">{p.pct}%</span></div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Usuários recentes</h2>
              <button className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">Ver todos</button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 font-medium">Usuário</th>
                    <th className="pb-3 font-medium">Plano</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Total gasto</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u) => (
                    <tr key={u.email} className="border-b border-border/60 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-medium">
                            {u.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                          <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{u.plan}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${statusColor[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="py-4">{u.spent}</td>
                      <td className="py-4 text-right">
                        <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Ações">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
