# ====================================
# INNEXAR - Plataforma de Afiliados (Next.js)
# ====================================

# Estágio 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Estágio 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Garantir permissões corretas no node_modules/.bin
RUN chmod -R 755 ./node_modules/.bin

# Variáveis de ambiente para o build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-https://apiaf.innexar.app}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Estágio 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3004
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache dumb-init

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3004

CMD ["dumb-init", "--", "node", "server.js"]


