'use client'

import { Download, CheckCircle2, Clock, AlertTriangle, FileText, ServerOff } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { EmptyState } from '@/components/app/empty-state'
import { cn } from '@/lib/utils'

const invoices = [
  { id: 'INV-2024-006', desc: 'Plano Pro — Junho/2024', amount: 'R$ 49,00', status: 'paid', date: '01/06/2024' },
  { id: 'INV-2024-005', desc: 'Plano Pro — Maio/2024', amount: 'R$ 49,00', status: 'paid', date: '01/05/2024' },
  { id: 'INV-2024-007', desc: 'Plano Pro — Julho/2024', amount: 'R$ 49,00', status: 'pending', date: '01/07/2024' },
  { id: 'INV-2024-004', desc: 'Plano Pro — Abril/2024', amount: 'R$ 49,00', status: 'paid', date: '01/04/2024' },
  { id: 'INV-2024-003', desc: 'Plano Starter — Março/2024', amount: 'R$ 19,00', status: 'overdue', date: '01/03/2024' },
]

const statusMap = {
  paid: { label: 'Paga', icon: CheckCircle2, cls: 'bg-emerald-500/10 text-emerald-400' },
  pending: { label: 'Pendente', icon: Clock, cls: 'bg-amber-500/10 text-amber-400' },
  overdue: { label: 'Vencida', icon: AlertTriangle, cls: 'bg-destructive/10 text-destructive' },
}

export default function FaturasPage() {
  const hasInvoices = invoices.length > 0
  const summary = { total: 'R$ 215,00', paid: 'R$ 196,00', pending: 'R$ 49,00', overdue: 'R$ 19,00' }

  return (
    <AppShell title="Faturas">
      <div className="mx-auto max-w-6xl space-y-5">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total gasto', value: summary.total },
            { label: 'Faturas pagas', value: summary.paid },
            { label: 'Faturas pendentes', value: summary.pending },
            { label: 'Faturas vencidas', value: summary.overdue },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Histórico de faturas</h2>
              <button className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">Exportar</button>
            </div>

            {!hasInvoices ? (
              <EmptyState icon={FileText} title="Nenhuma fatura encontrada." description="Suas faturas aparecerão aqui após a ativação de um plano." className="mt-6" />
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[580px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-3 font-medium">Fatura</th>
                      <th className="pb-3 font-medium">Descrição</th>
                      <th className="pb-3 font-medium">Data</th>
                      <th className="pb-3 font-medium">Valor</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => {
                      const s = statusMap[inv.status as keyof typeof statusMap]
                      return (
                        <tr key={inv.id} className="border-b border-border/60 last:border-0">
                          <td className="py-4 font-mono text-xs text-muted-foreground">{inv.id}</td>
                          <td className="py-4 font-medium">{inv.desc}</td>
                          <td className="py-4 text-muted-foreground">{inv.date}</td>
                          <td className="py-4 font-medium">{inv.amount}</td>
                          <td className="py-4">
                            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs', s.cls)}>
                              <s.icon className="size-3" /> {s.label}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Download">
                              <Download className="size-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
