'use client'

import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

const plans = [
  { id: 'starter', name: 'Starter', price: 19, vcores: 1, ram: '512 MB', disk: '5 GB', bandwidth: '100 GB', active: true, recommended: false, subscribers: 234 },
  { id: 'pro', name: 'Pro', price: 49, vcores: 2, ram: '2 GB', disk: '20 GB', bandwidth: '500 GB', active: true, recommended: true, subscribers: 1842 },
  { id: 'ultra', name: 'Ultra', price: 99, vcores: 4, ram: '8 GB', disk: '60 GB', bandwidth: 'Ilimitada', active: true, recommended: false, subscribers: 876 },
  { id: 'vps', name: 'VPS', price: 159, vcores: 8, ram: '16 GB', disk: '200 GB', bandwidth: 'Ilimitada', active: true, recommended: false, subscribers: 312 },
]

export default function AdminPlanosPage() {
  return (
    <AppShell title="Gestão de Planos">
      <div className="mx-auto max-w-5xl space-y-5">
        <Reveal>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{plans.length} planos cadastrados</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              <Plus className="size-4" /> Novo plano
            </button>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((p) => (
            <Reveal key={p.id}>
              <div className="rounded-3xl border border-border glass p-6 shadow-soft">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      {p.recommended && <Star className="size-4 fill-accent text-accent" />}
                    </div>
                    <p className="text-2xl font-semibold tracking-tight mt-1">R$ {p.price}<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${p.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                    {p.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[{ k: 'vCores', v: p.vcores }, { k: 'RAM', v: p.ram }, { k: 'Disco', v: p.disk }, { k: 'Banda', v: p.bandwidth }].map((spec) => (
                    <div key={spec.k} className="rounded-2xl border border-border bg-card/30 px-3 py-2">
                      <p className="text-[10px] uppercase text-muted-foreground">{spec.k}</p>
                      <p className="text-sm font-medium">{spec.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{p.subscribers} assinantes</p>
                  <div className="flex gap-1">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Pencil className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
