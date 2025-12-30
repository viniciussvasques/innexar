# 🏢 INNEXAR - Repositório Principal

**Sistema completo de gestão e produtos SaaS da INNEXAR**

---

## 📁 Estrutura do Repositório

```
/projetos/
├── innexar/                    🏢 EMPRESA (Hub Central)
│   ├── hq/                     → INNEXAR HQ (Painel Central)
│   │   ├── frontend/           → Next.js 14
│   │   └── backend/            → NestJS (afiliados - renomear)
│   ├── crm/                    → CRM Interno
│   ├── site/                   → Site Institucional
│   ├── affiliate-portal/       → Portal do Afiliado
│   ├── infrastructure/         → Infraestrutura (Mailcow, Traefik)
│   └── shared/                 → Código compartilhado
│
└── saas/                       📦 SOFTWARE AS A SERVICE
    └── workshop/               → Mecânica365 (SaaS para oficinas)
        ├── api/                → Backend NestJS
        ├── app/                → Frontend clientes
        ├── admin/              → Admin do produto
        ├── dealers/            → Módulo dealers
        └── vehicle-history/    → Histórico de veículos
```

---

## 🎯 Projetos Principais

### INNEXAR HQ
**Localização:** `/projetos/innexar/hq/`  
**Descrição:** Painel administrativo central para gestão de equipe, produtos SaaS, afiliados e mais  
**Status:** ✅ Completo  
**URL:** https://hq.innexar.app

### Site Institucional
**Localização:** `/projetos/innexar/site/`  
**Descrição:** Site institucional da INNEXAR  
**Status:** ✅ Online  
**URL:** https://innexar.app

### Mecânica365
**Localização:** `/projetos/saas/workshop/`  
**Descrição:** SaaS para gestão de oficinas mecânicas  
**Status:** ✅ Em produção  
**URL:** https://app.mecanica365.com

---

## 🚀 Como Usar

Cada projeto tem seu próprio README com instruções específicas.

### Requisitos
- Docker & Docker Compose
- Node.js 20+
- PostgreSQL 16+
- Redis 7+

---

## 📝 Documentação

- [Reorganização Completa](./INNEXAR_REORGANIZACAO_COMPLETA.md)
- [Próximos Passos](./PROXIMOS_PASSOS.md)
- [Guia de Deploy](./DEPLOY_GUIDE.md)

---

## 🔗 Links

- **Site:** https://innexar.app
- **HQ:** https://hq.innexar.app
- **Mecânica365:** https://app.mecanica365.com

---

**Desenvolvido pela equipe INNEXAR**  
**© 2025 INNEXAR - Todos os direitos reservados**

