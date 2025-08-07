# Use Node.js LTS version (matches .nvmrc)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Expose port (Modern.js default is 8080)
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]
