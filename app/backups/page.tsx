'use client'

import { HardDriveDownload, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

const backups = [
  { id: 'bkp-001', name: 'snapshot-auto-0712', service: 'api-production', date: 'Hoje, 12:00', size: '2,4 GB', type: 'auto' },
  { id: 'bkp-002', name: 'snapshot-auto-0612', service: 'api-production', date: 'Ontem, 12:00', size: '2,3 GB', type: 'auto' },
  { id: 'bkp-003', name: 'snapshot-manual-001', service: 'discord-bot-main', date: '02 jul, 18:42', size: '1,1 GB', type: 'manual' },
  { id: 'bkp-004', name: 'snapshot-auto-0512', service: 'discord-bot-main', date: '01 jul, 12:00', size: '1,0 GB', type: 'auto' },
]

export default function BackupsPage() {
  return (
    <AppShell title="Backups">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="flex items-center justify-between rounded-3xl border border-border glass p-6 shadow-soft">
            <div>
              <h2 className="font-medium">Gerenciamento de Backups</h2>
              <p className="mt-1 text-sm text-muted-foreground">Backups automáticos são criados diariamente às 12h. Mantenha até 7 snapshots.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              <Plus className="size-4" /> Criar backup
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 font-medium">Nome</th>
                    <th className="pb-3 font-medium">Serviço</th>
                    <th className="pb-3 font-medium">Data</th>
                    <th className="pb-3 font-medium">Tamanho</th>
                    <th className="pb-3 font-medium">Tipo</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b) => (
                    <tr key={b.id} className="border-b border-border/60 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-2xl bg-secondary"><HardDriveDownload className="size-4" /></span>
                          <p className="font-mono text-xs">{b.name}</p>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">{b.service}</td>
                      <td className="py-4 text-muted-foreground">{b.date}</td>
                      <td className="py-4">{b.size}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${b.type === 'auto' ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground'}`}>
                          {b.type === 'auto' ? 'Automático' : 'Manual'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Restaurar">
                            <RotateCcw className="size-4" />
                          </button>
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label="Deletar">
                            <Trash2 className="size-4" />
                          </button>
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
