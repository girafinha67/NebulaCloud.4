'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNav, siteName } from '@/lib/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300',
          scrolled ? 'glass-nav border border-border shadow-soft' : 'border border-transparent',
        )}
      >
        <Link href="/" className="flex items-center gap-2 pl-1">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <Hexagon className="size-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{siteName}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm transition-colors',
                  active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            Entrar
          </Link>
          <Link href="/registro" className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
            Começar
          </Link>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="grid size-9 place-items-center rounded-full text-foreground md:hidden" aria-label="Abrir menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-w-5xl rounded-3xl border border-border p-3 shadow-soft md:hidden"
          >
            <div className="flex flex-col">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/login" className="rounded-2xl border border-border px-4 py-3 text-center text-sm">Entrar</Link>
                <Link href="/registro" className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">Começar</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
