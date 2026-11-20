// GROQ projections. Field names must match studio/schemaTypes (see CMS_GUIDE.md).

const image = (field: string) =>
  `${field}{ "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "alt": coalesce(alt, ""), hotspot }`;

const seo = `"seo": { "title": seo.title, "description": seo.description, "image": ${image('seo.image')} }`;

export const artworksQuery = `*[_type == "artwork" && visible != false && defined(slug.current)] | order(sortOrder asc, title asc) {
  "id": _id, title, "slug": slug.current, shortDescription, description,
  "images": images[]{ "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "alt": coalesce(alt, ""), hotspot },
  "category": category->{ name, "slug": slug.current },
  "tags": coalesce(tags, []), technique, dimensions,
  "featured": coalesce(featured, false), "sortOrder": coalesce(sortOrder, 100),
  externalStoreUrl, "customOrderAvailable": coalesce(customOrderAvailable, false),
  "seo": { "title": seoTitle, "description": seoDescription, "image": ${image('seoImage')} }
}`;

export const categoriesQuery = `*[_type == "category" && visible != false && defined(slug.current)] | order(sortOrder asc, name asc) {
  "id": _id, name, "slug": slug.current, description, "cover": ${image('coverImage')},
  "sortOrder": coalesce(sortOrder, 100), storeUrl, ${seo}
}`;

export const newsQuery = `*[_type == "news" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
  "id": _id, title, "slug": slug.current, excerpt, "cover": ${image('coverImage')},
  "content": coalesce(content, []), publishedAt, "featured": coalesce(featured, false), externalUrl, ${seo}
}`;

export const artistsQuery = `*[_type == "artistProfile"] | order(sortOrder asc, name asc) {
  "id": _id, name, role, "photo": ${image('photo')}, biography, "sortOrder": coalesce(sortOrder, 100)
}`;

export const homeQuery = `*[_type == "homePage"][0]{
  heroTitle, heroDescription, "heroArtworkSlug": heroArtwork->slug.current,
  "featuredArtworkSlugs": featuredArtworks[]->slug.current,
  "featuredCategorySlugs": featuredCategories[]->slug.current,
  aboutPreview, customOrdersSection, finalCTA
}`;

export const settingsQuery = `*[_type == "siteSettings"][0]{
  brandName, descriptor, "logo": ${image('logo')}, "alternativeLogo": ${image('alternativeLogo')},
  instagramUrl, whatsappNumber, storeUrl, customOrdersUrl, location, businessHours,
  defaultSeo, "socialImage": ${image('socialImage')}
}`;
