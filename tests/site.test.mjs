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

test('index.html: the problem is shown with real, sourced incidents, right after the hero', () => {
  const src = pages['index.html'];
  const strip = src.match(/<section class="incidents"[\s\S]*?<\/section>/);
  assert.ok(strip, 'incidents strip is missing');
  assert.ok(src.indexOf('class="incidents"') < src.indexOf('id="demo"'), 'incidents must come before the demo');
  // Every incident and the statistic link to a published source.
  const links = [...strip[0].matchAll(/<a href="(https:\/\/[^"]+)" target="_blank" rel="noopener noreferrer">/g)].map((m) => m[1]);
  assert.equal(links.length, 4);
  for (const host of ['cbsnews.com', 'fortune.com', 'cxtoday.com', 'thestar.com.my']) assert.ok(links.some((l) => l.includes(host)), `no source from ${host}`);
  // No invented money figures: claims stay as reported.
  assert.doesNotMatch(strip[0], /\$\s?\d/);
});

test('tour.html: the problem section cites the same incidents', () => {
  const problem = tour.match(/<section class="problem">[\s\S]*?<\/section>/)[0];
  for (const name of ['Air Canada, 2024', 'Replit, 2025', 'Cursor, 2025']) assert.match(problem, new RegExp(name));
  assert.match(problem, /None of them threw an error/);
});
