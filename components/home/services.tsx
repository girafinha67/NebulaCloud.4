'use client'

import { Bot, MessageCircle, Send, Code2, Globe, Server } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const services = [
  { icon: Bot, title: 'Bots de Discord', desc: 'Hospede bots em Node.js, Python ou Java com reinício automático e logs em tempo real.' },
  { icon: MessageCircle, title: 'Bots de WhatsApp', desc: 'Sessões persistentes, alta disponibilidade e proteção contra quedas de conexão.' },
  { icon: Send, title: 'Bots de Telegram', desc: 'Webhooks e long polling otimizados para respostas instantâneas em qualquer escala.' },
  { icon: Code2, title: 'APIs & Node.js', desc: 'Deploy contínuo via Git, variáveis de ambiente seguras e escalonamento automático.' },
  { icon: Globe, title: 'Sites & Web Apps', desc: 'Hospedagem rápida com CDN global, SSL gratuito e domínios personalizados.' },
  { icon: Server, title: 'Servidores VPS', desc: 'Acesso root completo, IP dedicado e total liberdade para configurar seu ambiente.' },
]

export function Services() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Tudo em um só lugar</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Uma plataforma para cada projeto</h2>
          <p className="mt-4 text-pretty text-muted-foreground">Do seu primeiro bot ao seu cluster de produção, a Nebula entrega a mesma experiência fluida e premium.</p>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="group h-full rounded-3xl border border-border glass p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/40">
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
