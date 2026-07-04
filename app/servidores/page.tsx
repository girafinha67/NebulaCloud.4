'use client'

import { useState } from 'react'
import { Play, Square, RotateCw, UploadCloud, HardDriveDownload, GitBranch, Terminal as TerminalIcon, Cpu, MemoryStick } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { AreaChart } from '@/components/app/area-chart'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const logLines = [
  { t: '12:04:21', m: 'Iniciando api-production...', c: 'text-muted-foreground' },
  { t: '12:04:22', m: '✓ Dependências carregadas (412 pacotes)', c: 'text-emerald-400' },
  { t: '12:04:23', m: '✓ Conexão com banco estabelecida', c: 'text-emerald-400' },
  { t: '12:04:24', m: 'Servidor escutando na porta 3000', c: 'text-foreground' },
  { t: '12:04:25', m: 'GET /api/health 200 · 12ms', c: 'text-muted-foreground' },
  { t: '12:04:27', m: 'GET /api/users 200 · 34ms', c: 'text-muted-foreground' },
  { t: '12:04:31', m: '⚡ Anti-DDoS: 1.204 requisições filtradas', c: 'text-accent' },
]

const net = [12, 18, 14, 22, 28, 24, 31, 27, 35, 30, 38, 33]

const backups = [
  { name: 'snapshot-auto-0412', date: 'Hoje, 12:00', size: '2,4 GB' },
  { name: 'snapshot-auto-0312', date: 'Ontem, 12:00', size: '2,3 GB' },
  { name: 'snapshot-manual-021', date: '02 jun, 18:42', size: '2,1 GB' },
]

export default function ServidoresPage() {
  const [status, setStatus] = useState<'online' | 'parado' | 'reiniciando'>('online')
  return (
    <AppShell title="Gerenciamento de Servidor">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-3xl border border-border glass p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary"><TerminalIcon className="size-6" /></span>
              <div>
                <p className="font-mono text-sm">api-production</p>
                <p className="text-xs text-muted-foreground">Node.js 20 · São Paulo · 4 vCores · 8 GB RAM</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs', status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : status === 'parado' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-400')}>
                <span className={cn('size-1.5 rounded-full', status === 'online' ? 'bg-emerald-400' : status === 'parado' ? 'bg-destructive' : 'bg-amber-400')} />
                {status}
              </span>
              <button onClick={() => setStatus('online')} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/25"><Play className="size-4" /> Iniciar</button>
              <button onClick={() => setStatus('reiniciando')} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm transition-colors hover:bg-secondary/70"><RotateCw className="size-4" /> Reiniciar</button>
              <button onClick={() => setStatus('parado')} className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-4 py-2 text-sm text-destructive transition-colors hover:bg-destructive/25"><Square className="size-4" /> Parar</button>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-border glass-strong shadow-soft">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="size-3 rounded-full bg-destructive/70" />
                <span className="size-3 rounded-full bg-amber-400/70" />
                <span className="size-3 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">console · api-production</span>
              </div>
              <div className="scroll-slim max-h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
                {logLines.map((l, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="shrink-0 text-muted-foreground/60">{l.t}</span>
                    <span className={l.c}>{l.m}</span>
                  </div>
                ))}
                <div className="mt-1 flex gap-2"><span className="text-accent">$</span><span className="inline-block h-4 w-2 animate-pulse bg-foreground/70" /></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Cpu className="size-4" /> CPU</div>
                <p className="mt-1 text-2xl font-semibold">61%</p>
                <AreaChart data={net} height={64} />
              </div>
              <div className="rounded-3xl border border-border glass p-5 shadow-soft">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><MemoryStick className="size-4" /> Rede I/O</div>
                <p className="mt-1 text-2xl font-semibold">38 Mb/s</p>
                <AreaChart data={[...net].reverse()} stroke="var(--muted-foreground)" height={64} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-border glass p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><GitBranch className="size-5" /></span>
              <h3 className="mt-4 font-medium">Deploy</h3>
              <p className="mt-1 text-sm text-muted-foreground">Publique a partir do seu repositório conectado.</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">main · a1b2c3d</p>
              <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                <GitBranch className="size-4" /> Fazer deploy
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-border glass p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><UploadCloud className="size-5" /></span>
              <h3 className="mt-4 font-medium">Arquivos</h3>
              <div className="mt-3 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 p-6 text-center">
                <UploadCloud className="size-6 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Arraste arquivos aqui ou clique para enviar</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex h-full flex-col rounded-3xl border border-border glass p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><HardDriveDownload className="size-5" /></span>
              <h3 className="mt-4 font-medium">Backups</h3>
              <div className="mt-3 space-y-2">
                {backups.map((b) => (
                  <div key={b.name} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 p-3">
                    <div>
                      <p className="font-mono text-xs">{b.name}</p>
                      <p className="text-[11px] text-muted-foreground">{b.date} · {b.size}</p>
                    </div>
                    <button className="rounded-full bg-secondary px-3 py-1 text-xs transition-colors hover:bg-secondary/70">Restaurar</button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </AppShell>
  )
}
