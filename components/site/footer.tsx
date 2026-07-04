import Link from 'next/link'
import { Hexagon } from 'lucide-react'
import { siteName } from '@/lib/site'

const groups = [
  {
    title: 'Produto',
    links: [
      { label: 'Planos', href: '/planos' },
      { label: 'Status', href: '/status' },
      { label: 'Base de Conhecimento', href: '/base-de-conhecimento' },
      { label: 'Afiliados', href: '/afiliados' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/sobre' },
      { label: 'Carreiras', href: '/carreiras' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Suporte', href: '/suporte' },
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Privacidade', href: '/privacidade' },
    ],
  },
  {
    title: 'Conta',
    links: [
      { label: 'Entrar', href: '/login' },
      { label: 'Criar conta', href: '/registro' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-[2rem] border border-border p-8 shadow-soft sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Hexagon className="size-4" />
                </span>
                <span className="text-base font-semibold tracking-tight">{siteName}</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Hospedagem premium 24/7 para bots, APIs, sites e servidores VPS. Infraestrutura de nível enterprise com design pensado nos mínimos detalhes.
              </p>
            </div>
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="text-sm font-medium text-foreground">{g.title}</h4>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteName}. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/privacidade" className="transition-colors hover:text-foreground">Privacidade</Link>
              <Link href="/termos" className="transition-colors hover:text-foreground">Termos</Link>
              <Link href="/lgpd" className="transition-colors hover:text-foreground">LGPD</Link>
              <Link href="/sla" className="transition-colors hover:text-foreground">SLA</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
