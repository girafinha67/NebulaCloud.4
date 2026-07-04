'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'
import { useState } from 'react'
import { cn } from '@/lib/utils'

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-3 py-4 text-left text-base hover:text-foreground">
        <span>{q}</span>
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open && <p className="px-3 pb-4 text-sm text-muted-foreground">{a}</p>}
    </div>
  )
}

export function Faq() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-sm font-medium text-accent">Dúvidas frequentes</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Tudo que você precisa saber</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">Não encontrou sua resposta? Nossa equipe de suporte está online 24/7 para ajudar.</p>
          <Link href="/suporte" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border glass px-5 py-2.5 text-sm transition-colors hover:bg-secondary">
            Falar com o suporte <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-border glass p-3 shadow-soft sm:p-4">
            {faqs.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border glass-strong p-10 text-center shadow-soft sm:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
            <h2 className="relative text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Comece em menos de<br /><span className="text-gradient-silver">60 segundos</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">Crie sua conta, escolha um plano e coloque seu projeto no ar agora mesmo. 7 dias de garantia incondicional.</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/registro" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
                Criar conta grátis <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/planos" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm transition-colors hover:bg-secondary">
                Comparar planos
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
