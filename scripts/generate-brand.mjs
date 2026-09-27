/**
 * Builds the brand assets from the original logo (public/brand/timetonote-logo-original.png),
 * recolored to the site's teal brand color:
 *   public/brand/logo-mark.png        "TN" monogram, teal, transparent (light backgrounds)
 *   public/brand/logo-mark-dark.png   "TN" monogram, light teal, transparent (dark mode)
 *   public/brand/logo-full.png        full circular logo in teal (transparent)
 *   public/logo.png                   512×512 full logo on white (Organization schema)
 *   public/icon-512.png               512×512 app icon
 *   src/app/icon.png                  favicon
 *   src/app/apple-icon.png            Apple touch icon
 * Run with `npm run brand`.
 */
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = (...p) => path.join(root, ...p);
const SRC = out("public/brand/timetonote-logo-original.png");

const TEAL = [13, 107, 94]; // --brand (#0d6b5e)
const TEAL_LIGHT = [79, 195, 174]; // --brand in dark mode (#4fc3ae)

/** Recolor every non-white pixel to one color, using its darkness as the alpha. */
async function recolor(input, color) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const lightest = Math.min(data[i], data[i + 1], data[i + 2]);
    const alpha = Math.min(255, Math.round(((255 - lightest) / 150) * 255));
    rgba[j] = color[0];
    rgba[j + 1] = color[1];
    rgba[j + 2] = color[2];
    rgba[j + 3] = alpha < 12 ? 0 : alpha;
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

const monogramCrop = await sharp(SRC).extract({ left: 157, top: 150, width: 200, height: 200 }).toBuffer();

const mark = await recolor(monogramCrop, TEAL);
await sharp(mark).resize(256, 256).png().toFile(out("public/brand/logo-mark.png"));
const markDark = await recolor(monogramCrop, TEAL_LIGHT);
await sharp(markDark).resize(256, 256).png().toFile(out("public/brand/logo-mark-dark.png"));
console.log("✓ public/brand/logo-mark.png, logo-mark-dark.png");

const full = await recolor(await sharp(SRC).toBuffer(), TEAL);
await sharp(full).png().toFile(out("public/brand/logo-full.png"));
await sharp(full).flatten({ background: "#ffffff" }).resize(512, 512).png().toFile(out("public/logo.png"));
console.log("✓ public/brand/logo-full.png, public/logo.png");

/** Icon: teal monogram on a white circle with a teal ring. */
async function icon(size, file, { square = false } = {}) {
  const ring = Math.max(2, Math.round(size * 0.05));
  const inset = square ? size * 0.06 : 0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    ${square ? `<rect width="${size}" height="${size}" fill="#ffffff"/>` : ""}
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - ring / 2 - inset}" fill="#ffffff" stroke="#0d6b5e" stroke-width="${ring}"/>
  </svg>`;
  const inner = Math.round(size * (square ? 0.56 : 0.66));
  const m = await sharp(mark).resize(inner, inner).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: m, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }])
    .png()
    .toFile(file);
  console.log(`✓ ${path.relative(root, file)}`);
}
await icon(512, out("src/app/icon.png"));
await icon(180, out("src/app/apple-icon.png"), { square: true });
await icon(512, out("public/icon-512.png"), { square: true });
