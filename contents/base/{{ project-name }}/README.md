# Modern.js Micro-Frontend Shell Application

A Modern.js-based shell application for hosting micro-frontends, with Docker support and comprehensive setup documentation.

## 🚨 Key Learnings & Gotchas

### Tutorial vs Reality
This project implements micro-frontend architecture using Modern.js, but **deviates from popular tutorials** for good reasons:

**Popular Tutorial Approach (Doesn't Work in Docker):**
- Custom `src/app.tsx` as React component + config export
- Removes conventional `src/routes/` folder
- Often breaks in production builds with syntax errors

**Our Working Approach:**
- ✅ Conventional file-based routing (`src/routes/`)
- ✅ Separate concerns: `src/app.tsx` for runtime config only
- ✅ Stable in Docker production builds
- ✅ Full micro-frontend support

### The "Nuanced AF" Issues We Solved

1. **Runtime Generation Bugs**: Custom entry approaches cause Modern.js to generate malformed `runtime-register.js` files
2. **Plugin Conflicts**: Router, state, and garfish plugins conflict with custom entries
3. **Docker vs Dev Differences**: What works locally often fails in Docker production builds
4. **Entry Point Detection**: Modern.js has finicky entry point detection that breaks easily

## 🏗️ Architecture

```
src/
├── app.tsx              # Runtime configuration (masterApp setup)
├── routes/
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main shell page
└── modern.runtime.ts    # Runtime entry point
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Docker

```bash
# Build Docker image
docker build -t micro-frontend-shell .

# Run container
docker run -p 8080:8080 micro-frontend-shell

# Access application
open http://localhost:8080
```

## 🔧 Configuration

### Modern.js Config (`modern.config.ts`)

```typescript
export default defineConfig({
  runtime: {
    router: true,
    state: true,
    masterApp: {},  // Enable micro-frontend hosting
  },
  source: {
    enableAsyncEntry: true,  // Required for micro-frontends
  },
  plugins: [
    appTools({ bundler: 'rspack' }),
    statePlugin(),
    garfishPlugin(),  // Micro-frontend runtime
  ],
});
```

### App Runtime Config (`src/app.tsx`)

```typescript
export default defineConfig({
  masterApp: {
    manifest: {
      getAppList: async () => {
        return [
          // Add your micro-frontends here
          // {
          //   name: 'mfe1',
          //   entry: 'http://localhost:8081/index.js',
          //   activeWhen: path => path.includes('/mfe1'),
          // },
        ];
      },
    },
  },
});
```

## 🔗 Adding Micro-Frontends

### Method 1: Runtime Loading (Garfish)

1. **Add to shell's manifest** in `src/app.tsx`:
```typescript
{
  name: 'my-mfe',
  entry: 'http://localhost:8081/index.js',
  activeWhen: path => path.includes('/my-mfe'),
}
```

2. **Create micro-frontend app**:
```bash
npx @modern-js/create@latest my-mfe
cd my-mfe
pnpm run new  # Enable micro-frontend features
```

3. **Configure micro-frontend** in `modern.config.ts`:
```typescript
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    port: 8081,
  },
  deploy: {
    microFrontend: true,  // Mark as micro-frontend
  },
  plugins: [appTools(), garfishPlugin()],
});
```

### Method 2: Build-Time Sharing (Module Federation)

1. **Enable Module Federation in shell** (`modern.config.ts`):
```typescript
tools: {
  rspack: (config, { rspack, appendPlugins }) => {
    appendPlugins([
      new rspack.container.ModuleFederationPlugin({
        name: 'host',
        remotes: {
          mfe2: 'mfe2@http://localhost:8082/static/js/remoteEntry.js',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      }),
    ]);
  },
},
```

2. **Configure micro-frontend to expose components**:
```typescript
tools: {
  rspack: (config, { rspack, appendPlugins }) => {
    appendPlugins([
      new rspack.container.ModuleFederationPlugin({
        name: 'mfe2',
        filename: 'static/js/remoteEntry.js',
        exposes: {
          './Component': './src/Component.tsx',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      }),
    ]);
  },
},
```

3. **Import in shell components**:
```typescript
import RemoteComponent from 'mfe2/Component';
```

## 🐳 Docker Best Practices

### Multi-Stage Build (Recommended)

```dockerfile
# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["pnpm", "start"]
```

### Docker Compose for Multi-MFE Development

```yaml
version: '3.8'
services:
  shell:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mfe1
      - mfe2

  mfe1:
    build: ../mfe1
    ports:
      - "8081:8081"

  mfe2:
    build: ../mfe2
    ports:
      - "8082:8082"
```

## 🔍 Debugging & Troubleshooting

### Common Issues

1. **"No valid entry point" errors**
   - ✅ Use conventional routing (`src/routes/`)
   - ❌ Avoid custom entry configurations

2. **Syntax errors in runtime-register.js**
   - Usually caused by plugin conflicts with custom entries
   - Switch to conventional routing approach

3. **404 errors in Docker**
   - Check that `historyApiFallback` is configured
   - Ensure SPA routing is enabled

4. **Micro-frontend loading failures**
   - Verify CORS settings
   - Check network connectivity between containers
   - Ensure micro-frontend is built with correct `publicPath`

### Development Scripts

```bash
# Clean build cache
pnpm reset

# Lint code
pnpm lint

# Create new micro-frontend features
pnpm new
```

## 📚 References

- [Modern.js Documentation](https://modernjs.dev/en)
- [Garfish Micro-Frontend Framework](https://garfish.top/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [DEV.to Tutorial Reference](https://dev.to/kyrylobashtenko/micro-frontends-with-rspack-and-modernjs-2l2d) (Note: Use our approach for Docker compatibility)

## 🤝 Contributing

When adding new micro-frontends or features:

1. Follow the conventional routing pattern
2. Test both local and Docker builds
3. Update this README with new patterns
4. Document any "nuanced AF" issues you encounter

## 📝 License

MIT
