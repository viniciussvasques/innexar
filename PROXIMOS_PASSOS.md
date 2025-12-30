# 🚀 PRÓXIMOS PASSOS - INNEXAR

**Leia primeiro:** `INNEXAR_REORGANIZACAO_COMPLETA.md`

---

## ✅ O QUE JÁ FOI FEITO

```
/projetos/
├── innexar/                  ✅ CRIADO
│   ├── hq/
│   │   ├── frontend/         ⚠️ ESTRUTURA CRIADA (falta código)
│   │   └── backend/          ✅ MOVIDO do innexar-backend
│   ├── crm/                  ✅ MOVIDO do completo/innexar-crm
│   ├── site/                 ✅ MOVIDO do completo/site-innexar
│   ├── affiliate-portal/     ✅ MOVIDO do workshops/affiliate
│   ├── infrastructure/
│   │   ├── mailcow/          ✅ MOVIDO
│   │   └── traefik/          ✅ MOVIDO
│   └── shared/               ✅ CRIADO (vazio)
│
├── sas/                      ✅ CRIADO
│   └── workshop/             ✅ MOVIDO do mecanica365-new/
│       ├── api/              ✅ MOVIDO do workshops/backend
│       ├── app/              ✅ MOVIDO do workshops/frontend
│       ├── admin/            ✅ MOVIDO do workshops/admin
│       ├── dealers/          ✅ MOVIDO
│       └── vehicle-history/  ✅ MOVIDO
```

---

## 🎯 PRÓXIMA TAREFA: Criar INNEXAR HQ Frontend

### Comando para o AI:

```
Crie o INNEXAR HQ Frontend completo em /projetos/innexar/hq/frontend/
com Next.js 14, Tailwind CSS, design escuro moderno.

Páginas necessárias:
- Login
- Dashboard (overview)
- Gestão de Equipe (team)
- Gestão de Afiliados (affiliates) - migrar código de mecanica365-new/admin
- Produtos SaaS (products)
- Suporte (support)
- Billing (billing)
- Settings

O backend já existe em /projetos/innexar/hq/backend/ com NestJS.
```

---

## 📋 CHECKLIST DE TAREFAS

- [ ] Criar INNEXAR HQ Frontend completo
- [ ] Migrar lógica de afiliados do admin antigo
- [ ] Adicionar módulo Team no backend
- [ ] Configurar .env para cada projeto
- [ ] Criar docker-compose.yml global
- [ ] Testar tudo funcionando

---

## 🔧 COMANDOS ÚTEIS

```bash
# Ver estrutura
ls -la /projetos/innexar/
ls -la /projetos/sas/workshop/

# Entrar no HQ Frontend
cd /projetos/innexar/hq/frontend

# Entrar no HQ Backend
cd /projetos/innexar/hq/backend
npm install
npm run start:dev
```

---

## 📂 REFERÊNCIA: Código de Afiliados

O código de afiliados atual está em:
```
/projetos/sas/workshop/admin/app/(dashboard)/affiliates/
```

Deve ser migrado/adaptado para:
```
/projetos/innexar/hq/frontend/src/app/(dashboard)/affiliates/
```

---

**Pronto para continuar!** 🚀

