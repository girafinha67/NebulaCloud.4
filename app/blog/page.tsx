import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Nebula',
  description: 'Artigos, tutoriais e novidades sobre hospedagem, bots e desenvolvimento.',
}

const posts = [
  { slug: '1', title: 'Como hospedar seu bot de Discord na Nebula em 5 minutos', date: '25 jun 2025', category: 'Tutorial', read: '5 min', desc: 'Um guia completo e passo a passo para colocar seu bot de Discord no ar com reinício automático e logs em tempo real.' },
  { slug: '2', title: 'Novidade: Deploy automático via Git disponível para todos os planos', date: '18 jun 2025', category: 'Produto', read: '3 min', desc: 'A partir de hoje, todos os usuários Nebula podem conectar seus repositórios GitHub/GitLab e fazer deploy com um push.' },
  { slug: '3', title: 'Proteção Anti-DDoS de nível enterprise: como funciona nossa infraestrutura', date: '10 jun 2025', category: 'Infraestrutura', read: '7 min', desc: 'Entenda como nossa rede de proteção DDoS opera na borda e mitiga ataques antes que eles cheguem aos seus serviços.' },
  { slug: '4', title: '5 boas práticas para bots de WhatsApp em produção', date: '02 jun 2025', category: 'Tutorial', read: '6 min', desc: 'Sessões persistentes, reconexão automática, rate limiting e outras práticas essenciais para manter seus bots estáveis.' },
  { slug: '5', title: 'Nebula na BrazilJS 2025: resumo da palestra', date: '20 mai 2025', category: 'Eventos', read: '4 min', desc: 'Nosso CTO apresentou como construímos nossa infraestrutura cloud-native para suportar mais de 12.000 bots ativos.' },
  { slug: '6', title: 'Como configurar variáveis de ambiente seguras no painel', date: '12 mai 2025', category: 'Tutorial', read: '3 min', desc: 'Aprenda a usar o gerenciador de variáveis de ambiente da Nebula para manter suas credenciais seguras e organizadas.' },
]

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-10 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Blog Nebula</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Artigos & Novidades</h1>
          <p className="mt-4 text-pretty text-muted-foreground">Tutoriais, dicas de produção e novidades sobre a plataforma.</p>
        </Reveal>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-3xl border border-border glass p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/40">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.read} de leitura</span>
                  </div>
                  <h2 className="mt-4 flex-1 text-base font-medium leading-snug">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
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
