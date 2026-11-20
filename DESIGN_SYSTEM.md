# Sistema de diseño

## Concepto: "obra al aire libre"

Las dueñas fotografían sus obras sostenidas contra el cielo de San Luis o apoyadas en el pasto. El sitio es la pared tranquila donde esas obras llegan: tres campos de color planos (el rosa del propio logo, marfil y carbón), las obras siempre completas, y el didone del monograma **PC.** en cada titular. La audacia se gasta en un solo lugar: la tipografía grande. Todo lo demás es callado.

Roles de las skills usadas: Frontend Design (dirección y composición), Taste (control anti-plantilla, sin captions bajo las fotos, hover discretos), UI UX Pro Max (consistencia de tokens y contraste), GSAP (arquitectura de movimiento), Impeccable (refinamiento y crítica), Web Design Guidelines (auditoría). Cuando se contradijeron, ganó el brief: por ejemplo, el título de la obra bajo la foto se mantiene porque es el nombre del producto, no una descripción.

## Color

| Token | Valor | Uso | Contraste |
| --- | --- | --- | --- |
| `--color-rose-100` | `#F3DCDF` | Fondo de marca (= fondo del logo original) | — |
| `--color-rose-50` | `#FAF0F2` | Bandas suaves, pared de las fichas | — |
| `--color-rose-500` | `#B66C82` | Acentos display (números de pasos, 404, definición) | 3,52:1 sobre marfil: solo texto grande |
| `--color-rose-700` | `#8C4660` | Enlaces, foco, marcadores | 6,08:1 marfil · 5,10:1 rosa |
| `--color-ink` | `#252326` | Texto, botón primario, bandas oscuras | 14,25:1 |
| `--color-ivory` | `#F8F4F1` | Fondo general, texto sobre carbón | — |
| `--color-stone` | `#645D60` | Texto secundario | 5,86:1 marfil · 4,92:1 rosa |
| `--color-stone-light` | `#C2B8BB` | Texto secundario sobre carbón | 8,07:1 |

Semánticos en `:root`: `--surface`, `--surface-brand`, `--surface-inverse`, `--text`, `--text-muted`, `--accent`, `--line`, `--focus`. La paleta del brief se ajustó al logo: `#F3DDE1` → `#F3DCDF` (medido en el archivo original), y el gris `#777173` se oscureció a `#645D60` para pasar AA sobre el rosa.

## Tipografía

| Rol | Familia | Por qué |
| --- | --- | --- |
| Display | Bodoni Moda Variable (OFL, ejes `opsz` + `wght`) | Didone de alto contraste, la misma familia de formas que la **P** y la **C** del logo. `font-optical-sizing: auto` afina los trazos según el tamaño |
| Texto e interfaz | Jost Variable (OFL) | Geométrica como el "PIPÍ CUCÚ / Pintura decorativa" del logo |

Reemplaza a Playfair Display + DM Sans (versión anterior). Para volver, cambiar `--font-display` y `--font-sans` en `src/styles/global.css` y los `@import` de fuentes.

Escala fluida (`clamp`, 320–1920 px): `--step--1` 14 px · `--step-0` 16–18 · `--step-1` 19–23 · `--step-2` 23–35 · `--step-3` 30–54 · `--step-4` 38–90 · `--step-5` 42–116. Clases: `.t-display`, `.t-1`, `.t-2`, `.t-3` (prefijo `t-` porque `h-*` es altura en Tailwind). Titulares con `line-height` 0,98–1,05 y tracking negativo; cuerpo 1,6. Sin mayúsculas sostenidas ni cursivas de acento.

## Layout

- `.wrap`: máx. 90 rem, margen lateral `clamp(1rem, 4vw, 4rem)`.
- Grilla de 12 columnas desde 64 rem; composiciones asimétricas (hero 7/5, obras en dos columnas colgadas con la derecha más baja, colecciones como índice tipográfico).
- Ritmo: rosa → marfil → carbón → marfil → rosa → carbón. Secciones con `--section` (72–160 px).
- Breakpoints: 40 rem (640), 48 rem (768), 64 rem (1024), 90 rem (1440).

## Imágenes

- Siempre en proporción original, con `width`/`height`. Nada de `object-fit: cover` en obras.
- Catálogo: marco 4:5 con `object-fit: contain` y obra apoyada abajo, sobre `--color-rose-50`, para alinear filas sin recortar.
- Hover: zoom 1,03 dentro del marco. Sin sombras, sin bordes redondeados en obras.

## Componentes

Botón primario (pill carbón; sobre carbón, marfil) y secundario (`.btn--line`). Enlace `.link` con subrayado que se retira al hover. Chips de filtro con `aria-pressed`. Campos pill con foco visible. Objetivos táctiles ≥ 44 px.

## Movimiento

| Momento | Dónde | Técnica |
| --- | --- | --- |
| La obra "se levanta" (clip-path desde abajo + escala) y las acciones aparecen | Hero, una vez, solo ≥ 64 rem | GSAP timeline |
| La definición pasa de rosa a tinta al leerla | Home, "¿Qué quiere decir pipí cucú?" | ScrollTrigger scrub + SplitText |
| Vista previa que sigue al puntero | Colecciones, solo puntero fino | `gsap.quickTo` |
| Reordenamiento al filtrar/ordenar | Catálogo (acción del usuario) | Flip |

Reglas: solo `transform`, `opacity` y `clip-path`; todo desactivado con `prefers-reduced-motion`; el titular (LCP) nunca se oculta; `html.motion-pending` es el único estado oculto y se quita a los 2,5 s aunque falle el JS. Sin Lenis, sin scroll-jacking, sin parallax de texto.
