# Pipí Cucú — sitio de marca y catálogo

Sitio editorial y catálogo de exhibición de **Pipí Cucú**, taller de pintura decorativa de Deby y Agos (madre e hija) en Buena Esperanza, San Luis.
La web presenta, inspira y deriva: **las ventas, precios, pagos y envíos siguen en [Empretienda](https://pipicucupc.empretienda.com.ar/)**. No hay carrito ni checkout propios.

| Documento | Para qué |
| --- | --- |
| [SPECIFICATIONS.md](SPECIFICATIONS.md) | Qué hace el sitio, alcance V1 y pendientes |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Estructura del código, flujo de datos, decisiones |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Dirección de arte, tokens, tipografía, movimiento |
| [SEO_CHECKLIST.md](SEO_CHECKLIST.md) | SEO técnico y local implementado y pendiente |
| [CMS_GUIDE.md](CMS_GUIDE.md) | Guía para las dueñas: cargar obras y textos en Sanity |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Variables, Cloudflare Pages, webhook, dominio |
| [QA_REPORT.md](QA_REPORT.md) | Pruebas ejecutadas y resultados |
| [CLAUDE.md](CLAUDE.md) | Reglas permanentes para agentes de código |

## Stack

Astro 7 (estático) · TypeScript estricto · Tailwind CSS 4 + CSS por componente · GSAP 3 (solo donde aporta) · Sanity Studio 4 (`studio/`) · Playwright + axe · Cloudflare Pages.

## Empezar

Requiere Node 22+ (probado con Node 24) y npm.

```bash
npm install
npm run dev          # http://localhost:4321
```

Sin `PUBLIC_SANITY_PROJECT_ID` el sitio usa el contenido local de `src/data/fallback.ts` (fotos reales, títulos provisorios). Con Sanity configurado, el contenido sale del CMS en cada build.

| Script | Hace |
| --- | --- |
| `npm run build` / `npm run preview` | Build estático en `dist/` y servidor local del build |
| `npm run check` | Type check (`astro check`) |
| `npm run test:e2e` | Suite Playwright + axe contra el build (usa Microsoft Edge del sistema) |
| `npm run test:screens` | Capturas de todas las páginas en 320–1920 px en `test-results/screens/` |
| `npm run qa` | check + build + e2e |
| `npm run brand:assets` | Regenera monogramas, favicons e imagen social desde el logo original |

Studio de Sanity:

```bash
cd studio && npm install && npm run dev   # http://localhost:3333
```
