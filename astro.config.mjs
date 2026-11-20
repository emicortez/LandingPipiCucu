import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL is the canonical origin (no trailing slash needed). Set it per environment; see DEPLOYMENT.md.
const site = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://pipicucu.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: {
    domains: ['cdn.sanity.io'],
  },
  vite: { plugins: [tailwindcss()] },
});
