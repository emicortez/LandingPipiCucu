# Landing redesign — Pipí Cucú

Redesign the existing Astro site in the "Herbario de láminas" visual world chosen through Impeccable, then serve it on localhost for review.
Product truth: `PRODUCT.md`. Direction contract: `.impeccable/surfaces/src-pages-index-astro.md`.

## Specs

- S1: "quiero instalar las skills de impecable y todas las de diseño profesional crear la landing para este proyecto"
- S2: Approach chosen by the user: "Rehacer la existente" ("rehace") — redesign the current Astro code, keeping Astro + Sanity, routes and data shape.
- S3: Identity to keep: "Paleta y tipografías" — #EECDD3, #28242A, #F8F5F1, #B56F82; Playfair Display + DM Sans.
- S4: Orders: "todo los pedidos por la tienda" — every commercial and custom-order CTA goes to Empretienda (work URL or general store).
- S5: Visual world chosen: "Herbario de láminas" (assigned direction), code-led build.
- S6: "y dsp levantamela en un localhost para verla"
- S7: "crea unas animaciones lindas, con transiciones lindas q llamen la atencion pero no lo hagan tan pesada."
- S8: "tenemos q tener una session admin donde pueda un usuario pueda agregar o sacar pinturas, cual pone el header" — agreed approach: Sanity Studio (existing `studio/`) is the admin; add a "Obra de portada" field to choose the hero artwork.
- S9: "Y q los textos de la landing page pueda ser cambiados." — move the hardcoded landing texts into siteSettings, grouped by section; an empty field falls back to the current text.

## Tasks

- T1 (S2-S5): Rebuild styles, layout, components and pages in the Herbario world; `npm run build` passes. Route: worker. Status: done (build ok, detector 0, first-viewport ok at 1440/390/360). Commit: pending (not requested).
- T2 (S6): Run the dev server and hand the URL to the user. Route: parent. Status: done (http://localhost:4321/). Commit: n/a.
- T3 (S7): Add attention-grabbing but lightweight animations and page transitions in the Herbario world (CSS-first, no new dependencies, reduced-motion safe). Route: worker. Status: done (build ok, detector 0, first-viewport ok at 1440/390/360). Commit: pending (not requested).
- T4 (S8-S9): Sanity siteSettings: hero artwork reference + grouped editable landing texts with fallbacks; frontend reads them. Route: worker. Status: done (build ok, home HTML identical, merge check ok, studio tsc + sanity build ok; schema validate needs a real projectId). Commit: pending (not requested).

## Log

- L1: "quiero instalar las skills de impecable y todas las de diseño profesional crear la landing para este proyecto"
- L2: Impeccable installed project-scoped into `.pi/skills/impeccable`; PRODUCT.md written from the user's answers.
- L3: "rehace" / "y dsp levantamela en un localhost para verla"
- L4: Direction round answer: assigned (Herbario de láminas), buildPath code.
- L6: User approved Sanity Studio as admin (free plan) and: "bien me parece perfecto. Arranca con el 1 y el 2" (1 = hero artwork field, 2 = editable landing texts).
- L5: "crea unas animaciones lindas, con transiciones lindas q llamen la atencion pero no lo hagan tan pesada."
