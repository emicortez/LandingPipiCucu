import type { ImageMetadata } from 'astro';

/**
 * Content contract shared by the Sanity adapter (src/lib/sanity) and the local
 * fallback content (src/data). Pages only ever see these shapes.
 */

/** A picture of a work or a person. `src` is a bundled asset (local) or an absolute CDN URL (Sanity). */
export interface ArtImage {
  src: ImageMetadata | string;
  width: number;
  height: number;
  alt: string;
  /** Focal point (0..1) for the rare intentional crop; works are shown whole by default. */
  hotspot?: { x: number; y: number };
}

export interface Seo {
  title?: string;
  description?: string;
  image?: ArtImage;
}

export interface CategoryRef {
  name: string;
  slug: string;
}

export interface Category extends CategoryRef {
  id: string;
  description?: string;
  cover?: ArtImage;
  sortOrder: number;
  /** Matching category page in Empretienda, used when the site has no works for it yet. */
  storeUrl?: string;
  seo: Seo;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  /** Plain text; blank lines separate paragraphs. */
  description?: string;
  images: ArtImage[];
  category?: CategoryRef;
  tags: string[];
  technique?: string;
  dimensions?: string;
  featured: boolean;
  sortOrder: number;
  externalStoreUrl?: string;
  customOrderAvailable: boolean;
  seo: Seo;
  /** Paint chips sampled at build time from the centre of the first photo (src/lib/palette.ts). */
  palette?: string[];
}

/** Portable Text subset rendered by RichText.astro (no raw HTML is ever rendered). */
export interface RichSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}
export interface RichBlock {
  _type: 'block';
  _key?: string;
  style?: 'normal' | 'h2' | 'h3' | 'blockquote';
  listItem?: 'bullet' | 'number';
  children: RichSpan[];
  markDefs?: { _key: string; _type: 'link'; href?: string }[];
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover?: ArtImage;
  content: RichBlock[];
  publishedAt: string;
  featured: boolean;
  externalUrl?: string;
  seo: Seo;
}

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  photo?: ArtImage;
  biography: string;
  sortOrder: number;
}

export interface TextBlock {
  title: string;
  text: string;
}

export interface HomePage {
  heroTitle: string;
  heroDescription: string;
  heroArtworkSlug?: string;
  featuredArtworkSlugs: string[];
  featuredCategorySlugs: string[];
  aboutPreview: TextBlock;
  customOrdersSection: TextBlock;
  finalCTA: TextBlock;
}

export interface SiteSettings {
  brandName: string;
  descriptor: string;
  logo?: ArtImage;
  alternativeLogo?: ArtImage;
  instagramUrl: string;
  /** International digits only (e.g. 549...). Empty until the owners confirm it. */
  whatsappNumber?: string;
  storeUrl: string;
  /** Empretienda page that explains custom orders. */
  customOrdersUrl?: string;
  location: string;
  businessHours?: string;
  defaultSeo: { title: string; description: string };
  socialImage?: ArtImage;
}
