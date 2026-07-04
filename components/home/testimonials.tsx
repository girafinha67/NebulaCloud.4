'use client'

import { testimonials } from '@/lib/site'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

export function Testimonials() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Quem usa, recomenda</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Amado por quem cria</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-3xl border border-border glass p-7 shadow-soft">
                <blockquote className="text-pretty leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-medium">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
