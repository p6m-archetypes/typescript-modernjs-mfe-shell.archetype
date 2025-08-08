# {{ project-title }}

A Modern.js micro frontend shell application built with TypeScript, designed to orchestrate and host multiple micro frontend applications.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker (for containerized deployment)

### Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The application will be available at http://localhost:{{ port }}

### Building

Build the application for production:

```bash
pnpm build
```

### Linting and Formatting

This project uses Biome for code quality and formatting:

```bash
# Check for issues
pnpm lint

# Format code
pnpm format
```

## Micro Frontend Architecture

This shell application uses Modern.js with Module Federation to dynamically load and orchestrate micro frontend applications.

### Registering Micro Frontends

To register a new micro frontend, update `src/app.tsx`:

```typescript
import { createRoot } from '@modern-js/runtime';

// Register your micro frontends
createRoot({
  plugins: [/* your plugins */],
  getAppList: () => [
    {
      name: 'your-app-name',
      entry: 'http://localhost:3001',
      activeWhen: '/your-route',
    },
  ],
});
```

### Exposed Modules

This shell exposes the following modules via Module Federation:
- `./Shell` - Main shell component
- `./Layout` - Layout component
- `./Router` - Routing configuration

### Consuming from Other Apps

Other micro frontends can consume this shell's modules:

```typescript
// In your micro frontend's modern.config.ts
export default defineConfig({
  runtime: {
    remotes: {
      shell: 'http://localhost:{{ port }}/remoteEntry.js',
    },
  },
});

// Use in your components
import { Layout } from 'shell/Layout';
```

### Naming Limitations

Module Federation requires valid JavaScript identifiers for module names. Names cannot contain hyphens - use underscores or camelCase instead.

## Docker Deployment

Build and run with Docker:

```bash
# Build image
docker build -t {{ project-name }} .

# Run container
docker run -p {{ port }}:{{ port }} {{ project-name }}
```

## Quick Demo

For a complete MFE demo with sample applications, see the `create_mfe_demo.sh` script in the archetype repository.
