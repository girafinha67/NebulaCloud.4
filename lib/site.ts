export const siteName = 'Nebula'
export const siteDescription =
  'Hospedagem premium 24/7 para bots de Discord, WhatsApp e Telegram, APIs, sites, aplicações Node.js e servidores VPS.'

export const mainNav = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Planos', href: '/planos' },
  { label: 'Status', href: '/status' },
  { label: 'Suporte', href: '/suporte' },
]

export const stats = [
  { value: '12.480', label: 'Bots ativos' },
  { value: '99,99%', label: 'Uptime garantido' },
  { value: '38 ms', label: 'Latência média' },
  { value: '24/7', label: 'Suporte online' },
]

export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Para seus primeiros projetos',
    price: 'R$ 19',
    period: '/mês',
    recommended: false,
    specs: [
      { label: 'vCores', value: '1' },
      { label: 'RAM', value: '512 MB' },
      { label: 'SSD', value: '5 GB' },
      { label: 'Banda', value: '100 GB' },
    ],
    features: [
      'Bots Discord / WhatsApp / Telegram',
      'Reinício automático',
      'Logs em tempo real',
      'SSL gratuito',
      'Suporte via ticket',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Para projetos em crescimento',
    price: 'R$ 49',
    period: '/mês',
    recommended: true,
    specs: [
      { label: 'vCores', value: '2' },
      { label: 'RAM', value: '2 GB' },
      { label: 'SSD', value: '20 GB' },
      { label: 'Banda', value: '500 GB' },
    ],
    features: [
      'Tudo do Starter',
      'Deploy via Git',
      'Backups automáticos',
      'Anti-DDoS avançado',
      'Suporte prioritário',
      'Domínio personalizado',
    ],
  },
  {
    id: 'ultra',
    name: 'Ultra',
    tagline: 'Para alta disponibilidade',
    price: 'R$ 99',
    period: '/mês',
    recommended: false,
    specs: [
      { label: 'vCores', value: '4' },
      { label: 'RAM', value: '8 GB' },
      { label: 'SSD', value: '60 GB' },
      { label: 'Banda', value: 'Ilimitada' },
    ],
    features: [
      'Tudo do Pro',
      'IP dedicado',
      'Escalonamento automático',
      'Monitor 24/7',
      'SLA 99,99%',
      'Gerente de conta',
    ],
  },
  {
    id: 'vps',
    name: 'VPS',
    tagline: 'Controle total do servidor',
    price: 'R$ 159',
    period: '/mês',
    recommended: false,
    specs: [
      { label: 'vCores', value: '8' },
      { label: 'RAM', value: '16 GB' },
      { label: 'NVMe', value: '200 GB' },
      { label: 'Banda', value: 'Ilimitada' },
    ],
    features: [
      'Acesso root completo',
      'Painel KVM',
      'IP dedicado',
      'Snapshots ilimitados',
      'Failover automático',
      'Suporte 24/7',
    ],
  },
]

export const faqs = [
  {
    q: 'Quanto tempo leva para ativar meu serviço?',
    a: 'A ativação é instantânea após a confirmação do pagamento. Você receberá as credenciais de acesso por e-mail em até 2 minutos.',
  },
  {
    q: 'Posso fazer upgrade ou downgrade de plano a qualquer momento?',
    a: 'Sim. Você pode alterar seu plano a qualquer momento pelo painel de controle, sem interrupção do serviço. A diferença de valor é calculada proporcionalmente.',
  },
  {
    q: 'Como funciona a proteção Anti-DDoS?',
    a: 'Nossa proteção Anti-DDoS atua na borda da rede, mitigando automaticamente ataques antes que cheguem ao seu servidor. Ela é ativa 24/7 sem necessidade de configuração.',
  },
  {
    q: 'Vocês oferecem garantia de devolução?',
    a: 'Sim. Todos os planos possuem garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100% do valor pago, sem perguntas.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Sim. Todos os dados são armazenados em data centers com certificação ISO 27001, com backups automáticos e criptografia em repouso e em trânsito.',
  },
  {
    q: 'Posso hospedar múltiplos bots em um único plano?',
    a: 'Isso depende dos recursos disponíveis no seu plano. No plano Pro ou superior, é possível hospedar múltiplos bots dentro dos limites de vCPU e RAM contratados.',
  },
]

export const testimonials = [
  {
    name: 'Lucas Andrade',
    role: 'Desenvolvedor de bots',
    quote:
      'Migrei meus 3 bots para a Nebula e nunca mais tive queda. A interface é limpa e o suporte responde em minutos.',
  },
  {
    name: 'Marina Costa',
    role: 'Criadora de conteúdo',
    quote:
      'O painel é tão intuitivo que consigo gerenciar meu bot de WhatsApp sem precisar de ajuda técnica. Recomendo demais.',
  },
  {
    name: 'Rafael Oliveira',
    role: 'CTO — StartupBR',
    quote:
      'Usamos a Nebula para hospedar nossa API de produção. Performance excelente e zero downtime em 8 meses.',
  },
]
