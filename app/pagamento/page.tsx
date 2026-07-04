'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { CreditCard, QrCode, ShieldCheck, Lock, BadgeCheck, Copy, Hexagon } from 'lucide-react'
import { FloatingInput } from '@/components/auth/floating-input'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { siteName } from '@/lib/site'

type Method = 'pix' | 'card'

export default function PagamentoPage() {
  const [method, setMethod] = useState<Method>('pix')
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div className="relative mx-auto max-w-5xl">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"><Hexagon className="size-4" /></span>
          <span className="text-[15px] font-semibold tracking-tight">{siteName}</span>
        </Link>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-border glass p-6 shadow-soft sm:p-8">
              <h1 className="text-2xl font-semibold tracking-tight">Finalizar pagamento</h1>
              <p className="mt-1 text-sm text-muted-foreground">Escolha a forma de pagamento preferida</p>
              <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card/30 p-1.5">
                {([{ id: 'pix', label: 'PIX', icon: QrCode }, { id: 'card', label: 'Cartão', icon: CreditCard }] as const).map((m) => (
                  <button key={m.id} onClick={() => setMethod(m.id)} className={cn('relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition-colors', method === m.id ? 'text-foreground' : 'text-muted-foreground')}>
                    {method === m.id && <motion.span layoutId="method-pill" className="absolute inset-0 rounded-xl bg-secondary" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <m.icon className="relative size-4" />
                    <span className="relative">{m.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {method === 'pix' ? (
                    <motion.div key="pix" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="flex flex-col items-center text-center">
                      <div className="grid size-44 place-items-center rounded-3xl border border-border bg-card/50 p-4"><QrCode className="size-28 text-foreground" /></div>
                      <p className="mt-4 text-sm text-muted-foreground">Escaneie o QR Code com o app do seu banco</p>
                      <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-colors hover:bg-secondary">
                        <Copy className="size-4" /> Copiar código PIX
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-4">
                      <div className="relative h-44 overflow-hidden rounded-3xl border border-border glass-strong p-5 shadow-soft">
                        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-accent/20 blur-3xl" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{siteName} Card</span>
                          <Hexagon className="size-6" />
                        </div>
                        <p className="mt-8 font-mono text-lg tracking-[0.2em]">•••• •••• •••• ••••</p>
                        <div className="mt-5 flex justify-between font-mono text-xs text-muted-foreground">
                          <span>SEU NOME</span><span>MM/AA</span>
                        </div>
                      </div>
                      <FloatingInput label="Número do cartão" />
                      <FloatingInput label="Nome no cartão" />
                      <div className="grid grid-cols-2 gap-4">
                        <FloatingInput label="Validade" />
                        <FloatingInput label="CVV" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Lock className="size-3.5" /> Criptografia SSL 256-bit</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> Pagamento protegido</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sticky top-6 rounded-[2rem] border border-border glass-strong p-6 shadow-soft sm:p-8">
              <h2 className="font-medium">Resumo do pedido</h2>
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-accent text-accent-foreground"><BadgeCheck className="size-5" /></span>
                  <div>
                    <p className="text-sm font-medium">Plano Pro</p>
                    <p className="text-xs text-muted-foreground">Mensal · renovação automática</p>
                  </div>
                </div>
                <p className="text-sm font-medium">R$ 49</p>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>R$ 49,00</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Impostos</dt><dd>R$ 0,00</dd></div>
                <div className="flex justify-between text-emerald-400"><dt>Desconto primeiro mês</dt><dd>− R$ 10,00</dd></div>
              </dl>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                <span className="text-sm text-muted-foreground">Total hoje</span>
                <span className="text-2xl font-semibold tracking-tight">R$ 39,00</span>
              </div>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                Pagar R$ 39,00
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Você pode cancelar a qualquer momento.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
