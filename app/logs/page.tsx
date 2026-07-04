'use client'

import { FileText, LogIn, Settings, Activity, Shield } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const logs = [
  { id: 'log-001', type: 'login', desc: 'Login realizado com sucesso', ip: '177.22.33.44', date: 'Hoje, 14:23' },
  { id: 'log-002', type: 'change', desc: 'Senha alterada', ip: '177.22.33.44', date: 'Hoje, 14:20' },
  { id: 'log-003', type: 'activity', desc: 'Serviço api-production reiniciado', ip: '177.22.33.44', date: 'Hoje, 13:15' },
  { id: 'log-004', type: 'security', desc: 'Tentativa de login bloqueada', ip: '89.12.44.77', date: 'Ontem, 22:11' },
  { id: 'log-005', type: 'login', desc: 'Login realizado com sucesso', ip: '177.22.33.44', date: 'Ontem, 09:00' },
  { id: 'log-006', type: 'activity', desc: 'Backup manual criado', ip: '177.22.33.44', date: '24 jun, 16:30' },
]

const typeMap = {
  login: { icon: LogIn, cls: 'bg-accent/10 text-accent', label: 'Login' },
  change: { icon: Settings, cls: 'bg-amber-500/10 text-amber-400', label: 'Alteração' },
  activity: { icon: Activity, cls: 'bg-emerald-500/10 text-emerald-400', label: 'Atividade' },
  security: { icon: Shield, cls: 'bg-destructive/10 text-destructive', label: 'Segurança' },
}

export default function LogsPage() {
  return (
    <AppShell title="Logs de Atividade">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Histórico de atividades</h2>
              <div className="flex gap-2">
                {Object.entries(typeMap).map(([key, val]) => (
                  <span key={key} className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs', val.cls)}>
                    <val.icon className="size-3" /> {val.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {logs.map((log) => {
                const t = typeMap[log.type as keyof typeof typeMap]
                return (
                  <div key={log.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-4">
                    <span className={cn('grid size-9 shrink-0 place-items-center rounded-2xl', t.cls)}>
                      <t.icon className="size-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.desc}</p>
                      <p className="text-xs text-muted-foreground">IP: {log.ip}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{log.date}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
