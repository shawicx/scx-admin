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

# 安装 nginx
RUN apk add --no-cache nginx

# 创建用户
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

WORKDIR /app

ENV NODE_ENV=production

# Next.js standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# nginx 配置
RUN mkdir -p /run/nginx /var/log/nginx

COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 3369;
    server_name _;

    client_max_body_size 10M;

    # 前端页面
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 后端 API（指向 NestJS 容器）
    location /api/ {
        proxy_pass http://scx-service-app:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 权限
RUN chown -R nextjs:nodejs /app /var/log/nginx /run/nginx

USER nextjs

EXPOSE 3369

# Next.js 内部监听 3000（nginx 不暴露）
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]
