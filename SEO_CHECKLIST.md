# SEO — checklist

Leyenda: ✅ implementado y probado (`tests/e2e/site.spec.ts`) · 🟡 implementado, falta validar en producción · ⬜ pendiente.

## Técnico

- ✅ HTML semántico, un `h1` por página, jerarquía de encabezados (axe).
- ✅ URLs limpias con barra final (`trailingSlash: 'always'`), slugs estables desde Sanity.
- ✅ `canonical` absoluto por página (depende de `SITE_URL`).
- ✅ `title` único por página (test) y `meta description` ≥ 50 caracteres.
- ✅ Open Graph + Twitter Card con imagen absoluta (obra de la página o `og-default.jpg` 1200×630).
- ✅ `robots.txt` generado: producción `Allow` + sitemap; cualquier otro entorno `Disallow: /`.
- ✅ `meta robots` `noindex` en staging (Cloudflare: rama ≠ `PRODUCTION_BRANCH`), en 404, en categorías sin obras y en novedades sin cuerpo.
- ✅ `sitemap.xml` propio que excluye exactamente esas páginas.
- ✅ 404 personalizada con estado 404.
- ✅ Breadcrumbs visibles + `BreadcrumbList`.
- ✅ Imágenes con `alt` (obligatorio en el Studio), `width`/`height`, AVIF/WebP responsive.
- ✅ Enlaces internos: obras ↔ categorías ↔ catálogo ↔ relacionadas; todos resuelven 200 (test).
- 🟡 Redirecciones: no hay URLs antiguas publicadas. Si se migra un dominio, declarar en `public/_redirects`.
- 🟡 Validar en producción con Rich Results Test y Search Console.

## Datos estructurados

| Tipo | Dónde | Estado |
| --- | --- | --- |
| `Organization` (+ `PostalAddress` localidad/provincia/país) | Home | ✅ |
| `WebSite` | Home | ✅ |
| `BreadcrumbList` | Todas las internas | ✅ |
| `Article` | Novedades | ✅ |
| `Product` | — | No se emite: el sitio no muestra precio ni disponibilidad y Google exige `offers`, `review` o `aggregateRating`. Test lo garantiza |
| `LocalBusiness` | — | ⬜ Solo si confirman dirección/atención al público y horarios |

## Local

- ✅ "Buena Esperanza, San Luis" en `title` por defecto, descripciones, hero, footer y `Organization`.
- ✅ Títulos por intención: "Cuadros personalizados pintados a mano", "Catálogo de obras pintadas a mano", "{Categoría} pintados a mano".
- ⬜ Investigación de palabras clave con datos reales (Search Console tras 4–6 semanas) antes de ajustar títulos definitivos. No se usó una herramienta de volumen en esta etapa.
- ⬜ Perfil de Google Business (si existe) con el mismo nombre, localidad y enlaces.
- ⬜ Consistencia NAP con Instagram y Empretienda cuando se confirme el WhatsApp.

## Convivencia con Empretienda

- Las fichas del sitio aportan contexto propio (descripción editorial, relacionadas, categoría) y no copian descripciones comerciales.
- Páginas con valor SEO propio: home, catálogo, fichas, categorías con obras, nosotras, personalizados.
- Precios y stock viven solo en Empretienda: no se duplican.
