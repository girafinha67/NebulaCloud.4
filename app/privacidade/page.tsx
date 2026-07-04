import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Nebula',
}

export default function PrivacidadePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-24 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Política de Privacidade</h1>
          <p className="mt-2 text-sm text-muted-foreground">Última atualização: 01 de julho de 2025</p>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            {[
              ['1. Informações que coletamos', 'Coletamos informações que você nos fornece diretamente (nome, e-mail, dados de pagamento) e informações geradas pelo uso dos serviços (logs de acesso, métricas de uso, endereços IP).'],
              ['2. Como usamos suas informações', 'Utilizamos seus dados para: prestar e melhorar os serviços, processar pagamentos, enviar comunicações sobre sua conta, detectar e prevenir fraudes, e cumprir obrigações legais.'],
              ['3. Compartilhamento de dados', 'Não vendemos seus dados pessoais. Podemos compartilhá-los com: processadores de pagamento (Mercado Pago, Stripe), provedores de infraestrutura, e autoridades quando exigido por lei.'],
              ['4. Segurança dos dados', 'Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia em repouso e em trânsito, controle de acesso e auditorias regulares de segurança.'],
              ['5. Retenção de dados', 'Mantemos seus dados pessoais enquanto sua conta estiver ativa ou conforme necessário para os fins descritos nesta política. Dados de cobrança são retidos por 5 anos conforme exigido pela lei brasileira.'],
              ['6. Seus direitos (LGPD)', 'Conforme a Lei Geral de Proteção de Dados, você tem direito de: acessar seus dados, corrigir dados incorretos, solicitar exclusão, revogar consentimento, e portabilidade dos dados.'],
              ['7. Cookies', 'Utilizamos cookies essenciais para funcionamento da plataforma, cookies de análise (anonimizados) e cookies de preferências. Você pode recusar cookies não essenciais a qualquer momento.'],
              ['8. Contato', 'Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso DPO: privacidade@nebula.app'],
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
