'use client'

import { useState } from 'react'
import { Settings, Link2, Server, CreditCard, Mail, Shield, Globe, CheckCircle2, AlertCircle } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Section = 'general' | 'apis' | 'infrastructure' | 'financial' | 'smtp' | 'security'

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'general', label: 'Geral', icon: Globe },
  { id: 'apis', label: 'APIs & Integrações', icon: Link2 },
  { id: 'infrastructure', label: 'Infraestrutura', icon: Server },
  { id: 'financial', label: 'Financeiro', icon: CreditCard },
  { id: 'smtp', label: 'SMTP', icon: Mail },
  { id: 'security', label: 'Segurança', icon: Shield },
]

const integrations = [
  { name: 'Pterodactyl', status: 'disconnected', fields: ['URL', 'API Key'] },
  { name: 'Proxmox', status: 'disconnected', fields: ['URL', 'API Key', 'Secret'] },
  { name: 'Virtualizor', status: 'disconnected', fields: ['URL', 'API Key'] },
  { name: 'Cloudflare', status: 'connected', fields: ['API Key', 'Zone ID'] },
  { name: 'Discord', status: 'disconnected', fields: ['Bot Token', 'Client ID', 'Client Secret'] },
  { name: 'Mercado Pago', status: 'disconnected', fields: ['Access Token', 'Public Key'] },
  { name: 'Stripe', status: 'disconnected', fields: ['Secret Key', 'Publishable Key', 'Webhook Secret'] },
  { name: 'Asaas', status: 'disconnected', fields: ['API Key'] },
  { name: 'PayPal', status: 'disconnected', fields: ['Client ID', 'Client Secret'] },
  { name: 'SMTP', status: 'disconnected', fields: ['Host', 'Port', 'User', 'Password'] },
]

function IntegrationCard({ name, status, fields }: { name: string; status: string; fields: string[] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="rounded-2xl border border-border bg-card/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={cn('flex size-2 rounded-full', status === 'connected' ? 'bg-emerald-400' : 'bg-muted-foreground/40')} />
          <span className="font-medium text-sm">{name}</span>
          <span className={cn('rounded-full px-2 py-0.5 text-xs', status === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted text-muted-foreground')}>
            {status === 'connected' ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
        <button onClick={() => setExpanded(v => !v)} className="text-xs text-muted-foreground hover:text-foreground">
          {expanded ? 'Fechar' : 'Configurar'}
        </button>
      </div>
      {expanded && (
        <div className="mt-4 space-y-3">
          {fields.map((f) => (
            <div key={f}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{f}</label>
              <input type="password" placeholder={`Insira ${f}`} className="w-full rounded-xl border border-border bg-card/40 px-3 py-2 text-sm outline-none focus:border-accent/60" />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar</button>
            <button className="rounded-full border border-border px-4 py-2 text-xs transition-colors hover:bg-secondary">Testar Conexão</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminConfiguracoesPage() {
  const [section, setSection] = useState<Section>('general')

  return (
    <AppShell title="Configurações do Sistema">
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="rounded-3xl border border-border glass p-2 shadow-soft">
            <div className="flex flex-wrap gap-1">
              {sections.map((s) => (
                <button key={s.id} onClick={() => setSection(s.id)} className={cn('flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm transition-colors', section === s.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  <s.icon className="size-4" /> {s.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {section === 'general' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">Configurações Gerais</h2>
              <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: 'Nome da empresa', placeholder: 'Nebula' },
                  { label: 'Domínio', placeholder: 'nebula.app' },
                  { label: 'E-mail de contato', placeholder: 'contato@nebula.app' },
                  { label: 'Timezone', placeholder: 'America/Sao_Paulo' },
                  { label: 'Idioma padrão', placeholder: 'pt-BR' },
                  { label: 'Título SEO', placeholder: 'Nebula — Hospedagem Premium' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                    <input placeholder={f.placeholder} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">Descrição SEO</label>
                  <textarea rows={2} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none" placeholder="Descrição da empresa para mecanismos de busca" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar configurações</button>
                </div>
              </form>
            </div>
          </Reveal>
        )}

        {section === 'apis' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">APIs & Integrações</h2>
              <p className="mt-1 text-sm text-muted-foreground">Configure as integrações externas. Nenhuma credencial é armazenada no código.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {integrations.map((i) => <IntegrationCard key={i.name} {...i} />)}
              </div>
            </div>
          </Reveal>
        )}

        {section === 'infrastructure' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft space-y-4">
              <h2 className="font-medium">Infraestrutura</h2>
              <p className="text-sm text-muted-foreground">Configure nodes, datacenters e recursos de infraestrutura.</p>
              {[
                { label: 'Nodes VPS', desc: 'Gerenciar servidores físicos e virtuais' },
                { label: 'Datacenters', desc: 'Localidades e regiões disponíveis' },
                { label: 'Endereços IP', desc: 'Pool de IPs dedicados' },
                { label: 'Armazenamento', desc: 'Volumes e sistemas de arquivos' },
                { label: 'Monitoramento', desc: 'Alertas e thresholds de recursos' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-secondary">Configurar</button>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {section === 'financial' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft space-y-4">
              <h2 className="font-medium">Configurações Financeiras</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Moeda padrão', placeholder: 'BRL' },
                  { label: 'Taxa de imposto (%)', placeholder: '0' },
                  { label: 'Dias para vencimento', placeholder: '7' },
                  { label: 'Gateway principal', placeholder: 'Mercado Pago' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                    <input placeholder={f.placeholder} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/30 p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Renovação automática</p>
                  <p className="text-xs text-muted-foreground">Cobrar automaticamente na data de renovação</p>
                </div>
                <div className="relative h-5 w-9 cursor-pointer rounded-full bg-accent"><div className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white" /></div>
              </div>
              <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar</button>
            </div>
          </Reveal>
        )}

        {section === 'smtp' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <h2 className="font-medium">Configurações SMTP</h2>
              <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: 'Host', placeholder: 'smtp.gmail.com' },
                  { label: 'Porta', placeholder: '587' },
                  { label: 'Usuário', placeholder: 'noreply@nebula.app' },
                  { label: 'Senha', placeholder: '••••••••', type: 'password' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                    <input type={f.type ?? 'text'} placeholder={f.placeholder} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" />
                  </div>
                ))}
                <div className="flex gap-4">
                  {['SSL', 'TLS'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="size-4 rounded accent-[var(--accent)]" /> {opt}
                    </label>
                  ))}
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar</button>
                  <button type="button" className="rounded-full border border-border px-6 py-2.5 text-sm transition-colors hover:bg-secondary">Testar envio</button>
                </div>
              </form>
            </div>
          </Reveal>
        )}

        {section === 'security' && (
          <Reveal>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft space-y-4">
              <h2 className="font-medium">Segurança</h2>
              {[
                { label: 'Tempo de sessão (minutos)', placeholder: '60' },
                { label: 'Máximo de tentativas de login', placeholder: '5' },
                { label: 'Tempo de bloqueio (minutos)', placeholder: '30' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" />
                </div>
              ))}
              {[
                { label: '2FA obrigatório para admins', desc: 'Todos os administradores devem configurar 2FA' },
                { label: 'Firewall ativo', desc: 'Bloquear IPs suspeitos automaticamente' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 p-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="relative h-5 w-9 cursor-pointer rounded-full bg-secondary"><div className="absolute left-0.5 top-0.5 size-4 rounded-full bg-foreground/50" /></div>
                </div>
              ))}
              <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">Salvar</button>
            </div>
          </Reveal>
        )}
      </div>
    </AppShell>
  )
}
