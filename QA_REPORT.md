# QA — reporte

Fecha: 2026-11-20 · Rama `feat/pipicucu-v1` · Windows 11, Node 24.21, Astro 7.4.13, Playwright 1.65 con Microsoft Edge del sistema.
Todo lo listado acá se ejecutó; lo no ejecutado está en "No probado".

## Resultados

| Chequeo | Comando | Resultado |
| --- | --- | --- |
| Type check | `npm run check` | 0 errores, 0 warnings |
| Build | `npm run build` | 16 páginas, sin errores |
| Studio | `cd studio && npx tsc --noEmit` · `npx sanity build` | OK · OK (con projectId de ejemplo) |
| E2E + accesibilidad | `npm run test:e2e` | **80/80** (desktop 1440 + Pixel 7) |
| Capturas | `npm run test:screens` | 10 páginas × 6 anchos (320, 390, 768, 1024, 1440, 1920), revisadas a ojo |
| Web Vitals de laboratorio | `npx playwright test vitals` | ver tabla |

La suite E2E cubre: estado 200 y metadata única por ruta, sin errores de consola, JSON-LD válido y sin `Product`/precios, robots y sitemap, categoría vacía `noindex`, 404 real, todos los enlaces externos https con `noopener` y los de compra en el dominio de Empretienda, ningún `href="#"`, enlaces internos 200, CTA de ficha honesto, catálogo (búsqueda, acentos, orden, estado vacío, reset), sin JavaScript, skip link, menú móvil (`<dialog>`, Escape, foco de retorno), visor de obra, **axe WCAG 2.0/2.1/2.2 A+AA sin violaciones serias ni críticas en 9 rutas**, sin overflow horizontal en 6 anchos, movimiento reducido y que nada quede oculto tras la entrada.

## Web Vitals (laboratorio, preview local, CPU 4×, ~1,6 Mbps, 150 ms RTT)

| Ruta | Perfil | LCP | CLS | Transferido |
| --- | --- | --- | --- | --- |
| `/` | Pixel 7 | 980 ms | 0,000 | 333 KB |
| `/` | Desktop 1440 | 900 ms | 0,024 | 337 KB |
| `/productos/` | Pixel 7 | 1480 ms | 0,013 | 264 KB |
| `/productos/mariposa-azul/` | Pixel 7 | 804 ms | 0,000 | 227 KB |

Son mediciones locales sin CDN: orientativas, no reemplazan datos reales (CrUX / Cloudflare Web Analytics) tras el despliegue. INP no se midió.

## Problemas encontrados y corregidos

1. Clases `.h-1/.h-2/.h-3` chocaban con utilidades de altura de Tailwind (`height: .25rem`) → títulos superpuestos al texto. Renombradas a `.t-*`.
2. `<Picture>` generaba fallbacks PNG de hasta 1,2 MB → fallback WebP.
3. LCP de la home 4,1 s en móvil porque la entrada animada ocultaba el titular y la foto. El titular ya no se anima y la foto solo se revela en ≥ 1024 px → 0,98 s.
4. Grilla de obras con huecos de una fila entera → dos columnas colgadas.
5. Enlace del logo con `aria-label` distinto del texto visible (WCAG 2.5.3) en todas las páginas → nombre accesible a partir del texto visible.
6. Filas de colecciones sin miniatura desalineadas en móvil.

## No probado / limitaciones

- Lectores de pantalla reales (NVDA/VoiceOver) y dispositivos físicos.
- Safari/WebKit y Firefox (solo motor Chromium/Edge).
- Integración contra un proyecto Sanity real (no hay `projectId`); se probó el adaptador con el contenido local y el Studio compila.
- Webhook y deploy en Cloudflare (sin cuenta en este entorno).
- Validación con Rich Results Test / Search Console (requiere URL pública).
- La herramienta de "finish gate" de la skill Taste no se ejecutó: su flujo asume páginas HTML estáticas de su propio kit; se aplicaron sus reglas manualmente.

## Pendientes conocidos

- "¿Qué quiere decir pipí cucú?", la foto de las fundadoras y los pasos de personalizados viven en `src/data/fallback.ts`, no en Sanity.
- Assets a reemplazar: logo vectorial, foto limpia del gato, retrato de mayor resolución (ver SPECIFICATIONS.md).
- ESLint no está configurado; la calidad estática se cubre hoy con `astro check` (TypeScript estricto).
