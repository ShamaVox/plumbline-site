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
  // The problem comes straight after the hero (which holds the demo video), before anything about the product.
  const heroEnd = src.indexOf('</section>', src.indexOf('class="hero"'));
  assert.ok(heroEnd < src.indexOf('class="incidents"'), 'incidents must come after the hero');
  assert.ok(src.indexOf('class="incidents"') < src.indexOf('id="loop"'), 'incidents must come before the product sections');
  assert.ok(src.indexOf('id="demo"') < heroEnd, 'the demo video sits in the hero');
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

test('index.html: the reliability loop is five accessible tabs, readable without JavaScript', () => {
  const src = pages['index.html'];
  const tabs = [...src.matchAll(/<button role="tab" id="([^"]+)" aria-controls="([^"]+)"/g)];
  assert.equal(tabs.length, 5);
  for (const [, tab, panel] of tabs) {
    assert.match(src, new RegExp(`<div class="panel" role="tabpanel" id="${panel}" aria-labelledby="${tab}">`), `${panel} missing`);
  }
  // Panels are not hidden in the markup: without the script every step shows. The tab list itself starts hidden.
  assert.doesNotMatch(src, /role="tabpanel"[^>]*hidden/);
  assert.match(src, /<div class="tabs" role="tablist"[^>]*hidden>/);
  // Example figures are labelled as such.
  assert.match(src, /Figures are illustrative/);
});

test('index.html: no social proof the beta does not have yet', () => {
  const src = pages['index.html'];
  assert.doesNotMatch(src, /trusted by|used by|\bour customers|testimonial|fortune 500|SOC 2 (certified|compliant|type)/i);
  // "1,200+ customers", "50 companies": counts we cannot back yet. (Case-sensitive: "a 200. Customers found out" is prose.)
  assert.doesNotMatch(src, /\b\d[\d,]*\+? (customers|companies|teams)\b/);
});

test('index.html: never leads with "free"; the beta\'s cost is mentioned once, in the beta section', () => {
  const src = pages['index.html'];
  const hero = src.slice(src.indexOf('class="hero"'), src.indexOf('</section>', src.indexOf('class="hero"')));
  assert.doesNotMatch(hero + src.match(/<title>[^<]*<\/title>/)[0], /\bfree\b/i);
  const beta = src.match(/<section class="beta"[\s\S]*?<\/section>/)[0];
  assert.match(beta, /No cost for the whole beta/);
  assert.equal((src.match(/\bfree\b|no cost/gi) ?? []).length, 1);
});

test('index.html: FAQ answers the first questions, and the NDA is visible from the hero', () => {
  const src = pages['index.html'];
  const faq = src.match(/<section class="faq"[\s\S]*?<\/section>/)[0];
  for (const q of ['change our code', 'replace our tracing', 'What do you store', 'unreachable', 'NDA']) assert.match(faq, new RegExp(q));
  assert.match(src.slice(0, src.indexOf('class="incidents"')), /mutual NDA/);
});
