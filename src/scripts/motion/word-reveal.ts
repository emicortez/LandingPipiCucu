/**
 * Type-led scroll moment: the words of a statement turn from muted to ink as it crosses
 * the viewport. The text is fully readable in the HTML; words are only wrapped when
 * motion is allowed, and the color change never hides anything.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initWordReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-word-reveal]');
  if (!targets.length) return;
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const splits = [...targets].map((el) => {
      const split = SplitText.create(el, { type: 'words', wordsClass: 'w' });
      gsap.to(split.words, {
        color: '#252326', // --color-ink (GSAP needs a literal colour to interpolate)
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 },
      });
      return split;
    });
    return () => splits.forEach((s) => s.revert());
  });
}
