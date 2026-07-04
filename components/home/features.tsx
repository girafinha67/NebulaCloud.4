'use client'

import { Zap, ShieldCheck, GitBranch, HardDriveDownload } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

export function Features() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Por que Nebula</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Engenharia invisível, resultado impecável</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-border glass p-8 shadow-soft">
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/20 blur-3xl" />
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary"><Zap className="size-6 text-foreground" /></span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Performance NVMe de borda</h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">Processadores de última geração, armazenamento NVMe e rede de baixa latência distribuída globalmente. Seus serviços respondem em milissegundos.</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[{ k: 'CPU', v: 'AMD EPYC' }, { k: 'Disco', v: 'NVMe Gen4' }, { k: 'Rede', v: '10 Gbps' }].map((i) => (
                  <div key={i.k} className="rounded-2xl border border-border bg-card/30 p-4">
                    <p className="text-xs text-muted-foreground">{i.k}</p>
                    <p className="mt-1 text-sm font-medium">{i.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            {[
              { icon: ShieldCheck, title: 'Proteção DDoS enterprise', desc: 'Mitigação automática na borda da rede, 24 horas por dia.' },
              { icon: GitBranch, title: 'Deploy automático via Git', desc: 'Conecte seu repositório e publique a cada push.' },
              { icon: HardDriveDownload, title: 'Backups automáticos', desc: 'Snapshots agendados com restauração em um clique.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-border glass p-6 shadow-soft transition-colors hover:bg-secondary/40">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary"><f.icon className="size-5" /></span>
                  <div>
                    <h3 className="font-medium">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
