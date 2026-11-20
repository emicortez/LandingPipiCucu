/**
 * Signature moment: the hero work is "raised" into view the way the owners photograph their
 * paintings — lifted up against the sky — while the headline rises line by line.
 * Runs once on load. Content is visible by default; html.motion-pending (set in the head,
 * removed after 2.5 s at the latest) is the only thing that hides it.
 */
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function playHeroEntrance(): Promise<void> {
  const root = document.documentElement;
  const title = document.querySelector<HTMLElement>('[data-hero-line]');
  const art = document.querySelector<HTMLElement>('[data-hero-art]');
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !title) {
    root.classList.remove('motion-pending');
    return;
  }
  // Line breaks depend on the display face: wait for it, but never longer than 700 ms.
  await Promise.race([document.fonts?.ready, wait(700)]);
  // The safety timeout already revealed everything: don't hide it again to replay.
  if (!root.classList.contains('motion-pending')) return;

  const split = SplitText.create(title, { type: 'lines', mask: 'lines' });
  const img = art?.querySelector('img');
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      split.revert();
      gsap.set([art, img, ...fades].filter(Boolean), { clearProps: 'all' });
    },
  });

  tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0);
  if (art) tl.fromTo(art, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.inOut' }, 0.05);
  if (img) tl.fromTo(img, { scale: 1.12, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6 }, 0.1);
  if (fades.length) tl.fromTo(fades, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.6);

  // The timeline has rendered its first frame; the CSS guard can go.
  root.classList.remove('motion-pending');
}
