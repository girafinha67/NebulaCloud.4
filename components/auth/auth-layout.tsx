'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Hexagon } from 'lucide-react'
import { siteName } from '@/lib/site'

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Hexagon className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            {siteName}
          </span>
        </Link>

        <div className="glass-strong rounded-[2rem] border border-border p-8 shadow-soft">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </p>
      </motion.div>
    </main>
  )
}
