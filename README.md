# Nebula v2 ☁️

Plataforma SaaS completa de hospedagem premium para bots Discord, APIs e VPS.

## Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI**: React 19 + Tailwind CSS v4 + motion/react + Radix UI + lucide-react
- **Auth**: NextAuth.js v5 (Credentials + JWT sessions)
- **DB**: PostgreSQL + Prisma ORM
- **Fonts**: Geist Sans & Geist Mono

## Setup Local

### 1. Clone e instale dependências

```bash
git clone https://github.com/girafinha67/nebula-v2.git
cd nebula-v2
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nebula_v2"
AUTH_SECRET="cole-aqui-um-secret-forte"   # gere com: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Configure o banco de dados

```bash
npm run db:push        # aplica o schema (dev)
# ou em produção:
npm run db:migrate     # roda as migrations
```

### 4. Inicie o servidor

```bash
npm run dev            # http://localhost:3000
```

## Estrutura

```
app/
├── (auth pages)         → login, registro
├── dashboard/           → painel do cliente
├── servidores/          → gerenciamento de servidores
├── planos/              → planos e preços
├── faturas/             → histórico de cobranças
├── suporte/             → tickets de suporte
├── backups/             → gerenciamento de backups
├── logs/                → logs dos servidores
├── afiliados/           → programa de afiliados
├── perfil/              → perfil do usuário
├── configuracoes/       → configurações da conta
├── admin/               → área administrativa completa
│   ├── usuarios/
│   ├── financeiro/
│   ├── planos/
│   ├── cupons/
│   ├── tickets/
│   ├── servidores/
│   ├── logs/
│   ├── notificacoes/
│   └── configuracoes/
└── (páginas públicas)   → sobre, status, faq, blog, termos, etc.

components/
├── app/                 → app-shell, area-chart, empty-state
├── auth/                → auth-layout, floating-input
├── home/                → hero, stats, services, features, testimonials, faq
├── motion/              → reveal (animações de entrada)
├── plans/               → plan-cards
└── site/                → navbar, footer

auth.ts                  → configuração NextAuth v5
middleware.ts            → proteção de rotas (JWT)
prisma/schema.prisma     → schema do banco (User, Account, Session)
lib/prisma.ts            → singleton PrismaClient
```

## Autenticação

- **Registro**: `POST /api/auth/register` — cria usuário com senha hasheada (bcrypt)
- **Login**: NextAuth Credentials Provider → JWT session
- **Proteção**: middleware protege todas as rotas privadas automaticamente
- **Roles**: `CLIENT` | `ADMIN` | `OWNER`

## Deploy (Vercel)

```bash
# Instale a Vercel CLI
npm i -g vercel
vercel

# Configure as env vars no dashboard da Vercel:
# DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL
```

## Licença

MIT
