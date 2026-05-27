import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Gig, Release, BioMovement } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Read every .mdx file in a content subfolder and return parsed frontmatter + body.
 */
function readCollection(folder: string) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

// Convert a year string ("2025", "1993-2000") into a sortable number.
// Ranges use their START year as the sort key.
function yearToSortKey(year: string): number {
  const m = String(year).match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
}

export function getGigs(): Gig[] {
  return readCollection('gigs')
    .map(({ slug, data }): Gig => ({
      slug,
      year: String(data.year ?? ''),
      venue: data.venue ?? '',
      location: data.location ?? '',
      date: data.date,
      featured: data.featured === true,
      upcoming: data.upcoming === true,
      sortKey: yearToSortKey(String(data.year ?? '')),
    }))
    .sort((a, b) => b.sortKey - a.sortKey);
}

export function getReleases(): Release[] {
  return readCollection('releases')
    .map(({ slug, data }): Release => ({
      slug,
      year: Number(data.year ?? 0),
      title: data.title ?? '',
      artist: data.artist,
      remixer: data.remixer,
      label: data.label,
      note: data.note,
      href: data.href,
    }))
    .sort((a, b) => b.year - a.year);
}

export function getBioMovements(): BioMovement[] {
  return readCollection('bio')
    .map(({ slug, data, content }): BioMovement => ({
      slug,
      order: Number(data.order ?? 0),
      movement: data.movement ?? '',
      title: data.title ?? '',
      body: content.trim(),
    }))
    .sort((a, b) => a.order - b.order);
}
