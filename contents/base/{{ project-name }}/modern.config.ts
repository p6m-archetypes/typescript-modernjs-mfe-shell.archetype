import { appTools, defineConfig } from '@modern-js/app-tools';
import { routerPlugin } from '@modern-js/plugin-router-v7';
import { moduleFederationPlugin } from '@module-federation/modern-js';

export default defineConfig({
  dev: {
    host: 'localhost',
    port: 8080,
  },
  runtime: {
    router: true,
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
