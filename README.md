# Jez Pereira — Next.js Site

Production-grade Next.js 15 site for Jez Pereira. Static-generated, content-driven via MDX, deploy-anywhere.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 15.5** (App Router) |
| UI | **React 19** + TypeScript 5.7 |
| Styling | **Tailwind CSS 4** (CSS-first config in `globals.css`) |
| Content | **MDX** files in `/content`, parsed with `gray-matter` + `next-mdx-remote` |
| Animation | Plain CSS keyframes (no Motion dependency yet — easy to add later) |
| Fonts | Fraunces + IBM Plex Mono (Google Fonts) |
| Deploy | Optimised for **Vercel** (just `vercel` from project root) |

All pages are statically pre-rendered at build time — every route is fully indexable HTML on first load.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:
```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run type-check   # tsc --noEmit
```

---

## Deploy to Vercel

Easiest path:

```bash
# from project root
npm i -g vercel       # if you don't have it
vercel                # prompts to link/create a project
vercel --prod         # promote to production
```

Or wire up a GitHub repo from the Vercel dashboard — every push to `main` auto-deploys.

No environment variables needed. Vercel auto-detects Next.js 15.

---

## Project structure

```
.
├── app/
│   ├── layout.tsx           # Root layout — Nav, Footer, MusicPlayer (persist across routes)
│   ├── page.tsx             # Home — Hero, Next Show, Three Doors
│   ├── story/page.tsx       # The Story — renders bio MDX
│   ├── music/page.tsx       # The Music — renders releases collection
│   ├── live/page.tsx        # Live — renders gigs collection
│   ├── family/page.tsx      # The Family — SYCK group
│   ├── sitemap.ts           # Generates sitemap.xml at build
│   ├── robots.ts            # Generates robots.txt at build
│   └── globals.css          # Tailwind @theme + base + keyframes
│
├── components/              # All React components
│   ├── Nav.tsx              # Sticky nav (client component)
│   ├── Footer.tsx
│   ├── MusicPlayer.tsx      # Fixed audio player (client component)
│   ├── Hero.tsx             # Homepage hero with breathing gradients
│   ├── Door.tsx             # Three doors on homepage
│   ├── PageHeader.tsx       # Inner-page hero
│   ├── SectionHeading.tsx   # Mono caps section heading
│   ├── ReleaseRow.tsx       # One release on Music page
│   ├── LiveRow.tsx          # One gig on Live page
│   └── FamilyCard.tsx       # One SYCK arm card
│
├── content/                 # ★ EDIT CONTENT HERE — no code changes required
│   ├── bio/                 # 3 movements of the story (mdx)
│   ├── gigs/                # One mdx file per show
│   └── releases/            # One mdx file per release
│
├── lib/
│   ├── types.ts             # Gig, Release, BioMovement types
│   └── content.ts           # Reads /content at build, returns typed data
│
├── public/
│   ├── llms.txt             # AI/LLM crawler entity info
│   ├── images/              # Drop photos here
│   └── audio/               # Drop the background mix MP3 here as mix.mp3
│
├── package.json
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs       # Tailwind 4
```

---

## Editing content

Everything Jez or anyone updates over time lives in `/content` — no code changes needed.

### Adding a gig

Create a new file in `content/gigs/` named `YEAR-slug.mdx`:

```mdx
---
year: "2026"
venue: "*Lost in Musyck* · The Roundhouse"
location: "London, UK"
upcoming: true
---
```

Fields:
- **year** *(required)* — string. Use ranges like `"1993-2000"` when needed.
- **venue** *(required)* — the venue name. Wrap in `*asterisks*` to italicise a portion in magenta accent.
- **location** *(required)* — short location string in caps-style.
- **upcoming** *(optional)* — set to `true` to show in the "Currently on the calendar" section. Omit for past performances.

That's it. Save the file, rebuild, the gig appears.

### Adding a release

Create a new file in `content/releases/` named `YEAR-slug.mdx`:

```mdx
---
year: 2026
artist: "Some Artist"
title: "Track Title"
remixer: "Jez Pereira Remix"
label: "SYCK Records"
---
```

Fields:
- **year** *(required)* — number.
- **title** *(required)* — track title.
- **artist** *(optional)* — original artist (omit for Jez's own work).
- **remixer** *(optional)* — credits line beneath the title.
- **label** *(optional)* — small magenta label tag on the right.

### Editing the bio

Three MDX files in `content/bio/`:
- `01-beginning.mdx` (Mumbai years)
- `02-world.mdx` (London → global)
- `03-founder.mdx` (SYCK era)

Standard markdown works. Use `*italic*` for accented words, `> quote` for pull-quotes.

---

## Customising

### Colours

Tailwind 4 design tokens live at the top of `app/globals.css`:

```css
@theme {
  --color-background: #0a0a0b;
  --color-accent: #d72d58;   /* The magenta */
  --color-ink: #f1ece2;
  /* … */
}
```

Change a value here and it propagates everywhere — `bg-background`, `text-accent`, `border-line`, etc.

### Hero copy

`components/Hero.tsx` — the `<h1>` and the four-line rhythm are inline. Edit and save.

### Music player

`components/MusicPlayer.tsx` — props let you change the displayed track name and audio source:

```tsx
<MusicPlayer
  src="/audio/mix.mp3"
  trackName="Lost in Musyck · Vol. 02"
  label="Now Selecting"
/>
```

Drop your MP3 in `public/audio/mix.mp3` and it'll play when the user clicks the triangle.

---

## SEO / GEO / AEO checklist

Built in by default:

- ✅ **Static HTML for every route** (App Router prerender)
- ✅ Unique `<title>` and `<meta description>` per page via Next.js Metadata API
- ✅ `<meta property="og:*">` Open Graph tags
- ✅ Twitter Card meta
- ✅ Canonical URLs auto-generated by Next
- ✅ JSON-LD structured data (Person schema in root layout)
- ✅ Automatic `sitemap.xml` (from `app/sitemap.ts`)
- ✅ Automatic `robots.txt` (from `app/robots.ts`)
- ✅ `llms.txt` at root for AI crawlers (ChatGPT, Perplexity, AI Overviews)
- ✅ Semantic HTML5 (proper landmarks, headings)
- ✅ Mobile-responsive
- ✅ Accessibility: ARIA labels on icon-only buttons, keyboard navigable

After deploy, validate with:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org validator: https://validator.schema.org/

---

## What's missing (intentional — for you to add)

- **Photos** — drop them in `public/images/`. Currently the site uses gradient placeholders where photography would normally sit.
- **OG cover image** — `public/images/og-cover.jpg` for social shares.
- **Background mix** — `public/audio/mix.mp3` for the player.
- **A favicon set** — add `favicon.ico`, `apple-touch-icon.png` etc. to `app/` or `public/`.

---

## Migration notes (from v1 plain HTML)

This v2 is functionally identical to the static HTML v1, plus:

- Components instead of duplicated markup
- Content as data (MDX files, not hand-written `<li>` rows)
- TypeScript safety
- Tailwind utility classes (smaller CSS, easier to extend)
- Auto-generated sitemap and robots
- React 19 / Next.js 15 with App Router (server components by default = fast)
- Music player state survives client-side navigation

The visual design is byte-for-byte the same as v1.
