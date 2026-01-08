import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/google-tag-manager-loader.ts'),
      name: 'GoogleTagManagerLoader',
      fileName: 'google-tag-manager-loader',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@zoltanradics/dynamic-script-injector'],
      output: {
        globals: {
          '@zoltanradics/dynamic-script-injector': 'DynamicScriptInjector',
        },
      },
    },
  },
});
