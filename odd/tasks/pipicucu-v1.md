# Pipí Cucú V1 — editorial site, catalog, CMS, SEO, QA

Objective: rebuild the Astro site as the V1 brand experience + exhibition catalog described in the master prompt (L2), with Sanity as admin and Empretienda as commerce.
Branch: `feat/pipicucu-v1`. Delivery: ask-on-risk, work-unit commits. Test runner: `astro check` + `astro build` + Playwright (`@playwright/test`, Edge channel) + axe.

## Specs

- S1: "Antes de implementar Pipí Cucú, identificá las skills instaladas y utilizalas de forma coordinada. Frontend Design y Taste para dirección de arte, UI UX Pro Max para el sistema visual, GSAP para animaciones, Impeccable para refinamiento y Web Design Guidelines para auditoría. Priorizá un diseño editorial excepcional sin comprometer SEO, accesibilidad, rendimiento ni arquitectura Astro."
- S2 (brief §1, §9): "No debemos reemplazar Empretienda." "No desarrollar carrito, checkout, pasarela de pagos ni gestión de pedidos." "No inventes información comercial, testimonios, reseñas, precios, promociones ni características de las obras." "La información obtenida de fuentes externas debe diferenciarse de la información confirmada por los propietarios." "no mostrar precios ni disponibilidad en la V1".
- S3 (brief §3): identity — "Conservar y evolucionar la identidad existente." Palette reference `#F3DDE1`, `#B66C82`, `#252326`, `#F7F3F0`, `#777173` ("aproximaciones iniciales. Analizá el logo original y ajustalos"). "Mantener el monograma PC". Typography: "Serif editorial expresiva para titulares" + "Sans-serif contemporánea"; "Implementar jerarquía tipográfica con `clamp()`".
- S4 (brief §4): GSAP "cuando aporte valor real"; "Priorizar `transform` y `opacity`"; "Respetar `prefers-reduced-motion`"; "Evitar animar contenido esencial de manera que quede invisible si JavaScript falla"; "No cargar GSAP donde no se necesita"; no scroll-jacking.
- S5 (brief §5): pages `/`, `/productos/`, `/productos/[slug]/`, `/categorias/[slug]/`, `/nosotras/`, `/personalizados/`, `/novedades/` (+ `[slug]`), `/contacto/`, 404. Catalog: "Filtros por categoría", "Búsqueda por nombre", "Ordenamiento cuando corresponda", "Estados vacíos"; "No añadir React por defecto"; "Mantener páginas indexables". Ficha: "No mostrar valores inventados." "No simular botones de compra que no funcionan."
- S6 (brief §8): Sanity models `artwork`, `category`, `news`, `artistProfile`, `homePage`, `siteSettings` with the brief's field lists; validations, unique slugs, alt text, ordering; "No exponer tokens de escritura."; publication "Sanity → webhook seguro → build de Astro → publicación."
- S7 (brief §10): canonicals, unique metadata, OG/Twitter, sitemap, robots, 404, breadcrumbs, JSON-LD (`Organization`, `BreadcrumbList`, `WebSite`, `Article`; `Product` "únicamente cuando las propiedades requeridas y recomendadas estén disponibles"), "Noindex en entornos de staging".
- S8 (brief §11-§14): LCP ≤ 2,5 s, CLS ≤ 0,1; responsive images with explicit dimensions; "No aplicar lazy loading a la imagen LCP."; "No utilizar indiscriminadamente `object-fit: cover`." "Para obras de arte, priorizar mostrar la pieza completa." WCAG 2.2 AA; 320 px without horizontal overflow.
- S9 (brief §15-§16): security headers, safe rich text, validated external URLs; privacy-respecting analytics events (tienda, producto, WhatsApp, Instagram, filtros, búsqueda, personalizados).
- S10 (brief §17): Playwright e2e + visual captures + axe; "No afirmar que una prueba se ejecutó si no fue ejecutada."
- S11 (brief §20): docs `README.md`, `SPECIFICATIONS.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `SEO_CHECKLIST.md`, `CMS_GUIDE.md`, `DEPLOYMENT.md`, `QA_REPORT.md`, `.env.example`, `CLAUDE.md`.

## Tasks

- T1 (S1-S3, S8): Design system: tokens, fonts (self-hosted), logo derivatives from the original raster, image pipeline (astro:assets + Sanity URLs). Route: inline. Status: pending.
- T2 (S2, S5, S6): Content contract (types, GROQ, demo data from real sources with provenance). Route: inline. Status: pending.
- T3 (S6): Sanity Studio schemas + desk structure + CMS_GUIDE. Route: delegated (parallel unit, disjoint `studio/`). Status: pending.
- T4 (S1, S4, S5, S8): Home with GSAP motion. Route: inline. Status: pending.
- T5 (S5): Catalog, ficha, categories, nosotras, personalizados, novedades, contacto, 404. Route: inline. Status: pending.
- T6 (S7, S9): SEO (meta, JSON-LD, sitemap, robots, noindex), headers, analytics hooks. Route: inline. Status: pending.
- T7 (S10): Playwright + axe tests, screenshots at 320/390/768/1024/1440/1920, fixes. Route: inline. Status: pending.
- T8 (S11): Documentation set. Route: inline. Status: pending.

## Log

- L1: "Antes de implementar Pipí Cucú, identificá las skills instaladas y utilizalas de forma coordinada. Frontend Design y Taste para dirección de arte, UI UX Pro Max para el sistema visual, GSAP para animaciones, Impeccable para refinamiento y Web Design Guidelines para auditoría. Priorizá un diseño editorial excepcional sin comprometer SEO, accesibilidad, rendimiento ni arquitectura Astro." + pasted "MASTER PROMPT — PIPÍ CUCÚ" (24 sections), quoted in S2-S11.
- L2 (2026-11-20) audit: previous herbarium work checkpointed as c911d9a. Assets: `agos.webp`, `deby.webp`, `founders.webp`, `brand*.webp` are Instagram screenshots with baked text/UI (not usable as photos); `gato.webp` has a mouse cursor baked over the ear; `founders-photo.webp` is low-res (390x816); logo is a 595x626 raster on `#F3DCDF`. Demo categories (Florales/Figurativas/Retratos/Simbólicas) were invented; real store categories: General (Porta llaves), Navidad, Regionales (Tradición), Cuadros (Naturaleza, Infantiles).
- L3 sources (Empretienda, external — not owner-confirmed for this site): tagline "Arte hecho a mano para llenar tus espacios de vida."; "Somos Deborah y Agostina (madre e hija) y creamos cuadros y objetos pintados a mano con dedicación. Cada pieza es única, como vos."; name definition from /quienes-somos; custom orders: techniques Acrílico, Acuarela, Óleo, Técnicas mixtas; process "escribinos por mensaje privado y coordinamos una cita (virtual o presencial)"; location "Buena Esperanza. San Luis. Argentina"; WhatsApp `wa.me/5492658409298` shown on the store (kept disabled until owners confirm it for this site). Instagram post text (owner-published): "Pintamos recuerdos, historias y lugares que merecen permanecer."; Deby and Agos bios from their own posts.
- L4 decision: typography moves from Playfair Display + DM Sans to Bodoni Moda (didone, matches the logo's PC letterforms) + Jost (geometric, matches the logo's "PIPÍ CUCÚ / Pintura decorativa" lettering), self-hosted. Reverting is a two-token change. Palette rose aligned to the logo background `#F3DCDF`.
