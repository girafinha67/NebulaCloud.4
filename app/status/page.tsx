import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Status dos Serviços — Nebula',
  description: 'Acompanhe o status em tempo real de todos os serviços Nebula.',
}

const services = [
  { name: 'API de Hospedagem', status: 'operational', region: 'São Paulo, BR' },
  { name: 'Painel de Controle', status: 'operational', region: 'Global' },
  { name: 'Rede BR-SP', status: 'operational', region: 'São Paulo, BR' },
  { name: 'Rede BR-RJ', status: 'maintenance', region: 'Rio de Janeiro, BR' },
  { name: 'Banco de Dados', status: 'operational', region: 'São Paulo, BR' },
  { name: 'CDN', status: 'operational', region: 'Global' },
  { name: 'Sistema de Backups', status: 'operational', region: 'São Paulo, BR' },
  { name: 'Gateway de Pagamento', status: 'operational', region: 'Global' },
  { name: 'DNS', status: 'operational', region: 'Global' },
  { name: 'Anti-DDoS', status: 'operational', region: 'Global' },
]

const incidents = [
  { date: '30/06/2025', title: 'Manutenção programada — Rede BR-RJ-01', status: 'Em andamento', detail: 'Atualização de hardware no datacenter do Rio de Janeiro. Sem impacto nos serviços de São Paulo.' },
  { date: '15/06/2025', title: 'Latência elevada — Rede BR-SP', status: 'Resolvido', detail: 'Incidente de latência elevada identificado e corrigido em 12 minutos. Causa: saturação de switch de borda.' },
]

const statusMap = {
  operational: { icon: CheckCircle2, label: 'Operacional', cls: 'text-emerald-400', dot: 'bg-emerald-400' },
  degraded: { icon: AlertTriangle, label: 'Degradado', cls: 'text-amber-400', dot: 'bg-amber-400' },
  maintenance: { icon: AlertTriangle, label: 'Manutenção', cls: 'text-amber-400', dot: 'bg-amber-400' },
  outage: { icon: XCircle, label: 'Incidente', cls: 'text-destructive', dot: 'bg-destructive' },
}

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === 'operational')
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-2 text-sm">
            {allOperational ? (
              <><span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Todos os sistemas operacionais</>
            ) : (
              <><span className="size-2 rounded-full bg-amber-400 animate-pulse" /> Manutenção em andamento</>
            )}
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Status dos serviços</h1>
          <p className="mt-4 text-muted-foreground">Atualizado em tempo real · 99,99% uptime nos últimos 90 dias</p>
        </Reveal>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-[2rem] border border-border glass p-6 shadow-soft">
              <h2 className="mb-4 font-medium">Serviços</h2>
              <div className="space-y-2">
                {services.map((s) => {
                  const sm = statusMap[s.status as keyof typeof statusMap]
                  return (
                    <div key={s.name} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`size-2 rounded-full ${sm.dot}`} />
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.region}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${sm.cls}`}>{sm.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-5">
            <div className="rounded-[2rem] border border-border glass p-6 shadow-soft">
              <h2 className="mb-4 font-medium">Incidentes recentes</h2>
              <div className="space-y-4">
                {incidents.map((inc, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card/30 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{inc.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{inc.detail}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs ${inc.status === 'Resolvido' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{inc.status}</span>
                        <p className="mt-1 text-xs text-muted-foreground">{inc.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-5">
            <div className="rounded-[2rem] border border-border glass p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-muted-foreground" />
                <h2 className="font-medium">Uptime últimos 90 dias</h2>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 90 }).map((_, i) => (
                  <div key={i} className={`h-6 flex-1 rounded-sm ${i === 60 ? 'bg-amber-400/50' : 'bg-emerald-400/40'}`} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>90 dias atrás</span>
                <span className="text-emerald-400 font-medium">99,99% uptime</span>
                <span>Hoje</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
