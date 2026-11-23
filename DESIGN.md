---
name: Pipí Cucú
description: Workshop-table atelier for hand-painted decorative works by a mother and daughter.
colors:
  rose-table: "#f3dcdf"
  rose-deep: "#ebc4cc"
  rose-paper: "#fbf6f3"
  rose-tape: "#e2b4bf"
  rose-display: "#b66c82"
  rose-ink: "#8c4660"
  charcoal: "#252326"
  charcoal-soft: "#3a363a"
  plum: "#6b4753"
  ivory: "#f8f4f1"
  stone-light: "#c2b8bb"
typography:
  hero:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.1rem, 1.4rem + 2.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.4rem + 4.9vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.4rem, 1.5rem + 3.8vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.45rem, 1.2rem + 1.1vw, 2.2rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  art-title:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.18rem, 1.08rem + 0.45vw, 1.45rem)"
    fontWeight: 500
    lineHeight: 1.2
  lede:
    fontFamily: "Jost Variable, Jost, Futura, system-ui, sans-serif"
    fontSize: "clamp(1.18rem, 1.08rem + 0.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Jost Variable, Jost, Futura, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost Variable, Jost, Futura, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  hand:
    fontFamily: "Reenie Beanie, Segoe Print, cursive"
    fontSize: "clamp(1.6rem, 1.3rem + 1vw, 2.2rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  chip-swatch: "2px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 4rem)"
  section: "clamp(4.5rem, 3rem + 7vw, 10rem)"
  print-border: "clamp(0.4rem, 0.9vw, 0.75rem)"
  card: "clamp(1.5rem, 3vw, 2.5rem)"
  max: "90rem"
  header: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.rose-ink}"
    textColor: "{colors.ivory}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.5rem"
    height: "3rem"
  button-line-hover:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
  button-on-ink:
    backgroundColor: "{colors.rose-table}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.5rem"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.1rem"
    height: "2.75rem"
  chip-filter-selected:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
  field:
    backgroundColor: "{colors.rose-paper}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "3rem"
  print:
    backgroundColor: "{colors.rose-paper}"
    rounded: "{rounded.none}"
    padding: "{spacing.print-border}"
  paper-card:
    backgroundColor: "{colors.rose-paper}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  closing-band:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory}"
---

# Design System: Pipí Cucú

## Overview

**Creative North Star: "The Workshop Table"**

The site is the table in Deby and Agos's workshop. Powder rose, the logo's own field, is the surface on every page, carrying a faint fractal-noise paper tooth so it reads as a material rather than a flat fill. Real photographs of the works lie on it as prints: an off-white paper border, a soft rose-tinted shadow, a strip of translucent washi tape, and a slight hand-laid tilt that straightens when touched. Text that needs a surface sits on paper cards; a pencil hand annotates sparingly. One charcoal band closes each page.

The mood is warm, artisanal and affectionate, but composed: a Didone display face (Bodoni Moda, echoing the PC. monogram) set large against a geometric sans (Jost) keeps the collage from tipping into scrapbook. Density is generous; prints overlap each other but never the text. Works are always shown whole, never cropped, whatever their shape (round, portrait, landscape).

The confirmed rejection is the category default: a cream page with a serif headline beside one product photo and a row of equal cards.

**Key Characteristics:**
- Drenched powder-rose table on every page; deeper rose marks second surfaces.
- Works presented as taped, tilted paper prints (tilt within ±3°).
- Paper cards for text that needs a surface; rotated slightly, like notes laid by hand.
- At most one handwritten annotation with a drawn arrow per screen, always decorative.
- One charcoal band (footer, or a dark section) closes the page.
- Each work's page shows its own paint chips sampled from its photograph.

## Colors

A monochrome rose family with charcoal ink: the palette is the logo's field taken to every surface, warmed by plum and grounded by near-black.

### Primary
- **Powder Rose Table** (rose-table): the page background everywhere, the header background, and the primary button colour on dark bands. It is the logo's own field, so the brand is the surface, not an accent.
- **Deep Rose Ink** (rose-ink): links in prose, focus outlines, button hover, hand-lettered notes and drawn arrows, step numerals. 5.10:1 on the table and 6.20:1 on paper; on the deeper rose (4.21:1) use it for large text only.

### Secondary
- **Second-Surface Rose** (rose-deep): full-width `band--deep` sections (custom orders) and the scrollbar track. Plum text holds 5.02:1 here.
- **Dusty Display Rose** (rose-display): large display accents only (3.59:1 on paper; never body or UI text).
- **Washi Rose** (rose-tape): the tape strip (at 78% opacity), text selection, and the focus outline and active menu link on charcoal.

### Neutral
- **Charcoal Ink** (charcoal): all body and heading text (about 12.5:1 on the table), primary buttons, selected chips, the closing band and the mobile menu.
- **Soft Charcoal** (charcoal-soft): reserved secondary ink.
- **Rose Plum** (plum): muted text, ledes, captions, category labels, placeholders, scrollbar thumb. 6.08:1 on the table, 7.38:1 on paper.
- **Paper White** (rose-paper): print borders, paper cards, notices, fields, paint-chip strips.
- **Ivory** (ivory): text and buttons on the charcoal band.
- **Light Stone** (stone-light): muted text on the charcoal band.
- Lines are plum at 22% alpha (`--line`) and charcoal at 38% alpha (`--line-strong`); hairlines on charcoal are ivory at 16%.

### Named Rules
**The Table Is Rose Rule.** Every page sits on rose-table. Never introduce a white or cream page background; white exists only as paper lying on the table.

**The One Dark Band Rule.** Charcoal fills at most one closing band per page (plus the menu overlay). It is the full stop, not a section rhythm.

**The Large-Only Rose Rule.** rose-display never carries text below large-display size; rose-ink drops to large-text-only on rose-deep.

## Typography

**Display Font:** Bodoni Moda Variable (with Bodoni 72, Didot, Georgia)
**Body Font:** Jost Variable (with Jost, Futura, system-ui)
**Hand Font:** Reenie Beanie (with Segoe Print, cursive)

**Character:** A high-contrast Didone at weight 500 with optical sizing does the talking at scale, matching the monogram; Jost keeps reading text calm and geometric. The pencil hand is a third voice used only for annotation.

### Hierarchy
- **Display** (500, clamp 2.6rem–6rem, 0.98, -0.025em): page-level display (nosotras, 404). The home hero headline is set smaller (clamp 2.1rem–4rem) on its paper note, because the prints carry the scale.
- **Headline** (500, clamp 2.4rem–5rem, 1.04): section heads and page H1s (`.t-1`, `.section-head h2`). `--step-3` (clamp 1.9rem–3.4rem) serves intermediate heads and step numerals.
- **Title** (500, clamp 1.45rem–2.2rem, 1.04): card and step headings, prose H2.
- **Art Title** (500, clamp 1.18rem–1.45rem, 1.2): the name under each print, in Bodoni.
- **Lede** (Jost 400, clamp 1.18rem–1.45rem, 1.5): one-paragraph introductions, usually plum.
- **Body** (Jost 400, clamp 1rem–1.125rem, 1.6): reading text; prose max 38rem, measure 34rem.
- **Label** (Jost, 0.875rem): categories, counts, breadcrumbs, footer column heads. Sentence case, never uppercase.
- **Hand** (Reenie Beanie, clamp 1.6rem–2.2rem, 1): annotations only, rotated about -4°.

### Named Rules
**The Hand Annotates Rule.** Handwriting never carries information the page doesn't already state in real text; it is `aria-hidden`, one per screen, paired with a drawn arrow pointing at something.

**The Balanced Head Rule.** Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`; heads are capped in `ch`, not left to run.

## Layout

A single centred container (max 90rem) with a fluid gutter (clamp 1rem–4rem). Sections breathe with a fluid vertical rhythm (clamp 4.5rem–10rem). From 64rem, compositions use a 12-column grid with a 2rem column gap: copy typically spans 6 columns, the collage or paper stack the opposite side. Breakpoints: 40rem, 48rem, 64rem, 90rem.

The home hero is the whole table: from 64rem, prints are absolutely positioned toward the viewport edges (widths 12–18vw, max-height 40svh) around a centred paper note that always stays on top; below 64rem the note comes first and four prints overlap in a fixed-aspect area beneath it. The catalog is a 1 / 2 / 3 column grid, aligned to start, with generous row gaps (clamp 2.5rem–4rem); tall works cap at 70svh so rows stay readable. Prints in a grid take deterministic, uneven tilts from a fixed sequence (-2.2, 1.6, -1, 2.4, -2.8, 0.8, 1.9, -1.6 degrees), never a repeating pattern. Paper steps are offset with small left margins and individual rotations. On phones everything stacks: headline, actions, then the prints in a short overlapping stack.

The header is sticky (4.5rem) on the table colour, gaining a hairline and soft shadow once scrolled.

## Elevation & Depth

Depth is physical: objects lying on a table. Prints, paper cards and chip strips cast a soft, rose-tinted, two-layer shadow (a tight contact shadow plus a long offset falloff). Touch lifts the object: it straightens, rises 6px, scales to 1.015 and its shadow deepens. Everything else (bands, header at rest, buttons) is flat; the surface tooth carries the material.

### Shadow Vocabulary
- **Print** (`box-shadow: 0 1px 2px rgb(74 40 52 / 0.12), 0 14px 28px -12px rgb(92 48 64 / 0.38)`): every print, paper card and paint-chip strip at rest.
- **Lifted** (`box-shadow: 0 2px 4px rgb(74 40 52 / 0.12), 0 26px 44px -16px rgb(92 48 64 / 0.45)`): a print on hover or focus.
- **Header scrolled** (`box-shadow: 0 1px 0 var(--line), 0 10px 24px -20px rgb(92 48 64 / 0.5)`): sticky header after scroll.

### Named Rules
**The Tinted Shadow Rule.** Shadows are rose-brown (rgb 74 40 52 / 92 48 64), never neutral grey or black, and never hard-offset.

**The Lift On Touch Rule.** Only objects on the table lift. Lifting is the hover/focus response; the tape stays put while the print straightens.

## Shapes

Two shape families. Objects on the table (prints, paper cards, notices, chip strips) are square-cornered paper, set at small rotations (within ±3°) and finished with torn-edged washi tape: a translucent rose strip with faint vertical fibres, masked ends, rotated against the print's own tilt, centred on top or diagonal across a corner. Interactive controls (buttons, filter chips, search and sort fields, the menu button, skip link) are full pills (999px). Paint chips are 3:4 swatches with barely softened corners (2px) and a 1px inset hairline. Hand-drawn arrows are loose single strokes with an open arrowhead, round caps and joins, 2.2 stroke width.

## Components

### Buttons
Confident pills, tactile on press.
- **Shape:** full pill (999px), min height 3rem (2.75rem in the nav).
- **Primary:** charcoal fill, ivory text, Jost 500 at 1rem, padding 0.7rem 1.5rem, trailing arrow icon.
- **Hover / Focus:** fill shifts to rose-ink over 180ms; the arrow nudges 3px right (or 2px up-right for external links); press scales to 0.98. Focus is a 2px rose-ink outline at 3px offset.
- **Line:** transparent with a 38% charcoal border; hover fills charcoal with ivory text.
- **On the charcoal band:** primary becomes rose-table with charcoal text (hover ivory); line becomes ivory text with a 40% ivory border.

### Text links
Inline links with a 1px underline drawn as a background that retracts to the right on hover (380ms, ease-out). Nav links reverse this: a hairline grows from the left on hover and stays for the current page.

### Chips (catalog filters)
- **Style:** transparent pill, 38% charcoal border, Jost 500, 2.75rem tall.
- **State:** hover darkens the border to charcoal; selected (`aria-pressed`) fills charcoal with ivory text.

### Inputs / Fields
- **Style:** paper-white pill, 38% charcoal border, 3rem tall, inline search icon, plum placeholder and label.
- **Focus:** border goes charcoal plus a 2px rose-ink outline at 2px offset; caret is rose-ink.

### Navigation
Sticky table-coloured header: logo plus Bodoni wordmark and the Jost descriptor, links in Jost 450 with the growing hairline, and a primary pill. Below 64rem a pill menu button opens a full-height charcoal dialog with Bodoni links at `--step-3`; the current page shows in washi rose.

### Print (signature)
The core object. A paper-white frame (border clamp 0.4rem–0.75rem, 1.6x at the bottom like a photo print), print shadow, washi tape, tilt within ±3°. The work inside is always whole, never cropped. Wrapped in a link it straightens and lifts on hover/focus (520ms, ease-out); focus adds a rose-ink outline at 4px offset. Beneath it, the work's Bodoni title and a plum category label.

### Paper card
Text that needs a surface (definitions, the three ordering steps): paper white, print shadow, square corners, optional tape, padding clamp 1.5rem–2.5rem, each set at its own slight rotation. Steps carry a Bodoni numeral in rose-ink.

### Hand note
Reenie Beanie in rose-ink with a hand-drawn SVG arrow (down-right, down-left, right, left). Decorative and `aria-hidden`; one per screen.

### Paint chips
On each work's page: up to five dominant colours sampled at build time from the centre of the photograph, laid as 3:4 swatches on a paper strip rotated -1° with print shadow, captioned by a hand note ("sus colores").

### Notice
A small paper tag: paper white, 1px plum hairline, label size plum text.

### Motion
One ease (`cubic-bezier(0.22, 1, 0.36, 1)`) with 180ms for state and 380ms for reveals; print lift uses 520ms. The signature load moment lays the hero prints on the table one by one from 64rem (drop from 46px above with extra rotation and 1.08 scale, settling on `expo.out` over 1.05s, staggered 0.16s); the headline is never hidden and is the LCP element. On fine pointers the hero is "la mesa viva": prints can be dragged and thrown (GSAP Draggable + InertiaPlugin, bounded to the hero, lift while held, elastic settle), drift with the cursor by depth, and slide off the table on scroll (ScrollTrigger scrub); a click without movement still opens the work. Collections are paper cards: a category with works fans up to three prints like a hand of cards. Everything is transform, opacity and shadow, and all of it switches off under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set every page on rose-table (#f3dcdf) with the paper-tooth noise; use rose-deep for second surfaces.
- **Do** present works as prints: paper border, rose-tinted shadow, washi tape, tilt within ±3°, the whole work visible.
- **Do** take grid tilts from the fixed uneven sequence so collections look laid by hand.
- **Do** keep handwriting to one annotation per screen, decorative, with its message already in real text.
- **Do** close each page with one charcoal band and switch buttons to their on-ink variants there.
- **Do** keep body text charcoal and secondary text plum; reserve rose-display for large display accents.
- **Do** animate only transform, opacity and shadow, and disable motion under `prefers-reduced-motion`.

### Don't:
- **Don't** use a white or cream page background, or the category default of a serif headline beside one product photo and a row of equal cards.
- **Don't** crop a work to fit a frame, or rotate a print beyond ±3°.
- **Don't** let prints overlap text.
- **Don't** use grey or black shadows, or hard offset shadows.
- **Don't** set text below large size in rose-display, or rose-ink below large size on rose-deep.
- **Don't** use uppercase labels or eyebrow lines above headings.
- **Don't** hide the hero headline during the entrance animation.
