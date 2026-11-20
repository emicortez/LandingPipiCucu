---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/productos/index.astro"]
---

# Surface: Home (`/`) and shared site chrome

Mode: Persuade (home), shared world for `/productos/`, fichas, novedades and 404.
Audience: visitors arriving from Instagram; job: discover the works and the two makers, then continue to Empretienda. All orders, including custom ones, go to the store.
Constraints: PRODUCT.md palette and fonts are fixed (Playfair Display + DM Sans; #EECDD3, #F8F5F1, #28242A, #B56F82). Works shown whole (round, portrait, landscape). No prices, no invented claims. Astro static, light JS, Sanity data shape unchanged.

## Direction contract

THESIS: The catalog is the workshop's herbarium: every work is a mounted plate (lámina) with a numbered specimen label. Refuses the category default of a cream hero split with a product-card row.

OWN-WORLD: Ivory mounting board (#F8F5F1) on powdered-rose fields (#EECDD3) that own whole bands; charcoal ink (#28242A); deep rose (#B56F82) only for label rules, plate numbers and active states. Components: plates with paper photo-corners and a hairline mount margin; specimen labels as a ruled grid (Nº, title in Playfair italic, category, technique, measures) in DM Sans small caps; index tabs as filters. Flowers and butterflies appear only inside the real works.

STORY: The visitor sees a real work mounted like a treasured specimen, learns it is hand-painted by Deby and Agos (mother and daughter) in Buena Esperanza, browses the plates, opens one, and goes to the store.

FIRST VIEWPORT: Rose field. Left ~40%: tiny "Lámina Nº 01" over a huge Playfair headline "Arte para espacios con historia.", one line of subcopy, primary "Ver las obras" and secondary "Tienda ↗". Right ~60%: one large mounted plate (Mariposa azul, shown whole) with photo-corners and its specimen label pinned at the bottom edge carrying a direct store shortcut.

FORM: Herbario de láminas, position 3 of 7 on the ordered list; seed:9e485c5f9428324f.

Signature interaction: hovering/focusing a plate lifts it off the board (shadow + 2px translate) and its label slides out the store shortcut; motion is a single paper-lift easing, disabled under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
