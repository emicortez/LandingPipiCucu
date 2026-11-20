// Dev helper: downsizes screenshots for review. node scripts/shrink.cjs <in.png> <out.png> [width] [cropHeight]
const sharp = require('sharp');
const [, , input, output, w = '800', h] = process.argv;
(async () => {
  let img = sharp(input);
  const meta = await img.metadata();
  if (h) img = img.extract({ left: 0, top: 0, width: meta.width, height: Math.min(meta.height, Number(h)) });
  await img.resize({ width: Number(w) }).png().toFile(output);
  console.log(meta.width, meta.height);
})();
