# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies for build
RUN apk add --no-cache libc6-compat curl

# Stage 2: Dependencies
FROM base AS deps
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json ./

# Copy workspace configs
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config
COPY packages/shared ./packages/shared

# Copy server package
COPY apps/server/package.json ./apps/server/

# Install all dependencies
RUN npm ci

# Stage 3: Builder
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# Copy all workspace files
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=./apps/server/prisma/schema.prisma

# Build the server
RUN npm run build --workspace=server

# Stage 4: Runner (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

# Copy necessary files
COPY --from=builder --chown=fastify:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/apps/server ./apps/server
COPY --from=builder --chown=fastify:nodejs /app/packages ./packages
COPY --from=builder --chown=fastify:nodejs /app/package.json ./

USER fastify

EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3333/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "run", "dev", "--workspace=server"]
