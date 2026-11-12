/**
 * Regenerates favicons, app icons and the Open Graph image in public/.
 * Requires `rsvg-convert` (brew install librsvg) and macOS `sips`. Run with: bun run icons
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const pub = (file: string) => join(root, "public", file);
const src = (file: string) => join(root, "assets", file);

const render = (input: string, output: string, width: number, height = width) =>
  execFileSync("rsvg-convert", ["-w", String(width), "-h", String(height), input, "-o", output]);

// Browser favicons (rounded tile)
render(pub("favicon.svg"), pub("favicon-16x16.png"), 16);
render(pub("favicon.svg"), pub("favicon-32x32.png"), 32);

// Full-bleed icons: iOS and Android apply their own masks
render(src("icon-full.svg"), pub("apple-touch-icon.png"), 180);
render(src("icon-full.svg"), pub("android-chrome-192x192.png"), 192);
render(src("icon-full.svg"), pub("android-chrome-512x512.png"), 512);
render(src("icon-maskable.svg"), pub("maskable-icon-512x512.png"), 512);

// favicon.ico with PNG-encoded 16/32/48 entries
const tmp = mkdtempSync(join(tmpdir(), "icons-"));
const icoSizes = [16, 32, 48];
const images = icoSizes.map((size) => {
  const file = join(tmp, `${size}.png`);
  render(pub("favicon.svg"), file, size);
  return readFileSync(file);
});
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(icoSizes[i] % 256, entry);
  header.writeUInt8(icoSizes[i] % 256, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync(pub("favicon.ico"), Buffer.concat([header, ...images]));

// Open Graph image (1200x630)
const photo = readFileSync(pub("images/photo-04.jpg")).toString("base64");
const ogSvg = readFileSync(src("og-image.svg"), "utf8").replace("{{PHOTO}}", photo);
const ogFile = join(tmp, "og.svg");
writeFileSync(ogFile, ogSvg);
const ogPng = join(tmp, "og.png");
render(ogFile, ogPng, 1200, 630);
execFileSync(
  "sips",
  ["-s", "format", "jpeg", "-s", "formatOptions", "85", ogPng, "--out", pub("og-image.jpg")],
  {
    stdio: "ignore",
  }
);

console.log("Icons and OG image written to public/");
