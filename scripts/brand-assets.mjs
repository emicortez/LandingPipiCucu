// Derives transparent logo variants, favicons and the default share image from the
// ORIGINAL raster logo (public/images/logo-original.webp). Letterforms are extracted,
// never redrawn. Replace with vector files when the owners provide them.
// Usage: node scripts/brand-assets.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'public/images/logo-original.webp';
const CROP = { left: 140, top: 180, width: 390, height: 370 };
const INK = [37, 35, 38];
const IVORY = [248, 244, 241];

const { data, info } = await sharp(SRC).extract(CROP).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const lum = new Float32Array(w * h);
for (let i = 0; i < w * h; i++) lum[i] = 0.2126 * data[i * 3] + 0.7152 * data[i * 3 + 1] + 0.0722 * data[i * 3 + 2];

// Connected components of solid ink: the letters are large solid shapes, the
// hand-drawn flowers and butterfly are thin grey lines that never pass this test.
const solid = (i) => lum[i] < 110;
const label = new Int32Array(w * h).fill(-1);
const keep = new Set();
let next = 0;
for (let s = 0; s < w * h; s++) {
  if (!solid(s) || label[s] !== -1) continue;
  const stack = [s];
  label[s] = next;
  let area = 0, minX = w, minY = h, maxX = 0, maxY = 0;
  while (stack.length) {
    const p = stack.pop();
    area++;
    const x = p % w, y = (p / w) | 0;
    minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    for (const q of [p - 1, p + 1, p - w, p + w]) {
      if (q < 0 || q >= w * h || label[q] !== -1 || !solid(q)) continue;
      if (Math.abs((q % w) - x) > 1) continue;
      label[q] = next;
      stack.push(q);
    }
  }
  const bw = maxX - minX + 1, bh = maxY - minY + 1;
  const fill = area / (bw * bh);
  // Big letter shapes and the dot.
  if (area > 1500 || (fill > 0.55 && area > 400)) keep.add(next);
  next++;
}

// Grow the kept mask by 2px so anti-aliased edges survive, then alpha from darkness.
const keepMask = new Uint8Array(w * h);
for (let i = 0; i < w * h; i++) if (label[i] >= 0 && keep.has(label[i])) keepMask[i] = 1;
const grown = new Uint8Array(w * h);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  let on = 0;
  for (let dy = -2; dy <= 2 && !on; dy++) for (let dx = -2; dx <= 2 && !on; dx++) {
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && yy >= 0 && xx < w && yy < h && keepMask[yy * w + xx]) on = 1;
  }
  // The tulip drawing touches the P's top-left serif: drop its grey strokes there.
  if (x < 30 && y < 140 && lum[y * w + x] > 60) on = 0;
  if (x < 18 && y > 30 && y < 220) on = 0;
  // Thin "PIPÍ CUCÚ" caps under the P are kept pixel by pixel, not by component.
  if (x >= 15 && x <= 100 && y >= 250 && y <= 315 && lum[y * w + x] < 215) on = 1;
  grown[y * w + x] = on;
}
const BG = 0.2126 * 243 + 0.7152 * 220 + 0.0722 * 223;
function render(rgb) {
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const a = grown[i] ? Math.max(0, Math.min(1, (BG - lum[i]) / (BG - 45))) : 0;
    out[i * 4] = rgb[0]; out[i * 4 + 1] = rgb[1]; out[i * 4 + 2] = rgb[2]; out[i * 4 + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 });
}

await mkdir('src/assets/brand', { recursive: true });
await render(INK).png().toFile('src/assets/brand/monogram-ink.png');
await render(IVORY).png().toFile('src/assets/brand/monogram-ivory.png');

const mono = await render(INK).png().toBuffer();
const tile = async (size, pad) => {
  const inner = await sharp(mono).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#F3DCDF' } }).composite([{ input: inner, gravity: 'center' }]).png();
};
await (await tile(32, 3)).toFile('public/favicon-32.png');
await (await tile(180, 22)).toFile('public/apple-touch-icon.png');
await (await tile(512, 64)).toFile('public/icon-512.png');

// Default share image: the original logo, untouched, on its own background colour.
const logo = await sharp(SRC).resize({ height: 560 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F3DCDF' } })
  .composite([{ input: logo, gravity: 'center' }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-default.jpg');
console.log('brand assets written');
