---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/productos/index.astro"]
---

# Surface: Home (`/`) and shared site world

Mode: Persuade (home); the same world carries `/productos/`, fichas, categorías, nosotras, personalizados, novedades, contacto and 404.
Audience: visitors arriving from Instagram on their phones, at home, deciding on a piece or a gift. Job: see the real works, understand that a mother and daughter paint them by hand in Buena Esperanza, then continue to Empretienda (all orders, custom ones included, through the store or a private message).
Constraints: works always whole (round, portrait, landscape), no prices, no invented claims; palette rooted in the logo field #F3DCDF with ink #252326; Bodoni Moda (matches the PC. monogram) + Jost; handwriting only as sparse annotation; Astro static, light JS, Sanity data shape unchanged; LCP element never hidden by motion.

## Direction contract

THESIS: The site is the workshop's table: real photographs of the works lie on it as prints, taped down, overlapping, annotated by hand. Refuses the category default of a cream page with a serif headline beside one product photo and a row of equal cards.

OWN-WORLD: Drenched powder rose (#F3DCDF) is the table itself on every page; a deeper rose (#EBC4CC) marks second surfaces; one charcoal band closes the page. Works are prints: an off-white paper border, a soft offset shadow, a translucent rose washi-tape strip, a slight rotation (max 3°) that straightens when touched. Paper cards hold text that needs a surface (the definition, the steps). Pencil-hand annotations (one hand-lettering face, ink or deep rose) and hand-drawn arrows point at things, never more than one per screen. Each ficha shows the work's own paint chips sampled from its photograph.

STORY: The visitor lands on the table, sees three real works and the promise "Pintamos recuerdos, historias y lugares que merecen permanecer", meets Deby and Agos, opens a work, sees its colours, and goes to the store.

FIRST VIEWPORT: "La mesa viva" (overdrive, chosen by the user 2026-11-23). The whole first screen under the header is the rose table: up to six taped prints of real works scattered toward the edges at large scale and different tilts; in the centre, on top of everything, a taped paper note holds the Bodoni headline (about 4rem), the subcopy, primary "Ver el catálogo" and secondary "Tienda online ↗". One hand note "agarrá una foto" with an arrow to a print (fine pointers only). On phones: the note first, then four prints overlapping below it; no dragging.

FORM: seed: none (pinned) — user choice: "Taller cálido / collage: Más artesanal y afectivo: fotos que se superponen como sobre una mesa de trabajo, rosa protagonista, detalles manuscritos y papel. Más color y calidez."

Signature interaction: on load the prints are laid on the table one by one (desktop, headline never hidden); with a mouse the visitor can pick up any print and throw it across the table (Draggable + inertia, lifts while held, settles with a soft elastic), a plain click still opens the work; prints drift with the cursor by depth and slide off the table as the page scrolls. Elsewhere a print straightens and lifts on hover/focus. Transform, opacity and shadow only; all of it off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
