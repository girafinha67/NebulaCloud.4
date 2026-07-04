'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  LayoutDashboard,
  Server,
  CreditCard,
  LifeBuoy,
  Shield,
  Hexagon,
  Search,
  Bell,
  Menu,
  X,
  User,
  HardDriveDownload,
  FileText,
  Users,
  LogOut,
  ChevronDown,
  Settings,
  Link2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteName } from '@/lib/site'
import { useAuth } from '@/contexts/auth-context'
import { useNotifications } from '@/contexts/notification-context'

const clientNav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meus Serviços', href: '/servidores', icon: Server },
  { label: 'Faturas', href: '/faturas', icon: CreditCard },
  { label: 'Tickets', href: '/suporte', icon: LifeBuoy },
  { label: 'Backups', href: '/backups', icon: HardDriveDownload },
  { label: 'Logs', href: '/logs', icon: FileText },
  { label: 'Afiliados', href: '/afiliados', icon: Link2 },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
]

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Usuários', href: '/admin/usuarios', icon: Users },
  { label: 'Financeiro', href: '/admin/financeiro', icon: CreditCard },
  { label: 'Planos', href: '/admin/planos', icon: FileText },
  { label: 'Cupons', href: '/admin/cupons', icon: FileText },
  { label: 'Tickets', href: '/admin/tickets', icon: LifeBuoy },
  { label: 'Servidores', href: '/admin/servidores', icon: Server },
  { label: 'Logs', href: '/admin/logs', icon: FileText },
  { label: 'Notificações', href: '/admin/notificacoes', icon: Bell },
  { label: 'Config. Sistema', href: '/admin/configuracoes', icon: Settings },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()
  const { unreadCount } = useNotifications()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const nav = isAdmin ? adminNav : clientNav

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-1"
        onClick={onClose}
      >
        <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <Hexagon className="size-4" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight">
          {siteName}
        </span>
      </Link>

      {isAdmin && (
        <span className="mx-3 mt-2 inline-block rounded-full bg-accent/20 px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-wider text-accent">
          Painel Admin
        </span>
      )}

      <nav className="mt-5 flex flex-1 flex-col gap-0.5 overflow-y-auto scroll-slim">
        {nav.map((item) => {
          const active =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
              )}
            >
              <item.icon className="size-[18px]" />
              <span className="flex-1">{item.label}</span>
              {item.label === 'Notificações' && unreadCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {!isAdmin && user?.plan && (
        <div className="mt-3 rounded-2xl border border-border bg-card/40 p-4">
          <p className="text-sm font-medium">Plano {user.plan}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {user.planExpiresAt
              ? `Renova em ${new Date(user.planExpiresAt).toLocaleDateString('pt-BR')}`
              : 'Plano ativo'}
          </p>
          <Link
            href="/planos"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            onClick={onClose}
          >
            Fazer upgrade
          </Link>
        </div>
      )}

      <div className="mt-3 relative">
        <button
          onClick={() => setUserMenuOpen((v) => !v)}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary/50"
        >
          <span className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-medium">
            {user?.name?.slice(0, 2).toUpperCase() ?? 'NA'}
          </span>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              userMenuOpen && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence>
          {userMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute bottom-full left-0 mb-1 w-full overflow-hidden rounded-2xl border border-border glass-strong shadow-soft"
            >
              <Link
                href="/perfil"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-secondary/50"
              >
                <User className="size-4" /> Meu Perfil
              </Link>
              {!isAdmin && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-secondary/50"
                >
                  <Shield className="size-4" /> Painel Admin
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-secondary/50"
                >
                  <LayoutDashboard className="size-4" /> Área do Cliente
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-destructive hover:bg-secondary/50"
              >
                <LogOut className="size-4" /> Sair
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function AppShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const { unreadCount } = useNotifications()

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 p-4 lg:block">
        <div className="glass h-full rounded-[1.75rem] border border-border p-4 shadow-soft">
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="fixed inset-y-0 left-0 z-50 w-72 p-4 lg:hidden"
            >
              <div className="glass-strong relative h-full rounded-[1.75rem] border border-border p-4 shadow-soft">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 text-muted-foreground"
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </button>
                <SidebarContent onClose={() => setOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative lg:pl-64">
        <header className="sticky top-0 z-20 px-4 pt-4">
          <div className="glass-nav flex items-center justify-between gap-3 rounded-[1.5rem] border border-border px-4 py-3 shadow-soft">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="grid size-9 place-items-center rounded-full text-foreground lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </button>
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-2 text-sm text-muted-foreground sm:flex">
                <Search className="size-4" />
                <span>Buscar...</span>
              </div>
              <Link
                href="/suporte"
                className="relative grid size-9 place-items-center rounded-full border border-border bg-card/40 text-foreground"
                aria-label="Notificações"
              >
                <Bell className="size-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">{children}</main>
      </div>
    </div>
  )
}
