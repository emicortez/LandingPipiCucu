import type { APIRoute } from 'astro';
import { getArtworks, getCategories, getNews } from '../lib/content';

/** Sitemap with only indexable pages: the same rules the pages use for their robots meta. */
export const GET: APIRoute = async ({ site }) => {
  const [works, categories, news] = await Promise.all([getArtworks(), getCategories(), getNews()]);
  const paths = [
    '/', '/productos/', '/nosotras/', '/personalizados/', '/contacto/',
    ...(news.length ? ['/novedades/'] : []),
    ...categories.filter((c) => works.some((w) => w.category?.slug === c.slug)).map((c) => `/categorias/${c.slug}/`),
    ...works.map((w) => `/productos/${w.slug}/`),
    ...news.filter((n) => n.content.length > 0).map((n) => `/novedades/${n.slug}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
