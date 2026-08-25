import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function redirectRootToOfficial() {
  const redirect = (req, res, next) => {
    if (req.url === '/' || req.url === '/index.html') {
      res.writeHead(302, { Location: '/official/' });
      res.end();
      return;
    }
    next();
  };

  return {
    name: 'redirect-root-to-official',
    configureServer(server) {
      server.middlewares.use(redirect);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
    },
  };
}

function inlineReleaseAssets() {
  let basePath = '/official/';

  return {
    name: 'inline-release-assets',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      basePath = config.base || '/official/';
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
  base: '/official/',
  plugins: [redirectRootToOfficial(), react(), inlineReleaseAssets()],
  build: {
    outDir: 'official',
    assetsInlineLimit: 100000000,
  },
});
