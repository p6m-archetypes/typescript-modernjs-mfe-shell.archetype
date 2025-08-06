# {{ project-title }} Frontend

This is a [Next.js](https://nextjs.org) project.

## Quick Reference

| Task                   | Command                                      |
| ---------------------- | -------------------------------------------- |
| Install dependencies   | `pnpm install`                               |
| Run development server | `pnpm dev`                                   |
| Build for production   | `pnpm build`                                 |
| Build with OpenNext    | `pnpm build:open`                            |
| Lint code              | `pnpm lint`                                  |
| Run tests              | `pnpm test`                                  |
| Build Docker image     | `docker build -t {{ project-name }} .`       |
| Run Docker container   | `docker run -p 3000:3000 {{ project-name }}` |

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy with OpenNext and Docker on Kubernetes

This project is configured to be built with [OpenNext](https://github.com/sst/open-next) and deployed as a Docker container on Kubernetes.

To build with standard Next.js:

```bash
pnpm build
```

To build with OpenNext:

```bash
pnpm build:open
```

To build and run the Docker container:

```bash
# Build the Docker image
docker build -t {{ project-name }} .

# Run the container
docker run -p 3000:3000 {{ project-name }}
```

The application will be available at http://localhost:3000.

## Promoting Images

Upon each commit to main, the Docker image is built and deployed to the dev Kubernetes cluster automatically. However, the process to promote an image to stg or prd requires a couple of manual button presses, allowing you to control when to deploy images to other environments.

1. Launch a run of [**Cut Release Tag**](.github/workflows/cut-tag.yaml) — this will bump the version number of the application, publish a new docker image to Artifactory with the necessary tags, and create a new Github release from that tag. Make sure to select the appropriate level to bump, conforming with [semantic versioning](https://semver.org/).
2. Launch a run of [**Promote Tag**](.github/workflows/promote.yaml) — this will take an existing docker image and promote it to the specified environment. Make sure to enter the Github tag you wish to promote (created by **Cut Release Tag** from step one) and the environment to which you wish to promote the image.
