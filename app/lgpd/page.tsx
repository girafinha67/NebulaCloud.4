import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/motion/reveal'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LGPD — Nebula',
}

export default function LgpdPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-24 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary"><Shield className="size-6" /></span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">LGPD</h1>
              <p className="text-sm text-muted-foreground">Lei Geral de Proteção de Dados — Lei nº 13.709/2018</p>
            </div>
          </div>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            {[
              ['Nosso compromisso com a LGPD', 'A Nebula está comprometida com o cumprimento integral da Lei Geral de Proteção de Dados (LGPD). Adotamos práticas e controles que garantem a privacidade e a proteção dos dados pessoais de nossos usuários.'],
              ['Base legal para tratamento de dados', 'Tratamos seus dados pessoais com base nas seguintes hipóteses legais: execução de contrato (para prestação dos serviços), cumprimento de obrigação legal, legítimo interesse (segurança, prevenção a fraudes) e consentimento (para comunicações de marketing).'],
              ['Encarregado de Dados (DPO)', 'Nosso Encarregado pela Proteção de Dados (Data Protection Officer) está disponível para atender suas solicitações. Contato: privacidade@nebula.app'],
              ['Direitos do titular', 'Nos termos do Art. 18 da LGPD, você tem direito a: confirmação da existência de tratamento, acesso aos dados, correção, anonimização ou exclusão, portabilidade, informação sobre compartilhamento, e revogação do consentimento.'],
              ['Como exercer seus direitos', 'Envie sua solicitação para privacidade@nebula.app com o assunto "Solicitação LGPD". Responderemos em até 15 dias úteis conforme exigido pela legislação.'],
              ['Transferência internacional', 'Quando dados são transferidos para servidores fora do Brasil, garantimos proteção equivalente à prevista na LGPD, por meio de cláusulas contratuais adequadas.'],
              ['Reporte de incidentes', 'Em caso de incidente de segurança que possa gerar risco aos titulares, notificaremos a ANPD e os afetados dentro do prazo legal estabelecido.'],
            ].map(([title, content]) => (
              <div key={title}>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                <p className="mt-2">{content}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  )
}
