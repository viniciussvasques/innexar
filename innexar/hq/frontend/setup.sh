#!/bin/bash

# Script para instalar dependências e gerar componentes shadcn/ui

echo "🚀 Configurando INNEXAR HQ Frontend..."
echo ""

cd /projetos/innexar/hq/frontend

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

echo ""
echo "✅ Dependências instaladas!"
echo ""
echo "🎨 Pronto para desenvolvimento!"
echo ""
echo "Comandos disponíveis:"
echo "  npm run dev     - Iniciar em desenvolvimento"
echo "  npm run build   - Build para produção"
echo "  npm run start   - Iniciar produção"
echo ""

