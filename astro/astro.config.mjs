import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Use Tailwind and autoprefixer from astro/node_modules to avoid version conflicts
const require = createRequire(import.meta.url);
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

export default defineConfig({
  site: 'https://wayfarerfootprints.com',
  output: 'static',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/cms-admin') &&
        !page.includes('/client-portal'),
      serialize(item) {
        const url = item.url;
        if (url === 'https://wayfarerfootprints.com/')
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (/\/destinations\/[^/]+$/.test(url))
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        if (url.includes('/blog/'))
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        if (url.includes('/destinations'))
          return { ...item, priority: 0.85, changefreq: 'weekly' };
        if (url.includes('/trips'))
          return { ...item, priority: 0.7, changefreq: 'weekly' };
        return { ...item, priority: 0.6, changefreq: 'monthly' };
      },
    }),
  ],
  markdown: {
    remarkPlugins: [['remark-gfm', {}]],
    rehypePlugins: [['rehype-slug', {}]],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../client/src'),
        '@assets': path.resolve(__dirname, '../attached_assets'),
        '@shared': path.resolve(__dirname, '../shared'),
      },
      dedupe: ['react', 'react-dom'],
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss(path.resolve(__dirname, 'tailwind.config.ts')),
          autoprefixer,
        ],
      },
    },
    server: {
      fs: {
        allow: [path.resolve(__dirname, '../')],
      },
    },
    ssr: {
      noExternal: ['@radix-ui/*', 'vaul', 'cmdk', 'embla-carousel-react'],
    },
  },
  publicDir: path.resolve(__dirname, '../client/public'),
});
