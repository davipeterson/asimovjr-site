// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Endereço e caminho base do site.
 *
 * - GitHub Pages (hoje): https://davipeterson.github.io/asimovjr-site/
 *   O workflow de deploy preenche SITE_URL e BASE_PATH sozinho.
 * - Hostinger (depois): https://asimovjr.com.br, na raiz do domínio.
 *   Basta usar SITE_URL=https://asimovjr.com.br e BASE_PATH=/
 *   (veja "Migração para a Hostinger" no README).
 */
const site = process.env.SITE_URL ?? 'https://davipeterson.github.io';
const base = process.env.BASE_PATH ?? '/asimovjr-site';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    // O guia de estilo é interno e fica fora do sitemap.
    sitemap({ filter: (page) => !page.includes('/estilo') }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
