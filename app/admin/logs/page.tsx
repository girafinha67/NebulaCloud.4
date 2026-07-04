'use client'

import { Shield, Settings, LogIn, Activity, User } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const logs = [
  { id: 'al-001', admin: 'Rafael Oliveira', action: 'Suspendeu usuário bianca@email.com', type: 'user', date: 'Hoje, 14:30', ip: '177.22.33.44' },
  { id: 'al-002', admin: 'Rafael Oliveira', action: 'Criou cupom NEBULA10', type: 'config', date: 'Hoje, 13:15', ip: '177.22.33.44' },
  { id: 'al-003', admin: 'Rafael Oliveira', action: 'Login no painel admin', type: 'login', date: 'Hoje, 09:00', ip: '177.22.33.44' },
  { id: 'al-004', admin: 'Sistema', action: 'Backup automático do banco de dados', type: 'activity', date: 'Ontem, 03:00', ip: 'sistema' },
  { id: 'al-005', admin: 'Rafael Oliveira', action: 'Atualizou configurações de SMTP', type: 'config', date: '24 jun, 16:30', ip: '177.22.33.44' },
]

const typeMap = {
  user: { icon: User, cls: 'bg-amber-500/10 text-amber-400' },
  config: { icon: Settings, cls: 'bg-accent/10 text-accent' },
  login: { icon: LogIn, cls: 'bg-emerald-500/10 text-emerald-400' },
  activity: { icon: Activity, cls: 'bg-secondary text-muted-foreground' },
  security: { icon: Shield, cls: 'bg-destructive/10 text-destructive' },
}

export default function AdminLogsPage() {
  return (
    <AppShell title="Logs Administrativos">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <h2 className="font-medium">Auditoria do sistema</h2>
            <div className="mt-5 space-y-2">
              {logs.map((log) => {
                const t = typeMap[log.type as keyof typeof typeMap]
                return (
                  <div key={log.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-4">
                    <span className={cn('grid size-9 shrink-0 place-items-center rounded-2xl', t.cls)}>
                      <t.icon className="size-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">por {log.admin} · IP: {log.ip}</p>
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
