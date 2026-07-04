import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PlanCards } from '@/components/plans/plan-cards'
import { Faq } from '@/components/home/faq'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Planos de Hospedagem — Nebula',
  description: 'Planos premium de hospedagem 24/7: Starter, Pro, Ultra e VPS.',
}

export default function PlanosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-12 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Planos & Preços</p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">Escolha a potência ideal</h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">Sem taxas escondidas. Faça upgrade ou downgrade quando quiser, com 7 dias de garantia incondicional.</p>
        </Reveal>
      </section>
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <PlanCards />
          <p className="mt-8 text-center text-sm text-muted-foreground">Todos os planos incluem SSL gratuito, proteção DDoS e migração assistida sem custo.</p>
        </div>
      </section>
      <Faq />
      <Footer />
    </main>
  )
}
