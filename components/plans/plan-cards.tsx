'use client'

import Link from 'next/link'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { plans } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Stagger, StaggerItem } from '@/components/motion/reveal'

export function PlanCards() {
  return (
    <Stagger className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
      {plans.map((plan) => (
        <StaggerItem key={plan.id} className="h-full">
          <div className={cn('group relative flex h-full flex-col rounded-[1.75rem] border p-6 shadow-soft transition-all duration-300 hover:-translate-y-2', plan.recommended ? 'border-accent/40 glass-strong shadow-glow' : 'border-border glass hover:bg-secondary/40')}>
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Sparkles className="size-3" /> Recomendado
              </span>
            )}
            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            </div>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
              <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {plan.specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card/30 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                  <p className="mt-0.5 text-sm font-medium">{s.value}</p>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-secondary"><Check className="size-3" /></span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/pagamento" className={cn('mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02]', plan.recommended ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground')}>
              Assinar {plan.name} <ArrowRight className="size-4" />
            </Link>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
