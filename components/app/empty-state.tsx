import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Action {
  label: string
  href: string
  primary?: boolean
}

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actions?: Action[]
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actions,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/20 p-12 text-center',
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary">
        <Icon className="size-6 text-muted-foreground" />
      </span>
      <p className="mt-4 text-base font-medium">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {actions && actions.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={cn(
                'inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]',
                a.primary
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border glass hover:bg-secondary',
              )}
            >
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function NoServicesState() {
  return (
    <EmptyState
      icon={require('lucide-react').ServerOff}
      title="Você ainda não possui nenhum serviço ativo."
      description="Escolha um plano e coloque seu projeto no ar em menos de 60 segundos."
      actions={[
        { label: 'Comprar Plano', href: '/planos', primary: true },
        { label: 'Criar Bot', href: '/planos' },
        { label: 'Contratar VPS', href: '/planos' },
        { label: 'Contratar Hospedagem', href: '/planos' },
        { label: 'Abrir Ticket', href: '/suporte' },
      ]}
    />
  )
}
