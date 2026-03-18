import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gsdigitais.com',
  output: 'static',

  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'pt-br',
        locales: {
          'pt-br': 'pt-BR',
          en: 'en-US',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        // Pagefind é gerado no build e servido como asset estático —
        // não faz parte do bundle do Vite.
        external: [/^\/pagefind\//],
      },
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
