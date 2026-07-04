'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Bot, Server, Activity, ShieldCheck } from 'lucide-react'

const easeOut = [0.22, 1, 0.36, 1] as const

function FloatingCard({ children, className, delay = 0, float = 14 }: { children: React.ReactNode; className?: string; delay?: number; float?: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay, ease: easeOut }} className={className}>
      <motion.div animate={{ y: [0, -float, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay }} className="glass-strong rounded-3xl border border-border p-4 shadow-soft">
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }} className="mx-auto inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Infraestrutura online 24/7 · 99,99% de uptime
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05, ease: easeOut }} className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="text-gradient-silver">Hospedagem premium</span>
          <br />para tudo que você cria
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: easeOut }} className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Bots de Discord, WhatsApp e Telegram, APIs, sites, aplicações Node.js e servidores VPS. Tudo rodando 24 horas por dia com a elegância de um produto Apple.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: easeOut }} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/planos" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
            Ver planos <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-border glass px-6 py-3 text-sm text-foreground transition-colors hover:bg-secondary">
            Explorar dashboard
          </Link>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
        <FloatingCard delay={0.3}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><Bot className="size-5 text-foreground" /></span>
            <div className="text-left"><p className="text-sm font-medium">12.480</p><p className="text-xs text-muted-foreground">Bots ativos</p></div>
          </div>
        </FloatingCard>
        <FloatingCard delay={0.45} float={18}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><Server className="size-5 text-foreground" /></span>
            <div className="text-left"><p className="text-sm font-medium">38 ms</p><p className="text-xs text-muted-foreground">Latência</p></div>
          </div>
        </FloatingCard>
        <FloatingCard delay={0.6} float={12}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><Activity className="size-5 text-emerald-400" /></span>
            <div className="text-left"><p className="text-sm font-medium">99,99%</p><p className="text-xs text-muted-foreground">Uptime</p></div>
          </div>
        </FloatingCard>
        <FloatingCard delay={0.75} float={20}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><ShieldCheck className="size-5 text-foreground" /></span>
            <div className="text-left"><p className="text-sm font-medium">Anti-DDoS</p><p className="text-xs text-muted-foreground">Protegido</p></div>
          </div>
        </FloatingCard>
      </div>
    </section>
  )
}
