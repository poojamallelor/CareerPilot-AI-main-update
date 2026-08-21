// Copies favicon and PWA icons from repo root into public/ so they are served at runtime
// This lets us use user-provided images without changing their upload location.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pub = path.join(root, 'public');

const files = [
  // Intentionally exclude 'favicon.ico' to prevent regenerating ICO route
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
];

if (!fs.existsSync(pub)) {
  fs.mkdirSync(pub, { recursive: true });
}

let copied = 0;
for (const f of files) {
  const src = path.join(root, f);
  const dest = path.join(pub, f);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      copied++;
    }
  } catch (e) {
    console.warn(`[sync-icons] Skipped ${f}: ${e.message}`);
  }
}

console.log(`[sync-icons] Copied ${copied} icon file(s) into public/`);
