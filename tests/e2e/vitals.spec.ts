import { test } from '@playwright/test';

/**
 * Lab Web Vitals against the local preview, throttled (4x CPU, ~1.6 Mbps / 150 ms RTT).
 * Indicative only: real-user numbers must come from production (see QA_REPORT.md).
 * Run: npx playwright test vitals
 */
for (const path of ['/', '/productos/', '/productos/mariposa-azul/']) {
  test(`vitals ${path}`, async ({ page }, info) => {
    void info; // measured on both profiles (desktop 1440 and Pixel 7)
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      (window as any).__v = { lcp: 0, cls: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) (window as any).__v.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries() as any[]) if (!e.hadRecentInput) (window as any).__v.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(path, { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    const v = await page.evaluate(() => (window as any).__v);
    const bytes = await page.evaluate(() => performance.getEntriesByType('resource').reduce((s, r: any) => s + (r.transferSize || 0), 0) + ((performance.getEntriesByType('navigation')[0] as any)?.transferSize || 0));
    console.log(`VITALS ${path} LCP=${Math.round(v.lcp)}ms CLS=${v.cls.toFixed(3)} transfer=${Math.round(bytes / 1024)}KB`);
  });
}
