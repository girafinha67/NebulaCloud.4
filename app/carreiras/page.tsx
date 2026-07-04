import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Carreiras — Nebula',
  description: 'Faça parte da equipe Nebula e ajude a construir o futuro da hospedagem digital no Brasil.',
}

const jobs = [
  { title: 'Engenheiro(a) de Infraestrutura', dept: 'Infraestrutura', location: 'Remoto · Brasil', type: 'Tempo integral', desc: 'Responsável por manter e expandir nossa infraestrutura cloud-native, garantindo performance e disponibilidade.' },
  { title: 'Desenvolvedor(a) Full Stack', dept: 'Produto', location: 'Remoto · Brasil', type: 'Tempo integral', desc: 'Trabalhará no painel de controle e APIs da plataforma, com foco em Next.js, TypeScript e Node.js.' },
  { title: 'Designer de Produto', dept: 'Design', location: 'Remoto · Brasil', type: 'Tempo integral', desc: 'Criará experiências de usuário elegantes e intuitivas para o painel e site da Nebula.' },
  { title: 'Especialista em Suporte Técnico', dept: 'Suporte', location: 'Remoto · Brasil', type: 'Tempo integral', desc: 'Atenderá clientes com dúvidas técnicas sobre deploy, configuração e performance de seus serviços.' },
]

const perks = [
  { emoji: '🏠', title: 'Trabalho 100% remoto', desc: 'Trabalhe de onde preferir, com liberdade de horário.' },
  { emoji: '💻', title: 'Setup pago', desc: 'Receba créditos para montar o home office dos seus sonhos.' },
  { emoji: '📚', title: 'Aprendizado contínuo', desc: 'Acesso a cursos, conferências e livros técnicos.' },
  { emoji: '🚀', title: 'Produto que você vai usar', desc: 'Impacto direto em uma plataforma usada por milhares de devs.' },
]

export default function CarreirasPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Carreiras</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Construa o futuro conosco</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">Somos uma equipe pequena, obcecada com qualidade, performance e uma boa experiência de usuário.</p>
        </Reveal>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {perks.map((p) => (
              <StaggerItem key={p.title}>
                <div className="rounded-3xl border border-border glass p-5 shadow-soft text-center">
                  <span className="text-3xl">{p.emoji}</span>
                  <h3 className="mt-3 text-sm font-medium">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h2 className="mb-5 text-xl font-semibold">Vagas abertas</h2>
          </Reveal>
          <div className="space-y-4">
            {jobs.map((job) => (
              <Reveal key={job.title}>
                <div className="group flex items-start justify-between gap-4 rounded-3xl border border-border glass p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-secondary/40">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{job.title}</h3>
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">{job.dept}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="size-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {job.type}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{job.desc}</p>
                  </div>
                  <Link href="/contato" className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">
                    Candidatar <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
