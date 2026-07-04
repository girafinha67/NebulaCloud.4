'use client'

import { Bell, Palette, Globe, Shield } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Reveal } from '@/components/motion/reveal'

export default function ConfiguracoesPage() {
  return (
    <AppShell title="Configurações">
      <div className="mx-auto max-w-3xl space-y-4">
        {[
          {
            icon: Bell,
            title: 'Notificações',
            desc: 'Gerencie como e quando você recebe notificações.',
            items: ['E-mail ao criar backup', 'E-mail ao reiniciar serviço', 'Alertas de uso de recursos', 'Notificações de faturas'],
          },
          {
            icon: Globe,
            title: 'Idioma & Região',
            desc: 'Configure o idioma e o fuso horário da sua conta.',
            items: ['Idioma: Português (BR)', 'Fuso horário: America/Sao_Paulo', 'Formato de data: DD/MM/AAAA', 'Moeda: BRL (R$)'],
          },
          {
            icon: Shield,
            title: 'Privacidade',
            desc: 'Controle suas preferências de privacidade.',
            items: ['Permitir análise de dados de uso', 'Compartilhar dados de erros', 'Marketing por e-mail'],
          },
        ].map((section) => (
          <Reveal key={section.title}>
            <div className="rounded-3xl border border-border glass p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-secondary"><section.icon className="size-5" /></span>
                <div>
                  <h2 className="font-medium">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-border bg-card/30 px-4 py-3">
                    <p className="text-sm">{item}</p>
                    <div className="relative h-5 w-9 cursor-pointer rounded-full bg-secondary transition-colors">
                      <div className="absolute left-0.5 top-0.5 size-4 rounded-full bg-foreground/50 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </AppShell>
  )
}
