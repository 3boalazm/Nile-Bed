/**
 * WCAG contrast gate for the two Nile Bed palettes.
 *
 *   node scripts/check-design-tokens.mjs      (or: npm run check:contrast)
 *
 * Reads the LIGHT (`--nb-l-*`) and DARK (`--nb-d-*`) primitives from
 * styles/tokens.css and checks every documented foreground/background pair.
 * Exits non-zero if any pair drops below its threshold, so a palette edit can
 * never silently reintroduce a contrast problem.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'styles/tokens.css'), 'utf8');

const palettes = { light: {}, dark: {} };
for (const m of css.matchAll(/--nb-(l|d)-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  palettes[m[1] === 'l' ? 'light' : 'dark'][m[2]] = m[3];
}

// [label, foreground token, background token, minimum ratio]
const pairs = [
  ['heading / page',            'ink',              'bg',                4.5],
  ['body / page',               'text',             'bg',                4.5],
  ['muted / page',              'muted',            'bg',                4.5],
  ['subtle / page',             'subtle',           'bg',                4.5],
  ['body / card',               'text',             'surface',           4.5],
  ['body / raised card',        'text',             'surface-2',         4.5],
  ['body / inset card',         'text',             'surface-3',         4.5],
  ['copper link / page',        'accent-strong',    'bg',                4.5],
  ['focus ring / page',         'focus',            'bg',                4.5],
  ['coral label / page',        'hot-strong',       'bg',                4.5],
  ['coral label / soft tint',   'hot-strong',       'hot-soft',          4.5],
  ['danger / page',             'danger',           'bg',                4.5],
  ['success / page',            'success',          'bg',                4.5],
  ['heading / soft tint',       'ink',              'accent-soft',       4.5],
  ['text / dark band',          'on-inverse',       'inverse',           4.5],
  ['muted / dark band',         'on-inverse-muted', 'inverse',           4.5],
  ['coral / dark band',         'hot-text',         'inverse',           4.5],
  ['CTA text / coral',          'on-hot',           'hot',               4.5],
  ['CTA text / coral hover',    'on-hot',           'hot-hover',         4.5],
  ['text / copper fill',        'on-accent',        'accent',            4.5],
  ['text / deep copper fill',   'on-accent-strong', 'accent-strong',     4.5],
  ['text / WhatsApp green',     'on-whatsapp',      'whatsapp',          4.5],
  ['text / product image bed',  'on-media',         'media',             4.5],
];

function luminance(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

let failures = 0;
for (const [mode, palette] of Object.entries(palettes)) {
  console.log(`\n  ${mode.toUpperCase()} PALETTE`);
  console.log('  ' + '-'.repeat(62));
  for (const [label, fg, bg, min] of pairs) {
    const a = palette[fg];
    const b = palette[bg];
    if (!a || !b) {
      console.log(`  MISSING  ${label} (${fg} / ${bg})`);
      failures += 1;
      continue;
    }
    const ratio = contrast(a, b);
    const ok = ratio >= min;
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(27)} ${ratio.toFixed(2).padStart(6)} : 1  (min ${min})`);
  }
}

console.log('');
if (failures) {
  console.error(`✗ ${failures} contrast pair(s) below threshold — fix styles/tokens.css.`);
  process.exit(1);
}
console.log(`✓ ${pairs.length * 2} contrast pairs pass in both palettes.`);
