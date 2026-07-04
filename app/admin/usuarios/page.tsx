'use client'

import { useState } from 'react'
import { Search, Plus, MoreHorizontal, UserX, Ban, KeyRound } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const users = [
  { id: 'u1', name: 'Lucas Andrade', email: 'lucas@email.com', plan: 'Pro', role: 'client', status: 'ativo', joined: '15/01/2025', spent: 'R$ 588' },
  { id: 'u2', name: 'Marina Costa', email: 'marina@email.com', plan: 'Ultra', role: 'client', status: 'ativo', joined: '03/02/2025', spent: 'R$ 1.188' },
  { id: 'u3', name: 'Rafael Oliveira', email: 'rafael@email.com', plan: 'VPS', role: 'admin', status: 'ativo', joined: '20/12/2024', spent: 'R$ 1.908' },
  { id: 'u4', name: 'Bianca Souza', email: 'bianca@email.com', plan: 'Starter', role: 'client', status: 'pendente', joined: '10/06/2025', spent: 'R$ 76' },
  { id: 'u5', name: 'Pedro Lima', email: 'pedro@email.com', plan: 'Pro', role: 'client', status: 'suspenso', joined: '01/03/2025', spent: 'R$ 245' },
]

const statusColor: Record<string, string> = {
  ativo: 'bg-emerald-500/10 text-emerald-400',
  pendente: 'bg-amber-500/10 text-amber-400',
  suspenso: 'bg-destructive/10 text-destructive',
  banido: 'bg-muted text-muted-foreground',
}

export default function AdminUsuariosPage() {
  const [search, setSearch] = useState('')
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppShell title="Gestão de Usuários">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2.5 sm:w-72">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar usuário..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              <Plus className="size-4" /> Novo usuário
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-border glass p-6 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 font-medium">Usuário</th>
                    <th className="pb-3 font-medium">Plano</th>
                    <th className="pb-3 font-medium">Função</th>
                    <th className="pb-3 font-medium">Cadastro</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Total gasto</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-b border-border/60 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-medium">
                            {u.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                          <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{u.plan}</td>
                      <td className="py-4">
                        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs', u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground')}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 text-muted-foreground">{u.joined}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${statusColor[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="py-4">{u.spent}</td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-400" title="Suspender"><UserX className="size-4" /></button>
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" title="Banir"><Ban className="size-4" /></button>
                          <button className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="Resetar senha"><KeyRound className="size-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </AppShell>
  )
}
