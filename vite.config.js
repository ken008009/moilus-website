import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineReleaseAssets() {
  let basePath = '/';

  return {
    name: 'inline-release-assets',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      basePath = config.base || '/';
    },
    generateBundle(_options, bundle) {
      const htmlAsset = Object.values(bundle).find(
        (item) => item.type === 'asset' && item.fileName.endsWith('.html'),
      );

      if (!htmlAsset) return;

      let html = String(htmlAsset.source);
      const basePrefix = basePath.replace(/^\.?\//, '').replace(/\/$/, '');
      const prefixPattern = basePrefix ? `(?:\\./|\\/)?(?:${basePrefix}\\/)?` : '(?:\\./|\\/)?';

      for (const [fileName, item] of Object.entries(bundle)) {
        if (item.type === 'chunk' && fileName.endsWith('.js')) {
          const escapedName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          html = html.replace(
            new RegExp(`<script[^>]+src=["']${prefixPattern}${escapedName}["'][^>]*><\\/script>`),
            () => `<script type="module">${item.code}</script>`,
          );
          delete bundle[fileName];
        }

        if (item.type === 'asset' && fileName.endsWith('.css')) {
          const escapedName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          html = html.replace(
            new RegExp(`<link[^>]+href=["']${prefixPattern}${escapedName}["'][^>]*>`),
            () => `<style>${String(item.source)}</style>`,
          );
          delete bundle[fileName];
        }
      }

      htmlAsset.source = html;
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), inlineReleaseAssets()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
  },
});
