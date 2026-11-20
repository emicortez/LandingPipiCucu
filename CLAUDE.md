# Pipí Cucú — instrucciones permanentes para agentes

## Producto (no negociable)

- La web no vende. Carrito, checkout, precios, stock y pedidos viven en Empretienda (`pipicucupc.empretienda.com.ar`). Todo CTA de compra pasa por `storeLinkFor()` en `src/lib/content.ts`.
- No inventar datos comerciales, técnicas, medidas, plazos, testimonios ni biografías. Campo vacío = no se muestra. Anotar la procedencia de cualquier dato nuevo en `src/data/fallback.ts`.
- Obras siempre completas, en su proporción. Nunca `object-fit: cover` sobre una obra. Las capturas de Instagram (`assets-source/`) no son fotos de producto.
- No rediseñar el logo: los monogramas se derivan del original con `npm run brand:assets`.

## Código

- Contrato de datos: `src/types/content.ts`. Las páginas consumen solo `src/lib/content.ts`; Sanity solo se toca en `src/lib/sanity/`. Los nombres de campos GROQ deben coincidir con `studio/schemaTypes/`.
- Imágenes: siempre `ArtworkImage` (dimensiones explícitas, AVIF/WebP, CDN de Sanity).
- URLs editables: siempre por `safeExternalUrl` / `whatsappHref` (`src/lib/urls.ts`).
- Estilos: tokens en `src/styles/global.css`. Clases de títulos `.t-*` (nunca `.h-*`: chocan con Tailwind).
- Movimiento: GSAP solo en `src/scripts/motion/` y solo importado por el componente que lo usa. Solo `transform`/`opacity`/`clip-path`; respetar `prefers-reduced-motion`; nunca ocultar el titular del hero (es el LCP); contenido visible sin JS.
- Sin React, sin nuevas dependencias sin justificarlas en ARCHITECTURE.md.
- Textos de interfaz en español rioplatense (voseo, como la marca); identificadores y comentarios en inglés.

## Antes de dar algo por terminado

```bash
npm run check && npm run build && npm run test:e2e
```

Y para cambios visuales, `npm run test:screens` y revisar las capturas de `test-results/screens/` en 320, 390 y 1440 como mínimo. No afirmar que algo se probó sin haberlo ejecutado; actualizar QA_REPORT.md.
