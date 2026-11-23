# Sistema de diseño — "Taller cálido"

**Fuente de verdad de tokens y reglas: [DESIGN.md](DESIGN.md)** (generado por Impeccable desde el código) y `.impeccable/design.json`. Este archivo resume las decisiones para el equipo.

## Concepto

El sitio es la **mesa de trabajo del taller**: el rosa del logo (`#F3DCDF`) es la mesa en todas las páginas, y las fotos reales de las obras están apoyadas encima como copias impresas, con borde de papel, cinta washi y una leve inclinación (máx. 3°) que se endereza al pasar el mouse. El texto que necesita superficie va en tarjetas de papel. Hay notas a mano (una por pantalla como máximo) y una única banda carbón que cierra cada página.

Elegido por la usuaria entre cuatro direcciones ("Taller cálido / collage"). Reemplaza a la versión "atelier" (marfil + serif), que Impeccable señaló como el look más típico de las páginas generadas.

## Piezas del mundo

| Pieza | Dónde | Archivo |
| --- | --- | --- |
| Print (foto encintada) | Hero, obras, catálogo, ficha, nosotras | `src/components/ui/Print.astro` |
| Nota a mano + flecha | Hero, about, ficha, nosotras | `src/components/ui/HandNote.astro` (decorativa, `aria-hidden`) |
| Tarjeta de papel con cinta | Definición del nombre, pasos de encargo, artistas | `.paper.taped` en `global.css` |
| Chips de pintura | Ficha de obra | `src/lib/palette.ts` (colores muestreados en build del centro de la foto) |
| Inclinaciones | Grillas | `src/lib/tilt.ts` (secuencia fija, nunca un patrón regular) |

## Color y contraste (WCAG, calculados)

| Token | Valor | Uso | Contraste |
| --- | --- | --- | --- |
| mesa `--color-rose-100` | `#F3DCDF` | Fondo general | — |
| segunda superficie `--color-rose-200` | `#EBC4CC` | Colecciones, personalizados, relacionadas | — |
| papel `--color-rose-50` | `#FBF6F3` | Bordes de fotos, tarjetas | — |
| tinta `--color-ink` | `#252326` | Texto, botón primario, banda final | 12,5:1 sobre mesa |
| ciruela `--color-plum` | `#6B4753` | Texto secundario (teñido del rosa, nunca gris) | 6,08 mesa · 5,02 rosa 200 · 7,38 papel |
| rosa 700 | `#8C4660` | Enlaces, notas, foco | 5,10 mesa · 6,20 papel · 4,21 rosa 200 (solo texto grande) |
| rosa 500 | `#B66C82` | Acentos display | 3,59 papel (solo texto grande) |

## Tipografía

Bodoni Moda (titulares, didone como el monograma) · Jost (texto e interfaz) · Reenie Beanie (solo notas a mano). Escala fluida `--step--1` a `--step-5` (máx. 6 rem). Clases `.t-display`, `.t-1`…`.t-3` (nunca `.h-*`: chocan con Tailwind).

## Movimiento

- **Al cargar (≥1024 px):** las tres fotos del hero se "apoyan" en la mesa, una tras otra. El titular nunca se oculta (es el LCP).
- **Hover/foco:** cada foto se endereza y se levanta.
- **Scroll:** la definición de "pipí cucú" pasa de rosa a tinta.
- **Filtros del catálogo:** las obras se reacomodan con Flip.

Todo se desactiva con `prefers-reduced-motion`.
