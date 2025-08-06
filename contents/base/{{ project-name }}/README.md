# {{ project-title }} Frontend

This is a [Modern.js](https://modernjs.dev) micro frontend shell application.

## Quick Reference

| Task                   | Command                                      |
| ---------------------- | -------------------------------------------- |
| Install dependencies   | `npm install`                                |
| Run development server | `npm run dev`                                |
| Build for production   | `npm run build`                              |
| Lint code              | `npm run lint`                               |
| Run tests              | `npm run test`                               |
| Build Docker image     | `docker build -t {{ project-name }} .`       |
| Run Docker container   | `docker run -p 8080:8080 {{ project-name }}` |

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `src/pages/home.tsx`. The page auto-updates as you edit the file.

This project uses Modern.js with file-based routing in the `src/pages/` directory for optimal micro frontend orchestration.

## Learn More

To learn more about Modern.js, take a look at the following resources:

- [Modern.js Documentation](https://modernjs.dev/en/guides/get-started/introduction) - learn about Modern.js features and API.
- [Modern.js Micro Frontend Guide](https://modernjs.dev/en/guides/topic-detail/micro-frontend/introduction) - comprehensive guide to building micro frontends.
- [Modern.js Routing](https://modernjs.dev/en/guides/basic-features/routing) - understand the file-based routing system.

You can check out [the Modern.js GitHub repository](https://github.com/web-infra-dev/modern.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy with Docker on Kubernetes

This project is configured to be built with Modern.js and deployed as a Docker container on Kubernetes.

To build for production:

```bash
npm run build
```

To build and run the Docker container:

```bash
# Build the Docker image
docker build -t {{ project-name }} .

# Run the container
docker run -p 8080:8080 {{ project-name }}
```

The application will be available at http://localhost:8080.

## Micro Frontend Architecture

This shell application is designed to host and orchestrate micro frontends. Key features include:

- **Module Federation**: Ready for integrating remote micro frontends
- **Shared Dependencies**: Optimized sharing of common libraries across micro frontends
- **Routing Integration**: Seamless routing between shell and micro frontend routes
- **Development Mode**: Hot reloading support for both shell and remote micro frontends

### Registering Micro Frontend Apps

To integrate micro frontend applications into the shell, you'll need to register them in the router configuration. Here's how:

1. **Configure the Router** (`src/router.tsx`):
   ```tsx
   import { router } from '@modern-js/runtime/router';
   
   export default router([
     {
       path: '/',
       element: <Layout />,
       children: [
         { index: true, element: <Home /> },
         // Register micro frontend routes
         {
           path: '/micro-app-1/*',
           element: <MicroApp1Container />,
         },
         {
           path: '/micro-app-2/*',
           element: <MicroApp2Container />,
         },
       ],
     },
   ]);
   ```

2. **Create Container Components**: Create wrapper components that load your micro frontends using Module Federation or other integration methods.

3. **Update Navigation**: Add navigation links in your shell layout to route to micro frontend paths.

4. **Configure Module Federation** (if using): Update `modern.config.ts` to include module federation configuration for remote micro frontends.

For detailed micro frontend integration patterns, refer to the [Modern.js Micro Frontend Guide](https://modernjs.dev/en/guides/topic-detail/micro-frontend/introduction).

## Promoting Images

Upon each commit to main, the Docker image is built and deployed to the dev Kubernetes cluster automatically. However, the process to promote an image to stg or prd requires a couple of manual button presses, allowing you to control when to deploy images to other environments.

1. Launch a run of [**Cut Release Tag**](.github/workflows/cut-tag.yaml) — this will bump the version number of the application, publish a new docker image to Artifactory with the necessary tags, and create a new Github release from that tag. Make sure to select the appropriate level to bump, conforming with [semantic versioning](https://semver.org/).
2. Launch a run of [**Promote Tag**](.github/workflows/promote.yaml) — this will take an existing docker image and promote it to the specified environment. Make sure to enter the Github tag you wish to promote (created by **Cut Release Tag** from step one) and the environment to which you wish to promote the image.
