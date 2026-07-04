'use client'

import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

const coupons = [
  { id: 'c1', code: 'NEBULA10', discount: 10, type: 'percentage', maxUses: 100, usedCount: 43, expiresAt: '31/12/2025', active: true },
  { id: 'c2', code: 'BEMVINDO', discount: 20, type: 'fixed', maxUses: 50, usedCount: 12, expiresAt: '30/09/2025', active: true },
  { id: 'c3', code: 'PROMO50', discount: 50, type: 'percentage', maxUses: 20, usedCount: 20, expiresAt: '01/07/2025', active: false },
]

export default function AdminCuponsPage() {
  return (
    <AppShell title="Gestão de Cupons">
      <div className="mx-auto max-w-5xl space-y-5">
        <Reveal>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{coupons.length} cupons cadastrados</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              <Plus className="size-4" /> Novo cupom
            </button>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 font-medium">Código</th>
                    <th className="pb-3 font-medium">Desconto</th>
                    <th className="pb-3 font-medium">Usos</th>
                    <th className="pb-3 font-medium">Expira em</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id} className="border-b border-border/60 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Tag className="size-4 text-muted-foreground" />
                          <span className="font-mono font-semibold">{c.code}</span>
                        </div>
                      </td>
                      <td className="py-4 font-semibold">
                        {c.type === 'percentage' ? `${c.discount}%` : `R$ ${c.discount},00`}
                      </td>
                      <td className="py-4 text-muted-foreground">{c.usedCount}/{c.maxUses}</td>
                      <td className="py-4 text-muted-foreground">{c.expiresAt}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${c.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                          {c.active ? 'Ativo' : 'Expirado'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Pencil className="size-4" /></button>
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                        </div>
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
