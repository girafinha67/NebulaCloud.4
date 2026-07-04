'use client'

import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { AreaChart } from '@/components/app/area-chart'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const revenueData = [42000, 48000, 45000, 53000, 60000, 58000, 67000, 72000, 68000, 80000, 86000, 94000]

const transactions = [
  { id: 'TXN-001', user: 'Lucas Andrade', plan: 'Pro', amount: 'R$ 49,00', method: 'PIX', date: '01/07/2025', status: 'pago' },
  { id: 'TXN-002', user: 'Marina Costa', plan: 'Ultra', amount: 'R$ 99,00', method: 'Cartão', date: '01/07/2025', status: 'pago' },
  { id: 'TXN-003', user: 'Rafael Oliveira', plan: 'VPS', amount: 'R$ 159,00', method: 'PIX', date: '01/07/2025', status: 'pago' },
  { id: 'TXN-004', user: 'Bianca Souza', plan: 'Starter', amount: 'R$ 19,00', method: 'PIX', date: '28/06/2025', status: 'pendente' },
  { id: 'TXN-005', user: 'Pedro Lima', plan: 'Pro', amount: 'R$ 49,00', method: 'Cartão', date: '25/06/2025', status: 'cancelado' },
]

const statusColor: Record<string, string> = {
  pago: 'bg-emerald-500/10 text-emerald-400',
  pendente: 'bg-amber-500/10 text-amber-400',
  cancelado: 'bg-destructive/10 text-destructive',
}

export default function AdminFinanceiroPage() {
  return (
    <AppShell title="Gestão Financeira">
      <div className="mx-auto max-w-6xl space-y-5">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: DollarSign, label: 'Receita mensal', value: 'R$ 94.280', sub: '+18%' },
            { icon: TrendingUp, label: 'Receita anual', value: 'R$ 763.200', sub: '+24%' },
            { icon: CreditCard, label: 'Ticket médio', value: 'R$ 67,40', sub: '+3%' },
            { icon: DollarSign, label: 'MRR', value: 'R$ 94.280', sub: 'Mensal' },
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

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div><h2 className="font-medium">Receita — últimos 12 meses</h2></div>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">
                <Download className="size-4" /> Exportar
              </button>
            </div>
            <div className="mt-4"><AreaChart data={revenueData} height={180} /></div>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Transações recentes</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Usuário</th>
                    <th className="pb-3 font-medium">Plano</th>
                    <th className="pb-3 font-medium">Valor</th>
                    <th className="pb-3 font-medium">Método</th>
                    <th className="pb-3 font-medium">Data</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-border/60 last:border-0">
                      <td className="py-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                      <td className="py-4 font-medium">{t.user}</td>
                      <td className="py-4">{t.plan}</td>
                      <td className="py-4 font-semibold">{t.amount}</td>
                      <td className="py-4 text-muted-foreground">{t.method}</td>
                      <td className="py-4 text-muted-foreground">{t.date}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${statusColor[t.status]}`}>{t.status}</span>
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
