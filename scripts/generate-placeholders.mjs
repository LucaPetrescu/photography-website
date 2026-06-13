/**
 * Generate committed placeholder images so every page renders in dev and
 * `next/image` static imports resolve (they require real raster files with
 * intrinsic dimensions). Filenames are stable so the photographer can swap
 * each file for a real photo later without touching any code.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => join(root, "public", "images", p);

// A calm neutral palette so placeholders read as "photo missing", not as design.
const palette = [
  { bg: "#3a3733", fg: "#6b655d" },
  { bg: "#2f3a3f", fg: "#566a70" },
  { bg: "#3b3340", fg: "#6a5d72" },
  { bg: "#33403a", fg: "#5c7066" },
  { bg: "#403a33", fg: "#73685d" },
  { bg: "#2e333d", fg: "#566070" },
];

function svg(width, height, label, idx) {
  const { bg, fg } = palette[idx % palette.length];
  const fontSize = Math.round(Math.min(width, height) * 0.06);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${fg}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <text x="50%" y="50%" fill="rgba(255,255,255,0.55)" font-family="monospace"
    font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`);
}

async function write(path, width, height, label, idx) {
  await mkdir(dirname(out(path)), { recursive: true });
  await sharp(svg(width, height, label, idx))
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(out(path));
  console.log("wrote", path, `${width}x${height}`);
}

const jobs = [
  // Hero — wide landscape (LCP)
  ["hero/hero.jpg", 2400, 1500, "HERO", 0],
  // About portrait — 4:5
  ["about/portrait.jpg", 1200, 1500, "PORTRAIT", 2],
  // Gallery — uniform 4:5 portrait
  ["gallery/ridgeline.jpg", 1200, 1500, "RIDGELINE", 0],
  ["gallery/tideline.jpg", 1200, 1500, "TIDELINE", 1],
  ["gallery/fog-field.jpg", 1200, 1500, "FOG FIELD", 5],
  ["gallery/harbor-portrait.jpg", 1200, 1500, "HARBOR", 2],
  ["gallery/snowline.jpg", 1200, 1500, "SNOWLINE", 3],
  ["gallery/last-ferry.jpg", 1200, 1500, "LAST FERRY", 1],
  ["gallery/driftwood.jpg", 1200, 1500, "DRIFTWOOD", 4],
  ["gallery/quiet-trail.jpg", 1200, 1500, "QUIET TRAIL", 3],
  ["gallery/river-bend.jpg", 1200, 1500, "RIVER BEND", 1],
  ["gallery/window-light.jpg", 1200, 1500, "WINDOW LIGHT", 2],
  ["gallery/alpine-lake.jpg", 1200, 1500, "ALPINE LAKE", 3],
  ["gallery/dune-grass.jpg", 1200, 1500, "DUNE GRASS", 4],
  // Gear — product-ish 3:2
  ["gear/nikon-d750.jpg", 1200, 800, "NIKON D750", 0],
  ["gear/tamron-24-70.jpg", 1200, 800, "24-70 f/2.8", 1],
  ["gear/tamron-70-200.jpg", 1200, 800, "70-200 f/2.8", 2],
  ["gear/nikkor-50mm.jpg", 1200, 800, "50mm f/1.8G", 3],
  // OG image source (also have a dynamic opengraph-image route)
  ["og/og-default.jpg", 1200, 630, "LUCA PETRESCU", 0],
];

for (const [path, w, h, label, idx] of jobs) {
  await write(path, w, h, label, idx);
}
console.log("done");
