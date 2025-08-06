FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set up workspace
WORKDIR /app

# Build stage
FROM base AS builder
# Copy only package files first to leverage Docker caching
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies (with caching)
RUN pnpm fetch 

# Copy application code
COPY . .

# Install with offline mode (using cache)
RUN pnpm install --frozen-lockfile --offline

# Build the Modern.js application
RUN pnpm build

# Production stage - use minimal image for smaller size
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 modernjs && \
  chown -R modernjs:nodejs /app

# Copy Modern.js build output, source, and config
COPY --from=builder --chown=modernjs:nodejs /app/dist ./dist
COPY --from=builder --chown=modernjs:nodejs /app/src ./src
COPY --from=builder --chown=modernjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=modernjs:nodejs /app/modern.config.ts ./modern.config.ts
COPY --from=builder --chown=modernjs:nodejs /app/node_modules ./node_modules

USER modernjs

ENV NODE_ENV=production
ENV APP_ROOT=/app
ENV PWD=/app

# Expose the port the app runs on
EXPOSE 8080

# Run the Modern.js application
# Set hostname to 0.0.0.0 to make it accessible from outside the container
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "start"]