/**
 * Collections index: a preview of the category floats beside the pointer while hovering
 * a row. Pointer-driven only (fine pointers, motion allowed); keyboard and touch users get
 * the same information from the row itself, so nothing depends on this.
 */
import { gsap } from 'gsap';

export function initCollectionsPreview(): void {
  const section = document.querySelector<HTMLElement>('[data-collections]');
  const preview = section?.querySelector<HTMLElement>('[data-preview]');
  if (!section || !preview) return;
  const canHover = matchMedia('(min-width: 64rem) and (hover: hover) and (pointer: fine)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (!canHover.matches || reduce.matches) return;

  const images = preview.querySelectorAll<HTMLElement>('[data-preview-img]');
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });

  const show = (index: string | undefined) => {
    images.forEach((img) => img.classList.toggle('is-active', img.dataset.previewImg === index));
    gsap.to(preview, { autoAlpha: index === undefined ? 0 : 1, scale: index === undefined ? 0.92 : 1, duration: 0.35, ease: 'power2.out' });
  };

  section.addEventListener('pointermove', (e) => {
    const box = section.getBoundingClientRect();
    xTo(e.clientX - box.left + 24);
    const active = preview.querySelector<HTMLElement>('.is-active');
    yTo(e.clientY - box.top - (active?.offsetHeight ?? 0) / 2);
  });
  section.querySelectorAll<HTMLElement>('.cat-row').forEach((row) => {
    row.addEventListener('pointerenter', () => show(row.dataset.previewIndex));
    row.addEventListener('pointerleave', () => show(undefined));
  });
}
