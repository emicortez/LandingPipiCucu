# Arquitectura

Static-first: Astro genera HTML en build. Sanity se consulta **solo en build** (sin tokens en el cliente). El JavaScript del cliente es mejora progresiva: sin JS, todo el contenido y la navegación funcionan.

```text
Sanity (publicado) ──GROQ en build──▶ src/lib/content.ts ──▶ páginas .astro ──▶ dist/ (Cloudflare Pages)
src/data/fallback.ts ──(sin projectId)──┘
```

## Estructura

```text
src/
├── assets/            imágenes procesadas por astro:assets (obras, personas, monogramas)
├── components/
│   ├── layout/        Header (menú <dialog>), Footer, PageIntro
│   ├── home/          Hero, FeaturedWorks, Collections, About, CustomOrders, LatestNews, FinalCta
│   ├── catalog/       Catalog (filtros/búsqueda/orden)
│   ├── artwork/       WorkTile
│   └── ui/            ArtworkImage, Breadcrumbs, Icon, RichText
├── data/fallback.ts   contenido local con procedencia anotada
├── layouts/           BaseLayout (head SEO, OG, JSON-LD, robots, bootstrap de movimiento)
├── lib/
│   ├── content.ts     API de contenido: normaliza, valida URLs, aplica defaults, regla de compra
│   ├── sanity/        cliente de solo lectura + consultas GROQ
│   ├── seo/           política de indexación, builders JSON-LD
│   ├── urls.ts        validación de URLs externas y WhatsApp
│   └── format.ts, navigation.ts
├── pages/             rutas + robots.txt.ts + sitemap.xml.ts
├── scripts/           analytics.ts, catalog.ts, motion/{hero,collections,word-reveal}.ts
├── styles/global.css  tokens (@theme), base, componentes compartidos
└── types/content.ts   contrato de contenido compartido
studio/                Sanity Studio independiente (schemas, estructura con singletons)
tests/e2e/             Playwright: site.spec (funcional + axe), screens.spec, vitals.spec
scripts/               brand-assets.mjs (derivados del logo), shrink.cjs (helper de capturas)
```

No se usa monorepo: el Studio tiene su propio `package.json`; el sitio no depende de él.

## Decisiones

| Decisión | Motivo |
| --- | --- |
| Contrato `src/types/content.ts` + adaptadores | Las páginas no conocen Sanity; el fallback y Sanity entregan la misma forma |
| Un error de Sanity rompe el build | Publicar un sitio con obras faltantes en silencio es peor que un deploy fallido |
| `useCdn: false` en build | El build tiene que ver lo recién publicado |
| `ArtworkImage` | Local → AVIF + WebP con `srcset`; Sanity → CDN con `auto=format`. Siempre `width`/`height` (CLS) y proporción original |
| Sitemap propio (sin `@astrojs/sitemap`) | Usa las mismas reglas de indexación que las páginas (categorías vacías y novedades sin cuerpo quedan fuera) |
| GSAP solo en componentes que lo usan | Astro empaqueta el script del componente únicamente en las páginas que lo incluyen |
| Fuentes autoalojadas (`@fontsource-variable`) | Sin request a terceros, `font-display: swap`, preload de la display |
| Sin React ni islas | Los únicos comportamientos (menú, catálogo, visor, motion) son scripts chicos |
| Analítica opcional (Plausible) | Sin cookies; eventos por `data-track`; no se envía el texto buscado |

## Seguridad

- Cliente Sanity sin token, perspectiva `published`.
- Toda URL editable pasa por `safeExternalUrl` (https; dominio Empretienda para enlaces de compra; mailto solo en texto enriquecido).
- `RichText` renderiza un subconjunto de Portable Text sin HTML crudo; JSON-LD escapa `<`.
- `public/_headers`: CSP, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, caché inmutable para `/_astro/*`.
