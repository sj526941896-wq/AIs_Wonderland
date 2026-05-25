import type { CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;

/** URL segment: custom frontmatter `slug` → `entry.slug`; else id without `.md`. */
export function getEntrySlug(entry: Entry): string {
  const raw = entry.slug ?? entry.id;
  return raw.replace(/\.md$/, '');
}

export function entryPath(slug: string): string {
  return `/journal/${slug}/`;
}

export function entryUrl(slug: string, site = 'https://ais.aitennis.top'): string {
  return new URL(entryPath(slug), site).href;
}

export function getListDescription(entry: Entry): string {
  if (entry.data.description) return entry.data.description;
  const raw = entry.body?.trim() ?? '';
  const line = raw
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^#.+$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>#`-]/g, '')
    .split('\n')
    .map((s) => s.trim())
    .find((s) => s.length > 20);
  if (!line) return '';
  return line.length > 120 ? `${line.slice(0, 120)}…` : line;
}
