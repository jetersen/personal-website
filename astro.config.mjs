// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jetersen.dev',
  output: 'static',
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
});
