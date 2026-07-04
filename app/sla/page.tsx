import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/motion/reveal'
import { Activity, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SLA — Acordo de Nível de Serviço — Nebula',
}

const commitments = [
  { label: 'Uptime garantido', value: '99,99%', detail: 'Por mês calendário' },
  { label: 'Latência máxima (rede)', value: '< 5ms', detail: 'Dentro do mesmo datacenter' },
  { label: 'Tempo de resposta do suporte', value: '< 4 min', detail: 'Média mensal — chat ao vivo' },
  { label: 'Tempo de resposta (ticket)', value: '< 2 h', detail: 'Horário comercial' },
  { label: 'RTO (Recovery Time Objective)', value: '< 1 h', detail: 'Em caso de falha grave' },
  { label: 'RPO (Recovery Point Objective)', value: '24 h', detail: 'Backups automáticos diários' },
]

const credits = [
  { range: '99,90% – 99,99%', credit: '5%' },
  { range: '99,00% – 99,90%', credit: '15%' },
  { range: '95,00% – 99,00%', credit: '30%' },
  { range: '< 95,00%', credit: '50%' },
]

export default function SlaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-24 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary"><Activity className="size-6" /></span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Acordo de Nível de Serviço</h1>
              <p className="text-sm text-muted-foreground">Service Level Agreement (SLA) — Vigência: 01/07/2025</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c) => (
              <div key={c.label} className="rounded-3xl border border-border glass p-5 shadow-soft">
                <p className="text-2xl font-semibold tracking-tight">{c.value}</p>
                <p className="mt-1 text-sm font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-base font-semibold text-foreground">1. Definição de disponibilidade</h2>
              <p className="mt-2">A disponibilidade é calculada mensalmente como: (Tempo total − Tempo de inatividade não programada) / Tempo total × 100. Manutenções programadas com 48 horas de antecedência não são contabilizadas como indisponibilidade.</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground">2. Créditos por indisponibilidade</h2>
              <p className="mt-2 mb-3">Em caso de uptime mensal abaixo do garantido, créditos são aplicados automaticamente na próxima fatura:</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] rounded-2xl border border-border text-sm overflow-hidden">
                  <thead className="bg-card/40">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Uptime mensal</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Crédito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credits.map((r, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-4 py-3">{r.range}</td>
                        <td className="px-4 py-3 font-semibold text-foreground">{r.credit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground">3. Exclusões</h2>
              <ul className="mt-2 space-y-2">
                {['Indisponibilidade causada pelo próprio usuário', 'Ataques DDoS de magnitude excepcional', 'Falhas em serviços de terceiros (DNS externo, etc.)', 'Força maior ou eventos fora de nosso controle'].map((item) => (
                  <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground">4. Como solicitar créditos</h2>
              <p className="mt-2">Créditos são aplicados automaticamente quando detectados. Para casos não detectados automaticamente, abra um ticket em até 30 dias após o incidente com os detalhes do período afetado.</p>
            </div>
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  )
}
