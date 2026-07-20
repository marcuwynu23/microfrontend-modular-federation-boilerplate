# Stage 1: Base image with pnpm support
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 2: Install dependencies stage
FROM base AS installer
WORKDIR /app

# Copy lockfile and monorepo files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
# Copy all package.json files to optimize Docker layers caching
COPY apps/host/package.json ./apps/host/package.json
COPY apps/remote1/package.json ./apps/remote1/package.json
COPY apps/remote2/package.json ./apps/remote2/package.json
COPY packages/shared-ui/package.json ./packages/shared-ui/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json

# Install dependencies (frozen lockfile for reproducible builds)
RUN pnpm install --frozen-lockfile

# Stage 3: Builder stage to compile code
FROM installer AS builder
ARG APP_NAME
WORKDIR /app
COPY . .
# Re-link dependencies to fix Windows junction symlinks picked up by Docker Desktop
RUN pnpm install --frozen-lockfile --offline
# Compile the specified MFE using pnpm filter and vite production mode
RUN pnpm --filter=${APP_NAME} build

# Stage 4: Production Runner stage using a lightweight Nginx server
FROM nginx:1.25-alpine AS runner
ARG APP_NAME
# Copy compiled static assets from the builder stage
COPY --from=builder /app/apps/${APP_NAME}/dist /usr/share/nginx/html
# Copy custom Nginx configuration with CORS and SPA support
COPY docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
