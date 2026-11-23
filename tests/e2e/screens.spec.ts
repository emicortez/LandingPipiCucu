import { test } from '@playwright/test';

/**
 * Visual captures for manual review (not pixel assertions): full pages at the brief's
 * viewports, written to test-results/screens/. Run: npm run test:screens
 */
const pages = ['/', '/productos/', '/productos/mariposa-azul/', '/categorias/cuadros/', '/categorias/navidad/', '/nosotras/', '/personalizados/', '/novedades/', '/contacto/', '/no-existe/'];
const widths = [320, 390, 768, 1024, 1440, 1920];

test.describe.configure({ mode: 'parallel' });

for (const path of pages) {
  test(`capture ${path}`, async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'captures run once, at explicit widths');
    test.setTimeout(180_000);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1600); // let the hero entrance finish
      // Scroll through once so lazy images load, then return to the top.
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += 500) { await page.mouse.wheel(0, 500); await page.waitForTimeout(80); }
      await page.evaluate(() => window.scrollTo(0, 0));
      // Every image that is actually rendered (display:none lazy images never load) has finished.
      await page.waitForFunction(() => [...document.images].filter((img) => img.getClientRects().length > 0).every((img) => img.complete), null, { timeout: 15_000 });
      await page.waitForTimeout(300);
      await page.mouse.move(0, 0); // no hover state in the capture
      const name = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
      await page.screenshot({ path: `test-results/screens/${name}-${width}.png`, fullPage: true });
    }
  });
}
