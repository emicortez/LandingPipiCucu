/**
 * Catalog filters, search and sort. State lives in the URL (?categoria=&q=&orden=) so a
 * filtered view can be shared and the back button works. Layout changes animate with
 * GSAP Flip (a response to the visitor's own action); reduced motion skips it.
 */
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { track } from './analytics';

gsap.registerPlugin(Flip);

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('es').trim();

export function initCatalog(): void {
  const root = document.querySelector<HTMLElement>('[data-catalog]');
  if (!root) return;
  const tools = root.querySelector<HTMLElement>('[data-tools]');
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const items = [...root.querySelectorAll<HTMLElement>('[data-item]')];
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const search = root.querySelector<HTMLInputElement>('[data-search]');
  const sort = root.querySelector<HTMLSelectElement>('[data-sort]');
  const status = root.querySelector<HTMLElement>('[data-status]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (tools) tools.hidden = false;

  const params = new URLSearchParams(location.search);
  const valid = new Set(chips.map((c) => c.dataset.filter ?? ''));
  const state = {
    category: valid.has(params.get('categoria') ?? '') ? params.get('categoria')! : root.dataset.initialCategory ?? '',
    query: params.get('q') ?? '',
    order: ['taller', 'az', 'za'].includes(params.get('orden') ?? '') ? params.get('orden')! : 'taller',
  };
  if (search) search.value = state.query;
  if (sort) sort.value = state.order;

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.category && state.category !== root!.dataset.initialCategory) p.set('categoria', state.category);
    if (state.query) p.set('q', state.query);
    if (state.order !== 'taller') p.set('orden', state.order);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  function render(animate: boolean) {
    const flipState = animate && !reduce.matches ? Flip.getState(items) : null;
    const q = normalize(state.query);
    let visible = 0;
    for (const item of items) {
      const show = (!state.category || item.dataset.category === state.category) && (!q || (item.dataset.name ?? '').includes(q));
      item.hidden = !show;
      if (show) visible++;
    }
    const sorted = [...items].sort((a, b) => {
      if (state.order === 'taller') return Number(a.dataset.order) - Number(b.dataset.order);
      const cmp = (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '', 'es');
      return state.order === 'az' ? cmp : -cmp;
    });
    sorted.forEach((item) => grid.appendChild(item));
    chips.forEach((c) => c.setAttribute('aria-pressed', String((c.dataset.filter ?? '') === state.category)));
    if (status) status.textContent = visible === 0 ? 'Ninguna obra coincide con la búsqueda' : `${visible} ${visible === 1 ? 'obra' : 'obras'}`;
    if (empty) empty.hidden = visible !== 0;
    if (flipState) {
      Flip.from(flipState, {
        duration: 0.55,
        ease: 'power3.inOut',
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
      });
    }
  }

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      state.category = chip.dataset.filter ?? '';
      track('catalog_filter', { label: state.category || 'todas' });
      render(true);
      syncUrl();
    }),
  );
  let searchTimer: number | undefined;
  search?.addEventListener('input', () => {
    state.query = search.value;
    render(false);
    window.clearTimeout(searchTimer);
    // One event per search, without sending what was typed.
    searchTimer = window.setTimeout(() => { if (state.query) track('catalog_search'); syncUrl(); }, 600);
  });
  sort?.addEventListener('change', () => {
    state.order = sort.value;
    track('catalog_sort', { label: state.order });
    render(true);
    syncUrl();
  });
  root.querySelector('[data-reset]')?.addEventListener('click', () => {
    state.category = root.dataset.initialCategory ?? '';
    state.query = '';
    if (search) search.value = '';
    render(true);
    syncUrl();
    search?.focus();
  });

  render(false);
}
