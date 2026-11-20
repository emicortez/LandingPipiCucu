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

OWN-WORLD: Contemporary gallery edition of the herbarium. Powdered rose (#EECDD3), charcoal (#28242A) and ivory (#F8F5F1) own whole bands as flat, full-bleed color fields (rose hero and catalog intro, charcoal art block and story, ivory walls for the collection); deep rose (#B56F82) only for plate numbers and active states. Works hang frameless (no mounts, photo-corners, tilt or drop shadows), shown whole and aligned to a common baseline. The plate number is display type: a giant Playfair italic numeral behind the hero work and on the ficha, a large numeral beside each title. Labels are typography, not boxes: number, Playfair italic title, DM Sans tracked-caps category under a single hairline; the ficha record is a plain spec list. Strong scale contrast (tiny tracked DM Sans labels vs 6rem Playfair headlines with -0.04em tracking), asymmetric 12-column editorial grid for selected works, text tabs and underline-only inputs. Flowers and butterflies appear only inside the real works.

STORY: The visitor sees a real work mounted like a treasured specimen, learns it is hand-painted by Deby and Agos (mother and daughter) in Buena Esperanza, browses the plates, opens one, and goes to the store.

FIRST VIEWPORT: Full-height split under the header. Left, on the rose field: oversized Playfair headline "Arte para espacios con historia." (last word italic in deep rose), one line of subcopy, primary "Ver las obras" and secondary "Tienda ↗", and the editable index line ("Lámina Nº 01") as a tiny tracked caption at the foot. Right, a full-bleed charcoal block: the hero work (Mariposa azul, shown whole) large and centered over its giant rose plate numeral, with its label (number, title, category) and a direct store shortcut along the bottom. On phones the charcoal block stacks under the copy.

FORM: Herbario de láminas, position 3 of 7 on the ordered list; seed:9e485c5f9428324f.

Signature interaction: the hero assembles on load (charcoal block wipes in, numeral rises, the work is unveiled from a clip-path inset, the headline rises out of its line); in the collection, hovering/focusing a work lifts it 8px off the wall, its numeral turns from deep rose to ink, and the store shortcut slides up from under the label in reserved space. Scroll reveals rise works 40px into place without fading; a work becomes its ficha through a view-transition morph. Transform, opacity and clip-path only; disabled under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
