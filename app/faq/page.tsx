import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Faq } from '@/components/home/faq'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'FAQ — Perguntas Frequentes — Nebula',
  description: 'Respostas às principais dúvidas sobre hospedagem, planos e suporte da Nebula.',
}

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">FAQ</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Perguntas frequentes</h1>
          <p className="mt-4 text-pretty text-muted-foreground">Não encontrou o que procura? Nossa equipe de suporte está online 24/7.</p>
        </Reveal>
      </section>
      <Faq />
      <Footer />
    </main>
  )
}
