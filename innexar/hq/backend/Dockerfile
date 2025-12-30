# INNEXAR Backend - Dockerfile
FROM node:20-alpine AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
# Adiciona dependências para compilar módulos nativos (bcrypt)
RUN apk add --no-cache libc6-compat openssl python3 make g++

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps

# Builder stage
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache openssl dumb-init
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

USER nestjs

EXPOSE 3005

CMD ["dumb-init", "node", "dist/main"]

