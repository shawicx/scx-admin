# syntax=docker/dockerfile:1.4

FROM node:20-alpine AS base
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && apk add --no-cache libc6-compat && rm -rf /var/cache/apk/*
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

FROM node:20-alpine AS runner
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache nginx && \
    rm -rf /var/cache/apk/*

RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs && \
    adduser nextjs nginx

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN mkdir -p /etc/nginx /etc/nginx/conf.d /run/nginx /var/log/nginx && \
    chown -R nextjs:nodejs /var/log/nginx /run/nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3369
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

USER nextjs
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]