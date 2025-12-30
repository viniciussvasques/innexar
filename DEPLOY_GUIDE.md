# 🚀 INNEXAR - Guia de Deploy e Configuração DNS

**Data:** 28/12/2025  
**Versão:** 1.0

---

## 📋 RESUMO DO QUE ESTÁ RODANDO

Atualmente você já tem rodando:
- ✅ **Traefik** (proxy reverso + SSL automático via Cloudflare)
- ✅ **Mecânica365 Workshop** (Backend + Frontend + Admin)
- ✅ **INNEXAR Backend** (API do HQ)
- ✅ **INNEXAR Frontend** (HQ em desenvolvimento)
- ✅ **PostgreSQL** (Mecânica365 + INNEXAR HQ)
- ✅ **Redis** (Cache)
- ✅ **Portainer** (Gestão de containers)

---

## 🎯 NOVOS SERVIÇOS A ADICIONAR

### 1. Site Institucional INNEXAR
**Domínio:** innexar.app  
**Container:** innexar-site-prod  
**Porta:** 3000 (interna)

### 2. Uptime Kuma (Monitoramento)
**Domínio:** status.innexar.app  
**Container:** innexar-uptime-kuma  
**Porta:** 3001 (interna)

### 3. Umami Analytics
**Domínio:** analytics.innexar.app  
**Container:** innexar-umami  
**Porta:** 3000 (interna)

### 4. Sistema de Backup Automatizado
**Container:** innexar-backup  
**Função:** Backup diário dos bancos PostgreSQL

---

## 🌐 CONFIGURAÇÃO DNS (Cloudflare)

### Domínio: innexar.app

Adicione os seguintes registros DNS no Cloudflare:

```
Tipo    Nome        Conteúdo                      Proxy   TTL
────────────────────────────────────────────────────────────
A       @           SEU_IP_DO_SERVIDOR            ✅ ON   Auto
A       www         SEU_IP_DO_SERVIDOR            ✅ ON   Auto
CNAME   status      innexar.app                   ✅ ON   Auto
CNAME   analytics   innexar.app                   ✅ ON   Auto
```

**⚠️ IMPORTANTE:**
- Proxy deve estar **ATIVADO** (nuvem laranja)
- O Traefik já está configurado com Cloudflare DNS Challenge
- SSL/TLS automático via Let's Encrypt

---

## 🔧 PASSO A PASSO PARA SUBIR OS NOVOS SERVIÇOS

### ✅ Pré-requisitos
- [ ] DNS configurado no Cloudflare (aguardar propagação: ~5 minutos)
- [ ] Traefik rodando (já está ✅)
- [ ] Rede `mecanica365-workshops-network-prod` criada (já está ✅)

---

### 📦 PASSO 1: Subir Ferramentas de Infraestrutura

```bash
# 1. Ir para a pasta de infraestrutura
cd /projetos/innexar/infrastructure

# 2. Criar arquivo .env
cp .env.infrastructure.example .env.infrastructure

# 3. Editar o .env e configurar senhas
nano .env.infrastructure

# IMPORTANTE: Gerar secret para Umami
openssl rand -base64 32

# 4. Subir os serviços de infraestrutura
docker-compose -f docker-compose.infrastructure.yml --env-file .env.infrastructure up -d

# 5. Verificar se subiram corretamente
docker ps | grep innexar
docker logs innexar-uptime-kuma
docker logs innexar-umami
```

**Acessar:**
- 🔍 Uptime Kuma: https://status.innexar.app
- 📈 Umami Analytics: https://analytics.innexar.app

---

### 🌐 PASSO 2: Subir Site Institucional

```bash
# 1. Ir para a pasta do site
cd /projetos/innexar/site

# 2. Criar arquivo .env de produção
cp .env.production.example .env.production

# 3. Configurar API Key da Resend
nano .env.production
# Obter chave em: https://resend.com/api-keys

# 4. Build e subir o container
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# 5. Verificar logs
docker logs innexar-site-prod -f

# 6. Testar
curl -I https://innexar.app
```

**Acessar:**
- 🌐 Site: https://innexar.app

---

### 📊 PASSO 3: Configurar Monitoramento (Uptime Kuma)

1. Acesse: https://status.innexar.app
2. Crie conta de administrador (primeira vez)
3. Adicione os seguintes monitores:

```
Monitor                URL                              Tipo        Intervalo
──────────────────────────────────────────────────────────────────────────────
Site INNEXAR          https://innexar.app              HTTP(s)     60s
Mecânica365 App       https://app.mecanica365.com      HTTP(s)     60s
Mecânica365 Admin     https://admin.mecanica365.com    HTTP(s)     60s
Mecânica365 API       https://api.mecanica365.com      HTTP(s)     60s
INNEXAR HQ            https://hq.innexar.app           HTTP(s)     60s
Portal Afiliados      https://afiliados.innexar.app    HTTP(s)     60s
```

4. Configure notificações:
   - Email
   - Telegram (opcional)
   - Discord (opcional)

---

### 📈 PASSO 4: Configurar Analytics (Umami)

1. Acesse: https://analytics.innexar.app
2. Login padrão:
   - Username: `admin`
   - Password: `umami`
   - **⚠️ MUDE IMEDIATAMENTE!**

3. Criar sites para rastreamento:

```
Nome                  Domínio
────────────────────────────────────────
INNEXAR Site         innexar.app
Mecânica365 App      app.mecanica365.com
```

4. Copie o **Website ID** de cada site

5. Adicione o script de tracking no HTML:

```html
<!-- No <head> do site -->
<script
  async
  src="https://analytics.innexar.app/script.js"
  data-website-id="SEU_WEBSITE_ID_AQUI"
></script>
```

---

## 💾 SISTEMA DE BACKUP

O backup está configurado para rodar **automaticamente todos os dias à meia-noite**.

### Configuração

```bash
# Backups salvos em:
/projetos/innexar/infrastructure/backups/

# Estrutura:
├── daily/      # Últimos 7 dias
├── weekly/     # Últimas 4 semanas
└── monthly/    # Últimos 6 meses
```

### Testar Backup Manual

```bash
# Entrar no container de backup
docker exec -it innexar-backup /backup.sh

# Verificar backups criados
ls -lh /projetos/innexar/infrastructure/backups/
```

### Restaurar Backup

```bash
# 1. Parar o banco
docker stop mecanica365-workshops-postgres-prod

# 2. Restaurar
docker exec -i mecanica365-workshops-postgres-prod psql -U mecanica365 -d mecanica365_db < /projetos/innexar/infrastructure/backups/daily/mecanica365_db_2025-12-28.sql

# 3. Reiniciar
docker start mecanica365-workshops-postgres-prod
```

---

## 🔐 SEGURANÇA

### Checklist de Segurança

- [ ] Todas as senhas foram alteradas dos valores padrão
- [ ] Umami: senha `admin/umami` foi alterada
- [ ] Uptime Kuma: conta de admin criada
- [ ] Backups configurados e testados
- [ ] Firewall configurado (apenas portas 80/443 abertas)
- [ ] Cloudflare Proxy ativado em todos os domínios
- [ ] SSL/TLS configurado corretamente

### Portas Expostas

```
80   → HTTP (redirect para HTTPS)
443  → HTTPS (Traefik)
8080 → Traefik Dashboard (protegido)
9000 → Portainer (protegido)
```

**⚠️ NUNCA exponha diretamente:**
- PostgreSQL (5432/5433)
- Redis (6379)
- Portas internas dos containers

---

## 📊 VERIFICAÇÃO FINAL

### Comando de Verificação

```bash
# Ver todos os containers rodando
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Verificar logs de erro
docker ps -a | grep -E "(Exit|Restarting)"

# Testar acesso aos domínios
curl -I https://innexar.app
curl -I https://status.innexar.app
curl -I https://analytics.innexar.app
```

### Checklist Final

- [ ] Site INNEXAR acessível em https://innexar.app
- [ ] Uptime Kuma acessível em https://status.innexar.app
- [ ] Umami Analytics acessível em https://analytics.innexar.app
- [ ] SSL válido em todos os domínios
- [ ] Backups rodando automaticamente
- [ ] Monitoramento configurado
- [ ] Analytics configurado nos sites
- [ ] Todos os containers saudáveis (`healthy`)

---

## 🆘 TROUBLESHOOTING

### Problema: Site não acessível

```bash
# 1. Verificar se container está rodando
docker ps | grep innexar-site

# 2. Verificar logs
docker logs innexar-site-prod --tail 50

# 3. Verificar Traefik
docker logs mecanica365-workshops-traefik-prod --tail 50

# 4. Testar internamente
docker exec innexar-site-prod wget -O- http://localhost:3000
```

### Problema: SSL não funciona

```bash
# 1. Verificar DNS
dig innexar.app +short

# 2. Verificar certificados
docker exec mecanica365-workshops-traefik-prod ls -la /letsencrypt/acme.json

# 3. Verificar logs do Traefik
docker logs mecanica365-workshops-traefik-prod | grep -i "certificate"
```

### Problema: Backup não está rodando

```bash
# 1. Verificar container
docker ps | grep backup

# 2. Ver logs
docker logs innexar-backup

# 3. Forçar backup manual
docker exec innexar-backup /backup.sh
```

---

## 📞 COMANDOS ÚTEIS

```bash
# Parar todos os serviços INNEXAR (sem afetar Mecânica365)
docker stop innexar-site-prod innexar-uptime-kuma innexar-umami innexar-backup

# Reiniciar todos os serviços INNEXAR
docker restart innexar-site-prod innexar-uptime-kuma innexar-umami innexar-backup

# Ver uso de recursos
docker stats

# Limpar logs antigos
docker system prune -a --volumes

# Backup manual de todos os bancos
docker exec innexar-backup /backup.sh
```

---

## 🔄 MANUTENÇÃO

### Atualizações

```bash
# Atualizar imagens
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Reconstruir site após mudanças
cd /projetos/innexar/site
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Monitoramento de Logs

```bash
# Logs em tempo real
docker logs -f innexar-site-prod

# Logs com timestamp
docker logs -f -t innexar-site-prod

# Últimas 100 linhas
docker logs --tail 100 innexar-site-prod
```

---

## 📝 NOTAS IMPORTANTES

1. **Não apague o Traefik existente** - Todos os novos serviços se conectam a ele
2. **Rede compartilhada** - `mecanica365-workshops-network-prod` é usada por todos
3. **Backups automáticos** - Verificar semanalmente se estão funcionando
4. **Monitoramento** - Configurar alertas no Uptime Kuma
5. **Analytics** - Pode levar 24h para mostrar dados iniciais

---

**Última atualização:** 28/12/2025

## 📊 FERRAMENTAS ADICIONAIS SUGERIDAS (Futuro)

- **n8n** - Automação de workflows (https://n8n.io)
- **Grafana** - Dashboard de métricas avançadas
- **Prometheus** - Coleta de métricas
- **Mattermost** - Chat interno da equipe
- **GitLab Runner** - CI/CD próprio
- **Vault** - Gerenciamento de secrets

