/**
 * Writes out/sitemap.xml from the exported HTML pages. Runs after `next build`.
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { site } from "../src/data/site";

const outDir = join(process.cwd(), "out");
const excluded = new Set(["404.html", "404/index.html", "_not-found.html"]);

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "_next" ? [] : htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });

const toPath = (file: string) => {
  const rel = relative(outDir, file).split(sep).join("/");
  const route = rel.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
  return route ? `/${route}` : "/";
};

const today = new Date().toISOString().slice(0, 10);
const urls = htmlFiles(outDir)
  .filter((file) => !excluded.has(relative(outDir, file).split(sep).join("/")))
  .map(toPath)
  .sort()
  .map(
    (path) =>
      `  <url>\n    <loc>${site.meta.url}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  );

writeFileSync(
  join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

console.log(`sitemap.xml written with ${urls.length} URL(s)`);
