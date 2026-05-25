/**
 * Resolve journal URL slug from an entries markdown file path.
 * Usage: node scripts/resolve-slug.mjs src/content/entries/foo.md
 */
import { readFileSync } from 'fs';

const file = process.argv[2];
if (!file) process.exit(1);

const text = readFileSync(file, 'utf8');
const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
let slug = null;

if (match) {
  const slugLine = match[1].match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (slugLine) slug = slugLine[1].trim();
}

if (!slug) {
  const base = file.split('/').pop().replace(/\.md$/, '');
  slug = base;
}

process.stdout.write(slug);
