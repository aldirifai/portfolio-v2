#!/usr/bin/env node
// Generate static PNG icons from a single SVG monogram.
// Run via `pnpm icons` after editing the SVG below.

import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#f59e0b"/>
  <text x="256" y="332" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-weight="800" font-size="280" text-anchor="middle" fill="#0a0a0a">AR</text>
</svg>`;

const TARGETS = [
  { size: 32, out: join(ROOT, "src/app/icon.png") },
  { size: 180, out: join(ROOT, "src/app/apple-icon.png") },
  { size: 192, out: join(ROOT, "public/icon-192.png") },
  { size: 512, out: join(ROOT, "public/icon-512.png") },
];

async function main() {
  for (const { size, out } of TARGETS) {
    mkdirSync(dirname(out), { recursive: true });
    await sharp(Buffer.from(SVG))
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ✓ ${out.replace(ROOT, ".")} (${size}x${size})`);
  }
}

main().catch((err) => {
  console.error("[generate-icons] failed:", err);
  process.exit(1);
});
