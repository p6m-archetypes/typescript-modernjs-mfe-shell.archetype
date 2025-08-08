# TypeScript Modern.js MFE Shell Archetype

![Latest Release](https://img.shields.io/github/v/release/p6m-archetypes/typescript-modernjs-mfe-shell.archetype?style=flat-square&label=Latest%20Release&color=blue)

This is an [Archetect](https://archetect.github.io/) archetype for building Modern.js shell applications for micro frontend (MFE) architectures that run on Kubernetes.

## Features

- **Modern.js Framework**: Built on the latest Modern.js framework with Rspack for optimal performance
- **Micro Frontend Shell**: Designed as a shell application to host and orchestrate micro frontends using Module Federation
- **TypeScript**: Full TypeScript support for type safety and enhanced developer experience
- **Docker Ready**: Includes optimized multi-stage Dockerfile for containerized deployments
- **Kubernetes Compatible**: Configured for seamless deployment on Kubernetes clusters
- **Biome**: Pre-configured code quality, formatting, and linting with Biome
- **Modern Routing**: Uses Modern.js file-based routing with the `pages/` directory structure
- **Module Federation**: Pre-configured for dynamic micro frontend loading and orchestration
- **pnpm Support**: Optimized for pnpm package management

## Usage

Generate a new project from this archetype:

```sh
archetect render git@github.com:p6m-archetypes/typescript-modernjs-mfe-shell.archetype.git#v1
```

This creates a Modern.js shell application ready to:
- Host multiple micro frontend applications
- Use Module Federation for dynamic loading
- Deploy to Kubernetes clusters
- Run in Docker containers

## Getting Started

After generating your project:

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. Access your shell at: `http://localhost:8080`
4. Register micro frontends in `module-federation.config.ts` and `src/routing/router.tsx`
5. Build for production: `pnpm build`
