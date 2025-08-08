import { appTools, defineConfig } from '@modern-js/app-tools';
import { routerPlugin } from '@modern-js/plugin-router-v7';
import { moduleFederationPlugin } from '@module-federation/modern-js';

export default defineConfig({
  dev: {
    host: 'localhost',
    port: {{ port }},
  },
  runtime: {
    router: true,
  },
  server: {
    port: {{ port }},
  },
  html: {
    favicon: 'https://www.google.com/favicon.ico',
  },
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    moduleFederationPlugin(),
    routerPlugin(),
  ],
});
