# 🏢 INNEXAR - Reorganização Completa dos Projetos

**Data de Início:** 28/12/2025  
**Status:** 🔄 EM ANDAMENTO  
**Última Atualização:** 28/12/2025

---

## 📋 CONTEXTO

A **INNEXAR** é a empresa mãe que possui diversos produtos e ferramentas:
- **Mecânica365** - SaaS para gestão de oficinas mecânicas
- **CRM Innexar** - CRM interno da empresa
- **Site Institucional** - innexar.app
- **Portal de Afiliados** - Sistema multi-SaaS de afiliados
- **Infraestrutura** - Mailcow (email), Traefik (proxy/SSL)

### Problema Anterior
Todos os projetos estavam misturados dentro de `/projetos/mecanica365/`, causando:
- Confusão entre código da empresa vs código do produto
- Dificuldade de manutenção
- Impossibilidade de escalar para novos SaaS

### Solução
Reorganizar tudo separando **INNEXAR (empresa)** dos **PRODUTOS (SaaS)**.

---

## 🎯 OBJETIVO PRINCIPAL

Criar o **INNEXAR HQ** - Um painel central para gerenciar:
- 👥 Equipe/Funcionários (roles: Admin, Suporte, Marketing, Financeiro, Dev)
- 🤝 Afiliados de TODOS os SaaS
- 📦 Produtos SaaS (Mecânica365, futuros...)
- 💬 Suporte centralizado
- 📈 Marketing e campanhas
- 💰 Financeiro/Billing

---

## 📁 NOVA ESTRUTURA DE PASTAS

```
/projetos/
│
├── innexar/                          🏢 EMPRESA (Hub Central)
│   │
│   ├── hq/                           🎯 INNEXAR HQ (Painel Central)
│   │   ├── frontend/                 → Next.js 14 + Tailwind
│   │   └── backend/                  → NestJS (✅ já movido)
│   │
│   ├── crm/                          📊 CRM Interno (✅ já movido)
│   │   ├── backend/                  → FastAPI (Python)
│   │   └── frontend/                 → Next.js
│   │
│   ├── site/                         🌐 Site Institucional (✅ já movido)
│   │
│   ├── affiliate-portal/             👤 Portal do Afiliado (✅ já movido)
│   │
│   ├── infrastructure/               🔧 Infraestrutura (✅ já movido)
│   │   ├── mailcow/                  → Servidor email
│   │   └── traefik/                  → Proxy/SSL
│   │
│   └── shared/                       📦 Compartilhado
│       ├── ui/                       → Design System
│       └── types/                    → Tipos TypeScript
│
├── sas/                             📦 SOFTWARE AS A SERVICE
│   └── workshop/                     🔧 PRODUTO: Mecânica365
│       ├── api/                      → Backend NestJS
│       ├── app/                      → Frontend clientes
│       ├── admin/                    → Admin do produto
│       ├── dealers/                  → Módulo dealers
│       ├── vehicle-history/          → Histórico veículos
│       └── docs/                     → Documentação
```

---

## ✅ TAREFAS CONCLUÍDAS

| # | Tarefa | Status |
|---|--------|--------|
| 1 | Criar estrutura `/projetos/innexar/` | ✅ FEITO |
| 2 | Mover `site-innexar` → `innexar/site` | ✅ FEITO |
| 3 | Mover `innexar-crm` → `innexar/crm` | ✅ FEITO |
| 4 | Mover `mailcow` → `innexar/infrastructure/mailcow` | ✅ FEITO |
| 5 | Mover `traefik` → `innexar/infrastructure/traefik` | ✅ FEITO |
| 6 | Mover `innexar-backend` → `innexar/hq/backend` | ✅ FEITO |
| 7 | Mover `affiliate-portal` → `innexar/affiliate-portal` | ✅ FEITO |
| 8 | Criar estrutura SAS e mover Mecânica365 para `sas/workshop/` | ✅ FEITO |
| 9 | Remover pasta `mecanica365/` antiga | ✅ FEITO |

---

## 🔄 TAREFAS PENDENTES

| # | Tarefa | Prioridade | Detalhes |
|---|--------|------------|----------|
| 10 | **Criar INNEXAR HQ Frontend** | 🔴 ALTA | Next.js 14 + Tailwind + shadcn/ui |
| 11 | Migrar código de afiliados do admin antigo | 🔴 ALTA | Copiar lógica de `sas/workshop/admin/affiliates` |
| 12 | Adicionar módulo de Team no HQ | 🟡 MÉDIA | Gestão de funcionários e roles |
| 13 | Criar docker-compose global | 🟡 MÉDIA | Orquestração de todos os serviços |
| 14 | Atualizar backend HQ com novos módulos | 🟡 MÉDIA | Team, Support, Marketing |
| 15 | Criar documentação completa de cada projeto | 🟢 BAIXA | READMEs atualizados |

---

## 🎨 INNEXAR HQ - ESPECIFICAÇÃO DO FRONTEND

### Tecnologias
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Componentes:** shadcn/ui + Radix UI
- **Ícones:** Lucide React
- **Estado:** React Context / Zustand
- **Forms:** React Hook Form + Zod

### Páginas Principais

```
/                           → Redirect para /overview
/(auth)/login               → Login funcionários
/(auth)/register            → Registro (apenas admin cria)

/(dashboard)/overview       → Dashboard principal com KPIs
/(dashboard)/team           → Gestão de funcionários
/(dashboard)/affiliates     → Afiliados multi-SaaS
/(dashboard)/products       → Produtos SaaS (Mecânica365, etc.)
/(dashboard)/support        → Tickets centralizados
/(dashboard)/billing        → Financeiro
/(dashboard)/marketing      → Campanhas
/(dashboard)/settings       → Configurações
```

### Roles de Funcionários

| Role | Acesso |
|------|--------|
| **Super Admin** | Tudo |
| **Admin** | Usuários, produtos, afiliados |
| **Suporte** | Tickets, chat, clientes |
| **Marketing** | Campanhas, leads, afiliados (view) |
| **Financeiro** | Pagamentos, comissões, relatórios |
| **Dev** | Logs, integrações, status técnico |

### Design

```css
/* Paleta de Cores */
--background: #09090B      /* Fundo principal */
--card: #18181B            /* Cards */
--border: #27272A          /* Bordas */
--primary: #3B82F6         /* Azul Innexar */
--primary-hover: #2563EB
--success: #10B981         /* Verde */
--warning: #F59E0B         /* Laranja */
--error: #EF4444           /* Vermelho */
--text: #FAFAFA            /* Texto principal */
--muted: #71717A           /* Texto secundário */
```

---

## 🔧 INNEXAR HQ - ESPECIFICAÇÃO DO BACKEND

### Backend de Afiliados (renomeado)
- ✅ **Container:** `innexar-affiliate-backend-prod`
- ✅ **Descrição:** Sistema de Afiliados Multi-SaaS
- ✅ **Módulos:** `auth`, `affiliate`, `products`, `health`
- ✅ **URL:** https://apiaf.innexar.app

### Backend do HQ (a criar)
- ⏳ **Container:** `innexar-hq-backend-prod` (futuro)
- ⏳ **Módulos:** `team`, `support`, `marketing`, `billing`, `integrations`
- ⏳ **URL:** https://api-hq.innexar.app (futuro)

### Módulos a Criar
- ⏳ `team` - Gestão de funcionários e roles
- ⏳ `support` - Tickets centralizados
- ⏳ `marketing` - Campanhas e leads
- ⏳ `billing` - Financeiro e comissões
- ⏳ `integrations` - OpenProject, CRM, etc.

### Banco de Dados
- **ORM:** Prisma
- **DB:** PostgreSQL
- **Cache:** Redis (futuro)

---

## 📦 MECÂNICA365 - ESTRUTURA FINAL

```
sas/workshop/
├── api/                    # Backend NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── workshops/     # Oficinas
│   │   │   ├── vehicles/      # Veículos
│   │   │   ├── services/      # Serviços
│   │   │   ├── customers/     # Clientes
│   │   │   ├── billing/       # Faturamento
│   │   │   └── ...
│   │   └── common/
│   └── prisma/
│
├── app/                    # Frontend clientes (oficinas)
│   └── ...                 # Next.js
│
├── admin/                  # Admin do PRODUTO (não afiliados!)
│   └── ...                 # Gestão de tenants, planos, etc.
│
├── dealers/                # Módulo dealers
└── vehicle-history/        # Histórico de veículos
```

**IMPORTANTE:** O admin do Mecânica365 NÃO terá mais gestão de afiliados. Isso vai para o INNEXAR HQ.

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### 1. Criar INNEXAR HQ Frontend
```bash
cd /projetos/innexar/hq/frontend
# Criar package.json, tsconfig, tailwind.config, etc.
# Criar páginas e componentes
```

### 2. Estrutura de Arquivos do HQ Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── overview/page.tsx
│   │   │   ├── team/page.tsx
│   │   │   ├── affiliates/page.tsx
│   │   │   ├── products/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # Botões, inputs, cards...
│   │   ├── layout/          # Sidebar, header, footer
│   │   └── dashboard/       # Widgets, gráficos
│   ├── lib/
│   │   ├── api.ts           # Cliente API
│   │   └── utils.ts
│   ├── hooks/
│   └── types/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🔗 URLs FINAIS (Produção)

| Serviço | URL |
|---------|-----|
| **INNEXAR HQ** | hq.innexar.app |
| **Site Institucional** | innexar.app |
| **Portal Afiliados** | afiliados.innexar.app |
| **CRM Interno** | crm.innexar.app |
| **Mecânica365 App** | app.mecanica365.com |
| **Mecânica365 Admin** | admin.mecanica365.com |
| **Mecânica365 API** | api.mecanica365.com |

---

## 📝 COMANDOS ÚTEIS

### Verificar estrutura criada
```bash
ls -la /projetos/innexar/
ls -la /projetos/sas/workshop/
```

### Instalar dependências do HQ Frontend
```bash
cd /projetos/innexar/hq/frontend
npm install
```

### Rodar HQ em desenvolvimento
```bash
cd /projetos/innexar/hq/frontend
npm run dev
# Acessa em http://localhost:3000
```

### Rodar HQ Backend
```bash
cd /projetos/innexar/hq/backend
npm install
npm run start:dev
# API em http://localhost:3001
```

---

## ⚠️ NOTAS IMPORTANTES

1. **Reorganização SAS completa** - Mecânica365 agora está em `sas/workshop/`

2. **O backend do HQ já existe** em `innexar/hq/backend` com módulos de auth, affiliate e products

3. **O frontend do HQ precisa ser criado** - é a próxima tarefa principal

4. **Arquivos de ambiente (.env)** precisam ser configurados para cada projeto

5. **Docker Compose global** será criado em `innexar/infrastructure/docker-compose.yml`

---

## 📞 CONTATO

Para dúvidas sobre esta reorganização, consulte este documento ou peça ajuda ao assistente AI.

---

**Última atualização:** 28/12/2025 19:10 UTC

