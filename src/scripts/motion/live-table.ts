/**
 * "La mesa viva" — the hero's signature moment. Three layers per print, so no two effects
 * fight over the same transform:
 *   .slot   → depth: follows the cursor (parallax) and slides off the table on scroll
 *   a.drag  → the visitor's hand: Draggable + inertia (throw it, it glides and stops)
 *   .print  → the photo itself: its tilt, the drop-in entrance, the lift while held
 * Content is visible by default. html.motion-pending (set in the head, removed after 2.5 s
 * at the latest) is the only thing that hides prints, and only from 64rem, where the
 * headline on the paper note — never hidden — is the LCP element.
 */
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

export function initLiveTable(): void {
  const root = document.documentElement;
  const table = document.querySelector<HTMLElement>('[data-live-table]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!table || reduce) {
    root.classList.remove('motion-pending');
    return;
  }

  const wide = matchMedia('(min-width: 64rem)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const slots = gsap.utils.toArray<HTMLElement>('[data-slot]', table).filter((s) => s.offsetParent !== null);
  const prints = slots.map((s) => s.querySelector<HTMLElement>('[data-lay]')!);
  const tiltOf = (print: HTMLElement) => Number(print.dataset.tilt) || 0;

  // 1. Entrance: the prints are laid on the table one by one (desktop only).
  const pending = root.classList.contains('motion-pending');
  if (wide && pending) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    prints.forEach((print, i) => {
      const extra = i % 2 === 0 ? -9 : 8;
      tl.fromTo(
        print,
        { autoAlpha: 0, y: -60, scale: 1.12, rotation: tiltOf(print) + extra },
        { autoAlpha: 1, y: 0, scale: 1, rotation: tiltOf(print), duration: 1.1, clearProps: 'transform,opacity,visibility' },
        0.1 + i * 0.12,
      );
    });
    const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]', table);
    tl.fromTo(fades, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: 'all' }, 0.2);
  }
  root.classList.remove('motion-pending');
  if (!wide) return;

  // 2. Depth: prints drift with the cursor, the deeper ones more.
  if (finePointer) {
    const movers = slots.map((slot) => ({
      depth: Number(slot.dataset.depth) || 1,
      x: gsap.quickTo(slot, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(slot, 'y', { duration: 0.9, ease: 'power3' }),
    }));
    table.addEventListener('pointermove', (e) => {
      const box = table.getBoundingClientRect();
      const px = (e.clientX - box.left) / box.width - 0.5;
      const py = (e.clientY - box.top) / box.height - 0.5;
      movers.forEach((m) => { m.x(px * 34 * m.depth); m.y(py * 26 * m.depth); });
    });
    table.addEventListener('pointerleave', () => movers.forEach((m) => { m.x(0); m.y(0); }));
  }

  // 3. The visitor's hand: pick a print up, move it, throw it. A plain click still opens it.
  if (finePointer) {
    let topZ = 10;
    slots.forEach((slot, i) => {
      const handle = slot.querySelector<HTMLElement>('[data-drag]')!;
      const print = prints[i];
      Draggable.create(handle, {
        type: 'x,y',
        bounds: table,
        inertia: true,
        edgeResistance: 0.7,
        dragClickables: true,
        zIndexBoost: false,
        onPress() {
          slot.style.zIndex = String(++topZ);
          print.classList.add('is-held');
          gsap.to(print, { scale: 1.06, rotation: 0, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
        },
        onRelease() {
          print.classList.remove('is-held');
          gsap.to(print, { scale: 1, rotation: tiltOf(print) * 0.6, duration: 0.7, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
        },
      });
    });
  }

  // 4. Leaving the table: as the page scrolls on, the prints slide off and turn a little.
  slots.forEach((slot, i) => {
    const depth = Number(slot.dataset.depth) || 1;
    gsap.to(slot, {
      yPercent: -55 * depth,
      rotation: (i % 2 === 0 ? -1 : 1) * 7 * depth,
      ease: 'none',
      scrollTrigger: { trigger: table, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });
}
