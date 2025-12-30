# 🚀 INNEXAR - Script de Deploy Rápido

echo "🚀 INNEXAR - Deploy de Infraestrutura"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar Docker
if ! command_exists docker; then
    echo -e "${RED}❌ Docker não está instalado!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker encontrado${NC}"

# Verificar se Traefik está rodando
if ! docker ps | grep -q "mecanica365-workshops-traefik-prod"; then
    echo -e "${RED}❌ Traefik não está rodando! Inicie o Mecânica365 primeiro.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Traefik está rodando${NC}"
echo ""

# ===========================================
# 1. SUBIR INFRAESTRUTURA (Monitoring + Analytics + Backup)
# ===========================================
echo -e "${YELLOW}📊 Subindo serviços de infraestrutura...${NC}"

cd /projetos/innexar/infrastructure

# Verificar se .env existe
if [ ! -f .env.infrastructure ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env.infrastructure não encontrado!${NC}"
    echo "Criando a partir do exemplo..."
    cp .env.infrastructure.example .env.infrastructure
    echo -e "${RED}⚠️  IMPORTANTE: Edite o arquivo .env.infrastructure e configure as senhas!${NC}"
    echo "Execute: nano .env.infrastructure"
    echo "Depois execute este script novamente."
    exit 1
fi

# Subir containers de infraestrutura
docker-compose -f docker-compose.infrastructure.yml --env-file .env.infrastructure up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Infraestrutura iniciada com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar infraestrutura${NC}"
    exit 1
fi

echo ""

# ===========================================
# 2. SUBIR SITE INNEXAR
# ===========================================
echo -e "${YELLOW}🌐 Subindo site INNEXAR...${NC}"

cd /projetos/innexar/site

# Verificar se .env existe
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env.production não encontrado!${NC}"
    echo "Criando a partir do exemplo..."
    cp .env.production.example .env.production
    echo -e "${RED}⚠️  IMPORTANTE: Edite o arquivo .env.production e configure a API Key da Resend!${NC}"
    echo "Execute: nano .env.production"
    echo "Depois execute este script novamente."
    exit 1
fi

# Build e subir site
echo "Building site..."
docker-compose -f docker-compose.prod.yml build

echo "Starting site..."
docker-compose -f docker-compose.prod.yml up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Site INNEXAR iniciado com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar site${NC}"
    exit 1
fi

echo ""

# ===========================================
# 3. VERIFICAÇÃO FINAL
# ===========================================
echo -e "${YELLOW}🔍 Verificando status dos containers...${NC}"
echo ""

docker ps --format "table {{.Names}}\t{{.Status}}" | grep innexar

echo ""
echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo ""
echo "========================================"
echo "📊 Serviços disponíveis:"
echo "========================================"
echo "🌐 Site:       https://innexar.app"
echo "🔍 Status:     https://status.innexar.app"
echo "📈 Analytics:  https://analytics.innexar.app"
echo ""
echo "⚠️  IMPORTANTE:"
echo "1. Configure o DNS no Cloudflare (ver DEPLOY_GUIDE.md)"
echo "2. Acesse o Uptime Kuma e crie conta de admin"
echo "3. Acesse o Umami e mude a senha padrão (admin/umami)"
echo "4. Configure os monitores no Uptime Kuma"
echo "5. Adicione os sites no Umami para tracking"
echo ""
echo "📚 Documentação completa: /projetos/DEPLOY_GUIDE.md"
echo ""

