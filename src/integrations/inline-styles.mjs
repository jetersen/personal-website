import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const STYLE_RE = /<style[^>]*>([\s\S]*?)<\/style>/g;

async function walkHtml(dir, fn) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(p, fn);
    else if (entry.name.endsWith('.html')) await fn(p);
  }
}

export function moveStylesToEndOfHead() {
  return {
    name: 'move-styles',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let fileCount = 0;
        await walkHtml(root, async (p) => {
          let html = await readFile(p, 'utf8');
          const styles = [];
          html = html.replace(STYLE_RE, (m) => {
            styles.push(m);
            return '';
          });
          if (styles.length) {
            html = html.replace('</head>', styles.join('') + '</head>');
            fileCount++;
          }
          await writeFile(p, html);
        });
        logger.info(`Moved styles to end of <head> in ${fileCount} files`);
      },
    },
  };
}

export function injectStyleHashes() {
  return {
    name: 'inject-style-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const hashes = new Set();
        await walkHtml(root, async (p) => {
          const html = await readFile(p, 'utf8');
          for (const [, content] of html.matchAll(STYLE_RE)) {
            const hash = createHash('sha256').update(content).digest('base64');
            hashes.add(`'sha256-${hash}'`);
          }
        });
        const headersPath = join(root, '_headers');
        let headers = await readFile(headersPath, 'utf8');
        headers = headers.replace("'unsafe-inline'", [...hashes].join(' '));
        await writeFile(headersPath, headers);
        logger.info(`Injected ${hashes.size} style hashes into _headers`);
      },
    },
  };
}
