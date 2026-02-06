# syntax=docker/dockerfile:1.4

FROM node:20-alpine AS base
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

# ---------- runner ----------
FROM node:20-alpine AS runner

RUN apk update && \
    apk add --no-cache nginx && \
    rm -rf /var/cache/apk/*

RUN addgroup -S nodejs -g 1001 && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN mkdir -p /etc/nginx/conf.d /run/nginx /var/log/nginx && \
    chown -R nextjs:nodejs /var/log/nginx /run/nginx

COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 3369;
    server_name _;
    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    location /api/ {
        proxy_pass http://scx-service-app:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}
EOF

USER nextjs
EXPOSE 3369
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]