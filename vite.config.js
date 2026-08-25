import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineReleaseAssets() {
  return {
    name: 'inline-release-assets',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlAsset = Object.values(bundle).find(
        (item) => item.type === 'asset' && item.fileName.endsWith('.html'),
      );

      if (!htmlAsset) return;

      let html = String(htmlAsset.source);

      for (const [fileName, item] of Object.entries(bundle)) {
        if (item.type === 'chunk' && fileName.endsWith('.js')) {
          const escapedName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          html = html.replace(
            new RegExp(`<script[^>]+src=["']\\.?\\/?${escapedName}["'][^>]*><\\/script>`),
            () => `<script type="module">${item.code}</script>`,
          );
          delete bundle[fileName];
        }

        if (item.type === 'asset' && fileName.endsWith('.css')) {
          const escapedName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          html = html.replace(
            new RegExp(`<link[^>]+href=["']\\.?\\/?${escapedName}["'][^>]*>`),
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
  base: './',
  plugins: [react(), inlineReleaseAssets()],
  build: {
    outDir: 'release',
    assetsInlineLimit: 100000000,
  },
});
