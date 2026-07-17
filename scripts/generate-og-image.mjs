import sharp from "sharp";
import { mkdirSync } from "fs";

const W = 1200;
const H = 630;
const photo = "src/assets/photos/crawler-underwater.jpg";
const logo = "public/images/brand/marinestream_logo_white.png";

mkdirSync("public/images", { recursive: true });

const bg = await sharp(photo)
  .resize(W, H, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.82 })
  .toBuffer();

const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#001a2c" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#001a2c" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#001a2c" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

const logoBuf = await sharp(logo)
  .resize(480, null, { fit: "inside", withoutEnlargement: true })
  .png()
  .toBuffer();

const copy = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="64" y="470" width="72" height="5" fill="#d87a33"/>
  <text x="64" y="530" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600">IMO-aligned biofouling inspections and cleans</text>
  <text x="64" y="575" fill="#c8d5de" font-family="Arial, Helvetica, sans-serif" font-size="22">Platform · Capture systems · Marine science</text>
</svg>`);

await sharp(bg)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logoBuf, top: 80, left: 64 },
    { input: copy, top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/images/og-default.jpg");

const meta = await sharp("public/images/og-default.jpg").metadata();
console.log(`Wrote public/images/og-default.jpg (${meta.width}x${meta.height})`);
