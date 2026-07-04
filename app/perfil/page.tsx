'use client'

import { useState } from 'react'
import { User, Lock, Mail, Shield, Monitor, Camera } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { FloatingInput } from '@/components/auth/floating-input'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'password' | 'security' | 'sessions'
const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'password', label: 'Senha', icon: Lock },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'sessions', label: 'Sessões', icon: Monitor },
]

export default function PerfilPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <AppShell title="Meu Perfil">
      <div className="mx-auto max-w-3xl space-y-5">
        <Reveal>
          <div className="rounded-3xl border border-border glass p-4 shadow-soft">
            <div className="flex gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn('flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm transition-colors', tab === t.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground')}
                >
                  <t.icon className="size-4" /> {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {tab === 'profile' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="grid size-16 place-items-center rounded-full bg-secondary text-2xl font-semibold">
                    {user?.name?.slice(0, 2).toUpperCase() ?? 'NA'}
                  </span>
                  <button className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow" aria-label="Trocar avatar">
                    <Camera className="size-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent capitalize">{user?.plan ?? 'Sem plano'}</span>
                </div>
              </div>
              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <FloatingInput label="Nome completo" defaultValue={user?.name ?? ''} />
                <FloatingInput label="E-mail" type="email" defaultValue={user?.email ?? ''} />
                <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar alterações</button>
              </form>
            </div>
          </Reveal>
        )}

        {tab === 'password' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">Alterar senha</h2>
              <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <FloatingInput label="Senha atual" type="password" />
                <FloatingInput label="Nova senha" type="password" />
                <FloatingInput label="Confirmar nova senha" type="password" />
                <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Alterar senha</button>
              </form>
            </div>
          </Reveal>
        )}

        {tab === 'security' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft space-y-5">
              <div>
                <h2 className="font-medium">Autenticação em dois fatores (2FA)</h2>
                <p className="mt-1 text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta.</p>
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Authenticator App</p>
                      <p className="text-xs text-muted-foreground">{user?.twoFactorEnabled ? 'Ativado' : 'Desativado'}</p>
                    </div>
                  </div>
                  <button className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary">
                    {user?.twoFactorEnabled ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {tab === 'sessions' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">Sessões ativas</h2>
              <div className="mt-4 space-y-3">
                {[
                  { device: 'Chrome — Windows 11', ip: '177.22.33.44', location: 'São Paulo, BR', current: true, date: 'Agora' },
                  { device: 'Safari — iPhone 15', ip: '177.22.33.45', location: 'São Paulo, BR', current: false, date: '2 horas atrás' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{s.device}</p>
                        <p className="text-xs text-muted-foreground">{s.ip} · {s.location} · {s.date}</p>
                      </div>
                    </div>
                    {s.current ? (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">Atual</span>
                    ) : (
                      <button className="rounded-full border border-destructive/30 px-3 py-1 text-xs text-destructive transition-colors hover:bg-destructive/10">Revogar</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </AppShell>
  )
}
