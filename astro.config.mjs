// @ts-check
import { defineConfig, envField } from 'astro/config';

import compress from 'astro-compress';
import { moveStylesToEndOfHead, injectStyleHashes } from './src/integrations/inline-styles.mjs';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jetersen.dev',
  output: 'static',

  build: {
    inlineStylesheets: 'always',
  },

  markdown: {
    syntaxHighlight: 'prism',
  },

  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  experimental: {
    svgo: true,
  },

  integrations: [
    moveStylesToEndOfHead(),
    compress(),
    injectStyleHashes(),
    sitemap({
      lastmod: new Date(),
    })],
});
