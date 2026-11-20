/**
 * Signature moment: the hero work is "raised" into view the way the owners photograph their
 * paintings — lifted up against the sky — and the actions settle after it. The headline is the
 * LCP element, so it is never hidden or delayed: it paints with the first frame.
 * Runs once on load. Content is visible by default; html.motion-pending (set in the head,
 * removed after 2.5 s at the latest) is the only thing that hides the animated parts.
 */
import { gsap } from 'gsap';

export function playHeroEntrance(): void {
  const root = document.documentElement;
  // On narrow screens the photo is the LCP element, so it is shown at once there.
  const art = matchMedia('(min-width: 64rem)').matches ? document.querySelector<HTMLElement>('[data-hero-art]') : null;
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion, or the safety timeout already revealed everything: never replay.
  if (reduce || !root.classList.contains('motion-pending')) {
    root.classList.remove('motion-pending');
    return;
  }

  const img = art?.querySelector('img');
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => gsap.set([art, img, ...fades].filter(Boolean), { clearProps: 'all' }),
  });
  if (art) tl.fromTo(art, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0);
  if (img) tl.fromTo(img, { scale: 1.14, yPercent: 10 }, { scale: 1, yPercent: 0, duration: 1.7 }, 0.05);
  if (fades.length) tl.fromTo(fades, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.35);

  // The timeline has rendered its first frame; the CSS guard can go.
  root.classList.remove('motion-pending');
}
