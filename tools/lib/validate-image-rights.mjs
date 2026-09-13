import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

export function validateImageRights(product) {
  const publication = product.publication;
  assert.equal(publication.imageRights, 'user-confirmed-website-use');
  assert.equal(typeof publication.imageRightsEvidence, 'string');
  assert(publication.imageRightsEvidence.startsWith('docs/release/'), 'Image-rights evidence must remain in docs/release');
  const evidence = JSON.parse(fs.readFileSync(publication.imageRightsEvidence, 'utf8'));
  assert.equal(evidence.status, 'confirmed');
  assert.equal(evidence.scope, 'CHUANWEI FIRE official website public display');
  for (const file of Object.values(product.media)) {
    const item = evidence.images.find(image => image.productId === product.id && image.path === file);
    assert(item, `${product.id}: image is outside confirmed scope: ${file}`);
    const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    assert.equal(hash, item.sha256, `${product.id}: confirmed image changed: ${file}`);
  }
}
