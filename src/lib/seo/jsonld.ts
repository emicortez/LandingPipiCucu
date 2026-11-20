/**
 * JSON-LD builders. Only facts that are visible on the page and confirmed in the content
 * are emitted. No Product markup: the site shows no price or availability (see SEO_CHECKLIST.md).
 */
import type { News, SiteSettings } from '../../types/content';

type Json = Record<string, unknown>;

export function organization(settings: SiteSettings, site: string, logoUrl: string): Json {
  const sameAs = [settings.instagramUrl, settings.storeUrl].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site}#organization`,
    name: settings.brandName,
    description: settings.defaultSeo.description,
    url: site,
    logo: logoUrl,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buena Esperanza',
      addressRegion: 'San Luis',
      addressCountry: 'AR',
    },
  };
}

export function website(settings: SiteSettings, site: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}#website`,
    name: settings.brandName,
    url: site,
    inLanguage: 'es-AR',
    publisher: { '@id': `${site}#organization` },
  };
}

export interface Crumb { name: string; path: string; }

export function breadcrumbList(crumbs: Crumb[], site: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, site).href,
    })),
  };
}

export function article(news: News, site: string, imageUrl: string | undefined): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: news.title,
    description: news.excerpt,
    datePublished: news.publishedAt,
    image: imageUrl ? [imageUrl] : undefined,
    mainEntityOfPage: new URL(`/novedades/${news.slug}/`, site).href,
    author: { '@id': `${site}#organization` },
    publisher: { '@id': `${site}#organization` },
    inLanguage: 'es-AR',
  };
}

/** Serializes for a <script type="application/ld+json">, escaping "<" so content can't close the tag. */
export function serialize(data: Json | Json[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
