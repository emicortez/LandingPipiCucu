/**
 * Content API for pages. Reads Sanity at build time when configured, otherwise the local
 * fallback. A failed Sanity request fails the build on purpose: publishing a site with
 * silently missing works is worse than a failed deploy.
 */
import type { ArtImage, Artwork, ArtistProfile, Category, HomePage, News, SiteSettings } from '../types/content';
import { sanity } from './sanity/client';
import { artistsQuery, artworksQuery, categoriesQuery, homeQuery, newsQuery, settingsQuery } from './sanity/queries';
import {
  fallbackArtists, fallbackArtworks, fallbackCategories, fallbackHome, fallbackNews, fallbackSettings,
} from '../data/fallback';
import { STORE_HOST, safeExternalUrl } from './urls';

export const usingDemo = !sanity;

const cache = new Map<string, Promise<unknown>>();
function load<T>(key: string, query: string, fallback: T): Promise<T> {
  if (!sanity) return Promise.resolve(fallback);
  if (!cache.has(key)) cache.set(key, sanity.fetch<T>(query));
  return cache.get(key) as Promise<T>;
}

/** Sanity projects a missing image as an object of nulls; keep only real images. */
function realImage(image: Partial<ArtImage> | null | undefined): ArtImage | undefined {
  if (!image || !image.src || !image.width || !image.height) return undefined;
  return { src: image.src, width: image.width, height: image.height, alt: image.alt ?? '', hotspot: image.hotspot ?? undefined };
}

const blank = (v: unknown) => v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

/** Fills every blank field of `fetched` from `base`, one level of nested objects deep. */
function withDefaults<T extends object>(base: T, fetched: Partial<T> | null | undefined): T {
  const out = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(fetched ?? {})) {
    if (blank(value)) continue;
    const def = (base as Record<string, unknown>)[key];
    out[key] = def && typeof def === 'object' && !Array.isArray(def) && typeof value === 'object' && !Array.isArray(value)
      ? withDefaults(def as object, value as object)
      : value;
  }
  return out as T;
}

export async function getSettings(): Promise<SiteSettings> {
  const raw = await load<Partial<SiteSettings> | null>('settings', settingsQuery, null);
  const s = withDefaults(fallbackSettings, raw);
  return {
    ...s,
    storeUrl: safeExternalUrl(s.storeUrl) ?? fallbackSettings.storeUrl,
    instagramUrl: safeExternalUrl(s.instagramUrl) ?? fallbackSettings.instagramUrl,
    customOrdersUrl: safeExternalUrl(s.customOrdersUrl, { host: STORE_HOST }) ?? fallbackSettings.customOrdersUrl,
    logo: realImage(s.logo),
    alternativeLogo: realImage(s.alternativeLogo),
    socialImage: realImage(s.socialImage),
  };
}

export async function getHome(): Promise<HomePage> {
  const raw = await load<Partial<HomePage> | null>('home', homeQuery, null);
  const home = withDefaults(fallbackHome, raw);
  return {
    ...home,
    featuredArtworkSlugs: (home.featuredArtworkSlugs ?? []).filter(Boolean),
    featuredCategorySlugs: (home.featuredCategorySlugs ?? []).filter(Boolean),
  };
}

export async function getArtworks(): Promise<Artwork[]> {
  const raw = await load<Artwork[]>('artworks', artworksQuery, fallbackArtworks);
  return raw
    .map((a) => ({
      ...a,
      images: (a.images ?? []).map(realImage).filter((i): i is ArtImage => Boolean(i)),
      externalStoreUrl: safeExternalUrl(a.externalStoreUrl, { host: STORE_HOST }),
      seo: { ...a.seo, image: realImage(a.seo?.image) },
    }))
    .filter((a) => a.images.length > 0);
}

export async function getCategories(): Promise<Category[]> {
  const raw = await load<Category[]>('categories', categoriesQuery, fallbackCategories);
  return raw.map((c) => ({
    ...c,
    cover: realImage(c.cover),
    storeUrl: safeExternalUrl(c.storeUrl, { host: STORE_HOST }),
    seo: { ...c.seo, image: realImage(c.seo?.image) },
  }));
}

export async function getNews(): Promise<News[]> {
  const raw = await load<News[]>('news', newsQuery, fallbackNews);
  return raw.map((n) => ({
    ...n,
    cover: realImage(n.cover),
    externalUrl: safeExternalUrl(n.externalUrl),
    seo: { ...n.seo, image: realImage(n.seo?.image) },
  }));
}

export async function getArtists(): Promise<ArtistProfile[]> {
  const raw = await load<ArtistProfile[]>('artists', artistsQuery, fallbackArtists);
  return raw.map((a) => ({ ...a, photo: realImage(a.photo) }));
}

export interface StoreLink {
  href: string;
  label: string;
  /** "work": the exact product page; "category" or "store": a fallback the visitor is told about. */
  kind: 'work' | 'category' | 'store';
}

/** Where the "buy" action of a work goes. Never pretends a fallback is the product page. */
export function storeLinkFor(work: Artwork, categories: Category[], settings: SiteSettings): StoreLink {
  if (work.externalStoreUrl) return { href: work.externalStoreUrl, label: 'Ver esta obra en la tienda', kind: 'work' };
  const category = categories.find((c) => c.slug === work.category?.slug);
  if (category?.storeUrl) return { href: category.storeUrl, label: `Ver ${category.name.toLocaleLowerCase('es')} en la tienda`, kind: 'category' };
  return { href: settings.storeUrl, label: 'Ir a la tienda online', kind: 'store' };
}

/** Works ordered by the home selection when set, else the featured flag, else catalog order. */
export function pickFeatured(works: Artwork[], slugs: string[], max = 6): Artwork[] {
  if (slugs.length) return slugs.map((s) => works.find((w) => w.slug === s)).filter((w): w is Artwork => Boolean(w)).slice(0, max);
  const featured = works.filter((w) => w.featured);
  return (featured.length ? featured : works).slice(0, max);
}
