import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Termos de Serviço — Nebula',
}

export default function TermosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <section className="relative px-4 pb-24 pt-36 sm:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Termos de Serviço</h1>
          <p className="mt-2 text-sm text-muted-foreground">Última atualização: 01 de julho de 2025</p>
          <div className="mt-8 prose-nebula space-y-6 text-sm leading-relaxed text-muted-foreground">
            {[
              ['1. Aceitação dos Termos', 'Ao acessar ou usar os serviços da Nebula, você concorda em ficar vinculado a estes Termos de Serviço. Se não concordar, não utilize nossos serviços.'],
              ['2. Descrição do Serviço', 'A Nebula fornece serviços de hospedagem para bots, aplicações web, APIs e servidores VPS. Os serviços são fornecidos "no estado em que se encontram", sujeitos aos SLAs específicos de cada plano.'],
              ['3. Uso Aceitável', 'É expressamente proibido utilizar nossos serviços para: envio de spam, atividades ilegais, mineração de criptomoedas não autorizada, hospedagem de conteúdo protegido por direitos autorais sem permissão, ataques DDoS ou qualquer atividade que prejudique outros usuários.'],
              ['4. Privacidade e Dados', 'A coleta e uso de dados pessoais são regidos pela nossa Política de Privacidade e pela Lei Geral de Proteção de Dados (LGPD). Você retém a propriedade de todos os dados armazenados em nossos servidores.'],
              ['5. Pagamentos e Reembolsos', 'Os serviços são cobrados mensalmente com renovação automática. Todos os planos incluem garantia de reembolso integral por 7 dias. Após este período, não há reembolsos pro-rata para cancelamentos antecipados.'],
              ['6. Disponibilidade e SLA', 'Nos comprometemos com 99,99% de uptime mensal. Em caso de falha abaixo deste limite, créditos serão aplicados conforme o SLA contratado.'],
              ['7. Suspensão e Cancelamento', 'Reservamos o direito de suspender ou cancelar contas que violem estes termos, mediante notificação prévia quando possível. Contas com pagamento em atraso podem ser suspensas após 7 dias.'],
              ['8. Limitação de Responsabilidade', 'A Nebula não é responsável por perdas de dados, lucros cessantes ou danos indiretos decorrentes do uso ou impossibilidade de uso dos serviços.'],
              ['9. Alterações nos Termos', 'Podemos modificar estes Termos a qualquer momento, notificando os usuários com pelo menos 15 dias de antecedência por e-mail.'],
              ['10. Lei Aplicável', 'Estes Termos são regidos pelas leis da República Federativa do Brasil. O foro competente é o da Comarca de São Paulo, SP.'],
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
