import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = ['/', '/productos/', '/productos/mariposa-azul/', '/categorias/cuadros/', '/categorias/navidad/', '/nosotras/', '/personalizados/', '/novedades/', '/contacto/'];
const STORE_HOST = 'pipicucupc.empretienda.com.ar';

function trackConsole(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

test.describe('routes and SEO', () => {
  for (const path of ROUTES) {
    test(`${path} renders with unique metadata and no console errors`, async ({ page }) => {
      const errors = trackConsole(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Pipí Cucú/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toMatch(new RegExp(`${path.replace(/\//g, '\\/')}$`));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https?:\/\//);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR');
      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
    });
  }

  test('titles are unique across pages', async ({ page }) => {
    const titles = new Set<string>();
    for (const path of ROUTES) {
      await page.goto(path);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(ROUTES.length);
  });

  test('JSON-LD is valid JSON and never claims a Product, price or rating', async ({ page }) => {
    for (const path of ['/', '/productos/mariposa-azul/']) {
      await page.goto(path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.length).toBeGreaterThan(0);
      for (const b of blocks) {
        const data = JSON.parse(b);
        expect(data['@type']).not.toBe('Product');
        expect(b).not.toMatch(/"price"|aggregateRating|"review"/);
      }
    }
  });

  test('robots.txt and sitemap list only real pages', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('/productos/mariposa-azul/');
    expect(sitemap).not.toContain('/categorias/navidad/'); // empty category is noindex
    expect(sitemap).not.toContain('/novedades/'); // no news yet
  });

  test('empty category is noindex and points to the store category', async ({ page }) => {
    await page.goto('/categorias/navidad/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('link', { name: /Ver en la tienda/ })).toHaveAttribute('href', `https://${STORE_HOST}/navidad`);
  });

  test('unknown URLs get the custom 404', async ({ page }) => {
    const res = await page.goto('/no-existe/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página no está en el taller');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('links', () => {
  test('every external link is https, opens safely and store links stay on Empretienda', async ({ page }) => {
    for (const path of ROUTES) {
      await page.goto(path);
      const links = await page.locator('a[href^="http"]').evaluateAll((as) => as.map((a) => ({ href: a.getAttribute('href')!, rel: a.getAttribute('rel') ?? '', target: a.getAttribute('target') ?? '', track: a.getAttribute('data-track') ?? '' })));
      for (const l of links) {
        expect(l.href, path).toMatch(/^https:\/\//);
        expect(l.target, l.href).toBe('_blank');
        expect(l.rel, l.href).toContain('noopener');
        if (l.track === 'store_click') expect(new URL(l.href).hostname).toBe(STORE_HOST);
      }
      expect(await page.locator('a[href="#"], a:not([href])').count(), path).toBe(0);
    }
  });

  test('internal links resolve', async ({ page, request }) => {
    const seen = new Set<string>();
    for (const path of ROUTES) {
      await page.goto(path);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
      hrefs.forEach((h) => seen.add(h.split('#')[0].split('?')[0]));
    }
    for (const href of seen) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('artwork page sends to the store category when there is no product URL, and says so', async ({ page }) => {
    await page.goto('/productos/mariposa-azul/');
    const cta = page.getByRole('link', { name: /en la tienda/ }).first();
    await expect(cta).toHaveAttribute('href', `https://${STORE_HOST}/cuadros`);
    await expect(page.getByText('todavía no tiene su página propia en la tienda')).toBeVisible();
    await expect(page.getByText(/\$\s?\d/)).toHaveCount(0); // no prices
  });
});

test.describe('catalog', () => {
  test('search narrows results, announces the count and shows an empty state', async ({ page }) => {
    await page.goto('/productos/');
    const items = page.locator('[data-item]:visible');
    await expect(items).toHaveCount(5);
    await page.getByPlaceholder('Buscar por nombre').fill('luna');
    await expect(items).toHaveCount(1);
    await expect(page.locator('[data-status]')).toHaveText('1 obra');
    await page.getByPlaceholder('Buscar por nombre').fill('zzzz');
    await expect(page.getByRole('heading', { name: 'No encontramos obras con esa búsqueda' })).toBeVisible();
    await page.getByRole('button', { name: 'Ver todas las obras' }).click();
    await expect(items).toHaveCount(5);
  });

  test('search ignores accents and sort reorders', async ({ page }) => {
    await page.goto('/productos/?q=MARIPOSA');
    await expect(page.locator('[data-item]:visible')).toHaveCount(1);
    await page.goto('/productos/?orden=az');
    const first = page.locator('[data-item]:visible .art-title').first();
    await expect(first).toHaveText('Cuatro ramos');
  });

  test('without JavaScript every work is listed and the tools stay hidden', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/productos/');
    await expect(page.locator('[data-item]')).toHaveCount(5);
    await expect(page.locator('[data-tools]')).toBeHidden();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await context.close();
  });
});

test.describe('navigation and accessibility', () => {
  test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Saltar al contenido' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('mobile menu opens as a dialog, traps focus and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const open = page.getByRole('button', { name: 'Menú' });
    await open.click();
    const dialog = page.getByRole('dialog', { name: 'Menú' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: 'Catálogo' }).click();
    await expect(page).toHaveURL(/\/productos\/$/);
    await page.getByRole('button', { name: 'Menú' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Menú' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Menú' })).toBeFocused();
  });

  test('artwork zoom dialog opens and closes', async ({ page }) => {
    await page.goto('/productos/fases-de-la-luna/');
    await page.getByRole('button', { name: /en grande/ }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  for (const path of ROUTES) {
    test(`axe: no serious or critical violations on ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }

  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ROUTES) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, path).toBeLessThanOrEqual(0);
      }
    });
  }

  test('reduced motion: hero content is visible immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/motion-pending/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('with motion the hero settles and nothing stays hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/motion-pending/, { timeout: 3000 });
    await page.waitForTimeout(2200);
    const hidden = await page.locator('[data-hero-fade], [data-hero-art]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1' || getComputedStyle(e).visibility === 'hidden').length);
    expect(hidden).toBe(0);
  });
});
