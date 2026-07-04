import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { ArrowRight, Users, Rocket, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nós — Nebula',
  description: 'Conheça a história, missão e valores da Nebula.',
}

export default function SobrePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-12 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-accent">Nossa história</p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">Criados por criadores, para criadores</h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A Nebula nasceu da frustração de desenvolvedores brasileiros que não encontravam uma hospedagem que combinasse performance real, interface elegante e suporte humano de verdade.
          </p>
        </Reveal>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Rocket, title: 'Missão', desc: 'Democratizar a hospedagem premium, tornando-a acessível a cada desenvolvedor brasileiro.' },
              { icon: Globe, title: 'Visão', desc: 'Ser a plataforma de referência para hospedagem de projetos digitais na América Latina.' },
              { icon: Heart, title: 'Valores', desc: 'Transparência, performance e cuidado genuíno com cada cliente — do primeiro bot ao cluster de produção.' },
              { icon: Users, title: 'Equipe', desc: 'Somos um time de engenheiros, designers e suporte apaixonados por tecnologia e por resolver problemas reais.' },
            ].map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-3xl border border-border glass p-6 shadow-soft">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary"><v.icon className="size-5" /></span>
                  <h3 className="mt-4 font-medium">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border glass-strong p-10 text-center shadow-soft sm:p-16">
              <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-[500px] -translate-x-1/2 rounded-full bg-accent/18 blur-[120px]" />
              <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Quer fazer parte da equipe?</h2>
              <p className="relative mx-auto mt-4 max-w-md text-pretty text-muted-foreground">Estamos sempre em busca de talentos apaixonados por tecnologia e performance.</p>
              <Link href="/carreiras" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
                Ver vagas abertas <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
