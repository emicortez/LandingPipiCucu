/**
 * Privacy-respecting event tracking. Elements declare `data-track="<event>"` and optional
 * `data-track-label`. Events go to Plausible when it is loaded (cookieless); otherwise
 * nothing is sent. Never pass personal data or search text in labels.
 */
type Props = Record<string, string>;
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props: Props = {}): void {
  window.plausible?.(event, { props });
}

document.addEventListener('click', (e) => {
  const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
  if (!el) return;
  const props: Props = {};
  if (el.dataset.trackLabel) props.label = el.dataset.trackLabel;
  track(el.dataset.track!, props);
});
