# 🎯 INNEXAR HQ Frontend - README

**Status:** 🔄 Em Desenvolvimento (70% Base Completa)  
**Framework:** Next.js 14 + TypeScript + Tailwind CSS  
**Testes:** Jest + React Testing Library

---

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes
npm run test

# Build para produção
npm run build
```

---

## ✅ O QUE JÁ ESTÁ PRONTO

### ⚙️ Configuração (100%)
- ✅ Next.js 14 configurado
- ✅ TypeScript + path aliases
- ✅ Tailwind CSS + design system
- ✅ Jest + Testing Library
- ✅ React Query
- ✅ Axios com interceptors
- ✅ ESLint + PostCSS

### 📦 Componentes UI (9/15 - 60%)
| Componente | Status | Testes |
|------------|--------|--------|
| Button | ✅ | ✅ |
| Input | ✅ | ✅ |
| Label | ✅ | ✅ |
| Card | ✅ | ✅ |
| Badge | ✅ | ✅ |
| Avatar | ✅ | ✅ |
| Toast | ✅ | ✅ |
| Table | ✅ | ✅ |
| Dialog | ✅ | ⏳ |
| Select | ⏳ | - |
| Checkbox | ⏳ | - |
| Switch | ⏳ | - |
| Dropdown | ⏳ | - |
| Textarea | ⏳ | - |
| Form | ⏳ | - |

### 🎨 Design System
- ✅ Paleta de cores dark theme
- ✅ Tipografia configurada
- ✅ Espaçamentos padronizados
- ✅ Animações e transições
- ✅ Componentes responsivos

### 🔧 Utilitários
- ✅ cn() - Class merger
- ✅ formatCurrency()
- ✅ formatDate(), formatDateTime()
- ✅ formatPercentage()
- ✅ getInitials()
- ✅ API client configurado

### 📊 Tipos TypeScript
- ✅ User, TeamMember, UserRole
- ✅ Affiliate
- ✅ Product
- ✅ Ticket
- ✅ Campaign
- ✅ Transaction
- ✅ DashboardStats

---

## 📋 O QUE FALTA IMPLEMENTAR

### 🎨 Componentes UI (40%)
- [ ] Select (React Hook Form compatible)
- [ ] Checkbox
- [ ] Switch
- [ ] Dropdown Menu
- [ ] Textarea
- [ ] Form wrapper (React Hook Form + Zod)

### 🏗️ Layout (0%)
- [ ] Sidebar com navegação
- [ ] Header com perfil
- [ ] Layout principal
- [ ] Mobile menu

### 🔐 Autenticação (0%)
- [ ] Login page
- [ ] Auth context/store
- [ ] Protected routes
- [ ] JWT management

### 📄 Páginas (0%)
- [ ] Dashboard (KPIs + Gráficos)
- [ ] Team Management (CRUD)
- [ ] Affiliates Management (CRUD)
- [ ] Products Management (CRUD)
- [ ] Support Tickets
- [ ] Billing/Finance
- [ ] Marketing Campaigns
- [ ] Settings

### 🔌 API Integration (0%)
- [ ] React Query hooks
- [ ] CRUD operations
- [ ] Error handling
- [ ] Loading states
- [ ] Optimistic updates

---

## 🏛️ Arquitetura

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── (dashboard)/         # Dashboard pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home (redirect to dashboard)
│   └── globals.css          # Global styles
│
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── ...
│   └── providers.tsx        # React Query provider
│
├── hooks/                   # Custom hooks
│   ├── use-toast.ts
│   └── ...
│
├── lib/                     # Utilities
│   ├── api.ts               # Axios instance
│   └── utils.ts             # Helper functions
│
└── types/                   # TypeScript types
    └── index.ts
```

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test

# Rodar em watch mode
npm run test:watch

# Ver cobertura
npm run test:ci
```

**Cobertura atual:** 95%+ nos componentes criados

---

## 🎨 Design System

### Cores

```css
--background: #09090B      /* Fundo principal */
--card: #18181B            /* Cards */
--border: #27272A          /* Bordas */
--primary: #3B82F6         /* Azul Innexar */
--success: #10B981         /* Verde */
--warning: #F59E0B         /* Laranja */
--error: #EF4444           /* Vermelho */
```

### Componentes

Todos os componentes seguem o padrão **shadcn/ui**:
- Totalmente customizáveis via className
- Acessíveis (ARIA compliant)
- Responsivos
- Dark mode por padrão

---

## 🔗 Integração com Backend

**Backend URL:** `http://localhost:3005` (development)  
**Produção:** `https://hq-api.innexar.app`

### Endpoints disponíveis:
- `/api/auth/*` - Autenticação
- `/api/team/*` - Gestão de equipe
- `/api/affiliates/*` - Gestão de afiliados
- `/api/products/*` - Gestão de produtos
- `/api/support/*` - Tickets de suporte
- `/api/billing/*` - Financeiro
- `/api/marketing/*` - Campanhas

---

## 📦 Dependências Principais

```json
{
  "next": "^14.2.35",
  "react": "^18.3.1",
  "typescript": "^5.9.3",
  "tailwindcss": "^3.4.1",
  "@tanstack/react-query": "^5.62.8",
  "axios": "^1.7.7",
  "zod": "^3.23.8",
  "react-hook-form": "^7.53.2"
}
```

---

## 🚀 Deploy

```bash
# Build
npm run build

# Start produção
npm run start

# Docker
docker build -t innexar-hq-frontend .
docker run -p 3004:3004 innexar-hq-frontend
```

---

## 📝 Convenções de Código

1. **Componentes:** PascalCase (`Button.tsx`)
2. **Hooks:** camelCase com prefixo `use` (`useToast.ts`)
3. **Utils:** camelCase (`formatCurrency`)
4. **Types:** PascalCase para interfaces (`User`, `Product`)
5. **Testes:** `__tests__/*.test.tsx`

---

## 🤝 Contribuindo

1. Siga os padrões estabelecidos
2. Adicione testes para novos componentes
3. Use TypeScript strict mode
4. Mantenha cobertura de testes >80%

---

## 📞 Suporte

**Desenvolvido por:** INNEXAR Team  
**Documentação:** `/docs`  
**Issues:** Reportar no sistema interno

---

**Última atualização:** 28/12/2025  
**Versão:** 1.0.0-alpha

