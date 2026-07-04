'use client'

import { Cpu, MemoryStick, HardDrive, Activity, ArrowUpRight, Bot, Server, CheckCircle2, AlertTriangle, ServerOff } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { AreaChart, RadialGauge } from '@/components/app/area-chart'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { EmptyState } from '@/components/app/empty-state'
import { useAuth } from '@/contexts/auth-context'

const cpuData = [28, 32, 30, 45, 38, 52, 48, 61, 55, 49, 58, 62]
const ramData = [40, 42, 44, 41, 48, 52, 50, 55, 53, 57, 60, 58]

export default function DashboardPage() {
  const { user } = useAuth()

  // No services state — shown when user has no active services
  const hasServices = true // Replace with: services.length > 0 from real API

  return (
    <AppShell title="Dashboard">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-3xl border border-border glass p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">
            Bem-vindo de volta, <span className="font-medium text-foreground">{user?.name ?? 'usuário'}</span>. Aqui está o resumo dos seus recursos.
          </p>
        </div>

        {!hasServices ? (
          <EmptyState
            icon={ServerOff}
            title="Você ainda não possui nenhum serviço ativo."
            description="Escolha um plano e coloque seu projeto no ar em menos de 60 segundos."
            actions={[
              { label: 'Comprar Plano', href: '/planos', primary: true },
              { label: 'Abrir Ticket', href: '/suporte' },
            ]}
          />
        ) : (
          <>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Cpu, label: 'CPU', value: '62%', sub: '+8% hoje' },
                { icon: MemoryStick, label: 'Memória', value: '4.6 GB', sub: 'de 8 GB' },
                { icon: HardDrive, label: 'Disco', value: '38 GB', sub: 'de 100 GB' },
                { icon: Activity, label: 'Uptime', value: '99,99%', sub: '30 dias' },
              ].map((s) => (
                <StaggerItem key={s.label}>
                  <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><s.icon className="size-5" /></span>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label} · {s.sub}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="grid gap-4 lg:grid-cols-3">
              <Reveal className="lg:col-span-2">
                <div className="rounded-3xl border border-border glass p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-medium">Uso de CPU & Memória</h2>
                      <p className="text-sm text-muted-foreground">Últimas 12 horas</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" /> CPU</span>
                      <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground" /> RAM</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <AreaChart data={cpuData} />
                    <AreaChart data={ramData} stroke="var(--muted-foreground)" height={100} className="-mt-6" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border glass p-6 shadow-soft">
                  <RadialGauge value={62} label="Carga do servidor" sublabel="Saudável" />
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Reveal className="lg:col-span-2">
                <div className="rounded-3xl border border-border glass p-6 shadow-soft">
                  <h2 className="font-medium">Seus serviços</h2>
                  <div className="mt-4 space-y-2">
                    {[
                      { name: 'discord-bot-main', type: 'Discord', status: 'online', cpu: '38%' },
                      { name: 'whatsapp-gateway', type: 'WhatsApp', status: 'online', cpu: '22%' },
                      { name: 'api-production', type: 'API Node.js', status: 'online', cpu: '61%' },
                      { name: 'telegram-bot', type: 'Telegram', status: 'reiniciando', cpu: '—' },
                    ].map((srv) => (
                      <div key={srv.name} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-2xl bg-secondary">
                            {srv.type === 'VPS' ? <Server className="size-5" /> : <Bot className="size-5" />}
                          </span>
                          <div>
                            <p className="font-mono text-sm">{srv.name}</p>
                            <p className="text-xs text-muted-foreground">{srv.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden text-sm text-muted-foreground sm:inline">CPU {srv.cpu}</span>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${srv.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            <span className={`size-1.5 rounded-full ${srv.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {srv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-border glass p-6 shadow-soft">
                  <h2 className="font-medium">Atividade recente</h2>
                  <ol className="mt-4 space-y-4">
                    {[
                      { time: 'agora', text: 'Deploy concluído em api-production', ok: true },
                      { time: '12 min', text: 'Backup automático criado', ok: true },
                      { time: '1 h', text: 'telegram-bot reiniciado automaticamente', ok: false },
                      { time: '3 h', text: 'Pico de tráfego mitigado (Anti-DDoS)', ok: true },
                    ].map((a, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5">
                          {a.ok ? <CheckCircle2 className="size-4 text-emerald-400" /> : <AlertTriangle className="size-4 text-amber-400" />}
                        </span>
                        <div>
                          <p className="text-sm leading-snug">{a.text}</p>
                          <p className="text-xs text-muted-foreground">{a.time}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
