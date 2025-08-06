import { appTools, defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  plugins: [appTools({
    bundler: 'rspack'
  })],
  runtime: {
    router: {
      mode: 'react-router'
    },
    masterApp: {}
  },
  output: {
    distPath: {
      root: 'dist'
    }
  },
  server: {
    port: 8080
  },
  deploy: {
    microFrontend: true
  }
});