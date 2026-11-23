/**
 * Signature moment: on load the prints are laid on the table one by one — dropped from a
 * little height with extra rotation, settling with an exponential ease — then the actions
 * appear. Prints animate only from 64rem, where the headline is the LCP element; the
 * headline is never hidden. Content is visible by default; html.motion-pending (set in the
 * head, removed after 2.5 s at the latest) is the only thing that hides the animated parts.
 */
import { gsap } from 'gsap';

export function layTheTable(): void {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion, or the safety timeout already revealed everything: never replay.
  if (reduce || !root.classList.contains('motion-pending')) {
    root.classList.remove('motion-pending');
    return;
  }

  const wide = matchMedia('(min-width: 64rem)').matches;
  const prints = wide ? gsap.utils.toArray<HTMLElement>('[data-lay]') : [];
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // GSAP reads each print's CSS tilt from its transform, adds a little extra rotation and
  // height, and hands the transform back to CSS (clearProps) once the print has settled.
  prints.forEach((print, i) => {
    const extra = i % 2 === 0 ? -7 : 6;
    tl.fromTo(
      print,
      { autoAlpha: 0, y: -46, scale: 1.08, rotation: `+=${extra}` },
      { autoAlpha: 1, y: 0, scale: 1, rotation: `-=${extra}`, duration: 1.05, clearProps: 'transform,opacity,visibility' },
      0.08 + i * 0.16,
    );
  });
  if (fades.length) tl.fromTo(fades, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: 'all' }, 0.15);

  // The timeline has rendered its first frame; the CSS guard can go.
  root.classList.remove('motion-pending');
}
