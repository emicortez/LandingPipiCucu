/**
 * Paint chips for a work, sampled at build time from the centre of its photograph (the
 * owners shoot works held against the sky or laid on grass, so the edges are background).
 * Server/build only: uses sharp, never shipped to the browser.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const CROP = 0.5; // central 50% of each side

async function loadBuffer(source: string): Promise<Buffer> {
  if (/^https:\/\//.test(source)) {
    const res = await fetch(`${source}?w=240&auto=format`);
    if (!res.ok) throw new Error(`palette: ${res.status} for ${source}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return readFile(source);
}

const hex = (r: number, g: number, b: number) => `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

/** Up to `max` distinct dominant colours, most frequent first. */
export async function samplePalette(source: string, max = 5): Promise<string[]> {
  const input = sharp(await loadBuffer(source));
  const meta = await input.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) return [];
  const crop = { left: Math.round((w * (1 - CROP)) / 2), top: Math.round((h * (1 - CROP)) / 2), width: Math.round(w * CROP), height: Math.round(h * CROP) };
  const { data } = await input.extract(crop).resize(48, 48, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // Bucket at 4 bits per channel, then average each bucket.
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 3) {
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const bucket = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    bucket.n++; bucket.r += data[i]; bucket.g += data[i + 1]; bucket.b += data[i + 2];
    buckets.set(key, bucket);
  }
  const ranked = [...buckets.values()].sort((a, b) => b.n - a.n).map((c) => [c.r / c.n, c.g / c.n, c.b / c.n] as const);
  const picked: (readonly [number, number, number])[] = [];
  for (const c of ranked) {
    if (picked.every((p) => Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]) > 48)) picked.push(c);
    if (picked.length === max) break;
  }
  return picked.map((c) => hex(...c));
}
