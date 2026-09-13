import fs from 'node:fs';
import crypto from 'node:crypto';
export function thumbnailFor(source) {
  const digest = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0,24);
  return `assets/catalog-thumbnails/${digest}-480.webp`;
}
