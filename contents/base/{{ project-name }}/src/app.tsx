import { defineConfig } from '@modern-js/runtime';

export default defineConfig({
  masterApp: {
    manifest: {
      getAppList: async () => {
        return [
          //   {
          //     name: 'app1',
          //     entry: 'http://localhost:8081/index.js',
          //     activeWhen: path => path.includes('mfe1'),
          //   },
        ];
      },
    },
  },
});
