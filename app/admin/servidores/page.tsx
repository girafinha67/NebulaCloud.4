'use client'

import { Server, Plus, Pencil, Trash2, MapPin, Cpu, MemoryStick, HardDrive } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const nodes = [
  { id: 'n1', name: 'BR-SP-01', location: 'São Paulo, Brasil', ip: '177.22.0.1', status: 'online', cpuUsed: 62, cpuTotal: 96, ramUsed: 48, ramTotal: 128, diskUsed: 1200, diskTotal: 4000, servicesCount: 312 },
  { id: 'n2', name: 'BR-SP-02', location: 'São Paulo, Brasil', ip: '177.22.0.2', status: 'online', cpuUsed: 38, cpuTotal: 64, ramUsed: 32, ramTotal: 64, diskUsed: 800, diskTotal: 2000, servicesCount: 187 },
  { id: 'n3', name: 'BR-RJ-01', location: 'Rio de Janeiro, Brasil', ip: '200.10.0.1', status: 'maintenance', cpuUsed: 0, cpuTotal: 32, ramUsed: 0, ramTotal: 32, diskUsed: 0, diskTotal: 1000, servicesCount: 0 },
]

function Bar({ pct }: { pct: number }) {
  return (
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
      <div className={cn('h-full rounded-full', pct > 80 ? 'bg-destructive' : pct > 60 ? 'bg-amber-400' : 'bg-accent')} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function AdminServidoresPage() {
  return (
    <AppShell title="Gestão de Servidores">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{nodes.length} nodes cadastrados</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              <Plus className="size-4" /> Adicionar node
            </button>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {nodes.map((n) => (
            <Reveal key={n.id}>
              <div className="rounded-3xl border border-border glass p-6 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><Server className="size-5" /></span>
                    <div>
                      <p className="font-mono font-semibold">{n.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" /> {n.location}</p>
                    </div>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-1 text-xs', n.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>
                    {n.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground"><Cpu className="size-3" /> CPU</span>
                      <span>{n.cpuUsed}/{n.cpuTotal} cores ({Math.round(n.cpuUsed / n.cpuTotal * 100)}%)</span>
                    </div>
                    <Bar pct={Math.round(n.cpuUsed / n.cpuTotal * 100)} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground"><MemoryStick className="size-3" /> RAM</span>
                      <span>{n.ramUsed}/{n.ramTotal} GB ({Math.round(n.ramUsed / n.ramTotal * 100)}%)</span>
                    </div>
                    <Bar pct={Math.round(n.ramUsed / n.ramTotal * 100)} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground"><HardDrive className="size-3" /> Disco</span>
                      <span>{n.diskUsed}/{n.diskTotal} GB ({Math.round(n.diskUsed / n.diskTotal * 100)}%)</span>
                    </div>
                    <Bar pct={Math.round(n.diskUsed / n.diskTotal * 100)} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">{n.servicesCount} serviços</p>
                  <div className="flex gap-1">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Pencil className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
