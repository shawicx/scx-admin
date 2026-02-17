# syntax=docker/dockerfile:1.4

FROM node:20-alpine AS base
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && apk add --no-cache libc6-compat && rm -rf /var/cache/apk/*
WORKDIR /scx-admin

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /scx-admin/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

FROM node:20-alpine AS runner

WORKDIR /scx-admin
ENV NODE_ENV=production

RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder --chown=nextjs:nodejs /scx-admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /scx-admin/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]