import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Search, Bot, Server, CreditCard, ShieldCheck, GitBranch, Settings, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Base de Conhecimento — Nebula',
  description: 'Documentação, guias e tutoriais para hospedar seus bots, APIs e servidores na Nebula.',
}

const categories = [
  { icon: Bot, title: 'Bots de Discord', desc: 'Configurar, fazer deploy e manter bots de Discord ativos 24/7.', articles: 18 },
  { icon: Bot, title: 'WhatsApp & Telegram', desc: 'Sessões persistentes e reconexão automática para bots de mensagens.', articles: 12 },
  { icon: Server, title: 'VPS & Servidores', desc: 'Acesso root, configuração de firewall e gerenciamento de recursos.', articles: 24 },
  { icon: GitBranch, title: 'Deploy via Git', desc: 'Conecte seu repositório e automatize deploys com CI/CD.', articles: 9 },
  { icon: CreditCard, title: 'Faturamento', desc: 'Planos, faturas, métodos de pagamento e cancelamentos.', articles: 7 },
  { icon: ShieldCheck, title: 'Segurança', desc: 'Anti-DDoS, SSL, firewall e boas práticas de segurança.', articles: 11 },
  { icon: Settings, title: 'Configurações', desc: 'Variáveis de ambiente, domínios personalizados e DNS.', articles: 15 },
  { icon: Server, title: 'Backups', desc: 'Criar, restaurar e gerenciar backups automáticos e manuais.', articles: 6 },
]

export default function BaseDeConhecimentoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Base de Conhecimento</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Central de ajuda</h1>
          <p className="mt-4 text-pretty text-muted-foreground">+200 artigos para ajudar você a colocar qualquer projeto no ar.</p>
          <div className="mt-6 flex items-center gap-3 rounded-full border border-border glass px-4 py-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Buscar artigo..." />
          </div>
        </Reveal>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <StaggerItem key={c.title}>
                <Link href="#" className="group flex h-full flex-col rounded-3xl border border-border glass p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/40">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-medium">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">{c.articles} artigos</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <Footer />
    </main>
  )
}
