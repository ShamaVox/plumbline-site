// Static checks for the Plumbline site. Run: node --test tests/site.test.mjs  (Node 20+, no dependencies)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = Object.fromEntries(['index.html', 'tour.html'].map((f) => [f, readFileSync(join(ROOT, f), 'utf8')]));
const tour = pages['tour.html'];

test('founder signature credits the studio and her background', () => {
  const sig = tour.match(/<div class="sig">([\s\S]*?)<\/div>/)[1];
  assert.match(sig, /Shama Keskar/);
  assert.match(sig, /16 years at Google, LinkedIn and Amazon/);
  assert.match(sig, /<a href="https:\/\/shamaaiventures\.shamakeskar\.com\/" rel="noopener">Shama\s+AI Ventures<\/a>, an AI product studio/);
  // past startups stay unnamed in public Plumbline copy
  assert.doesNotMatch(sig, /Suede|SignAI/i);
});

for (const [name, src] of Object.entries(pages)) {
  test(`${name}: code stays private (no repo links, no source-availability claims)`, () => {
    assert.doesNotMatch(src, /github\.com\/shamavox\/plumbline/i);
    assert.doesNotMatch(src, /source[- ]available|open[- ]source/i);
  });

  test(`${name}: one company name, never a second studio brand`, () => {
    assert.doesNotMatch(src, /Shama AI Studio/);
    assert.match(src, /© 2026 Styled By and Shama AI Ventures LLC/);
  });

  test(`${name}: in-page anchors resolve and local assets exist`, () => {
    const ids = new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const [, a] of src.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(a), `#${a} has no target`);
    const local = [...src.matchAll(/(?:src|href|poster)="([^"#?:]+)"/g)].map((m) => m[1]).filter((u) => u !== './');
    for (const r of local) assert.ok(existsSync(join(ROOT, r)), `missing asset: ${r}`);
  });

  test(`${name}: no placeholder text`, () => {
    assert.doesNotMatch(src, /lorem|ipsum|TODO|FIXME|\$\$|\[getStyledBy/i);
  });
}
