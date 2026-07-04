'use client'

import { stats } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'

export function Stats() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-border glass shadow-soft md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center gap-1 bg-card/20 px-6 py-10 text-center">
                <span className="text-4xl font-semibold tracking-tight text-gradient-silver sm:text-5xl">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
