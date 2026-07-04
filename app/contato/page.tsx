import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/motion/reveal'
import { Mail, MessageSquare, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato — Nebula',
  description: 'Entre em contato com a equipe Nebula.',
}

export default function ContatoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Contato</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Fale com a gente</h1>
          <p className="mt-4 text-pretty text-muted-foreground">Nossa equipe está disponível 24/7. Respondemos em menos de 4 minutos em média.</p>
        </Reveal>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="flex gap-4 rounded-3xl border border-border glass p-6 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary"><Mail className="size-5" /></span>
                <div>
                  <h3 className="font-medium">E-mail</h3>
                  <p className="mt-1 text-sm text-muted-foreground">contato@nebula.app</p>
                  <p className="text-xs text-muted-foreground">Respondemos em até 2 horas úteis</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex gap-4 rounded-3xl border border-border glass p-6 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary"><MessageSquare className="size-5" /></span>
                <div>
                  <h3 className="font-medium">Chat ao vivo</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Disponível no painel de controle</p>
                  <p className="text-xs text-muted-foreground">Resposta média de 4 minutos</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="flex gap-4 rounded-3xl border border-border glass p-6 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary"><Clock className="size-5" /></span>
                <div>
                  <h3 className="font-medium">Horário de atendimento</h3>
                  <p className="mt-1 text-sm text-muted-foreground">24 horas por dia, 7 dias por semana</p>
                  <p className="text-xs text-muted-foreground">Suporte premium sem interrupções</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft sm:p-8">
              <h2 className="font-medium">Envie uma mensagem</h2>
              <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Nome</label>
                    <input className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">E-mail</label>
                    <input type="email" className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" placeholder="seu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Assunto</label>
                  <select className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60">
                    <option>Suporte técnico</option>
                    <option>Financeiro / Faturamento</option>
                    <option>Parceria comercial</option>
                    <option>Impressa</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Mensagem</label>
                  <textarea rows={5} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none" placeholder="Como podemos ajudar?" />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                  Enviar mensagem
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
