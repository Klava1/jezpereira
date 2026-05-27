/**
 * Content collection types — these match the frontmatter in /content/*.mdx files.
 * Update the schema here AND the related MDX files together.
 */

export type Gig = {
  slug: string;
  year: string; // string because we sometimes use ranges like "1993-2000"
  venue: string;
  location: string;
  date?: string;
  featured?: boolean;
  upcoming?: boolean;
  sortKey: number; // computed from year/date for ordering
};

export type Release = {
  slug: string;
  year: number;
  title: string;
  artist?: string;
  remixer?: string;
  label?: string;
  note?: string;
  href?: string;
};

export type BioMovement = {
  slug: string;
  order: number;
  movement: string; // "Movement One · 1993 — 2000"
  title: string;    // "The Beginning"
  body: string;     // markdown body
};
