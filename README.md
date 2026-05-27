# Jez Pereira

A small, quiet personal site for essays, notes, and projects.

## Stack

| Layer          | Choice                                               |
| -------------- | ---------------------------------------------------- |
| Framework      | [Next.js 15](https://nextjs.org) (App Router)        |
| UI library     | [React 19](https://react.dev)                        |
| Language       | [TypeScript 5](https://www.typescriptlang.org)       |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com)            |
| Content        | [MDX](https://mdxjs.com) + `gray-matter` (file-based) |
| Animation      | [Motion](https://motion.dev) (formerly Framer Motion) |
| Analytics      | [Vercel Analytics](https://vercel.com/docs/analytics) + Speed Insights |
| Hosting        | [Vercel](https://vercel.com)                         |
| Repo           | GitHub                                               |

> A note on Contentlayer: the original `contentlayer` package is no longer
> maintained. This project uses a tiny file-based content layer built on
> `gray-matter` + `next-mdx-remote`, which provides Contentlayer-style DX
> (typed frontmatter, slug-based routing, reading time) without the dependency
> baggage. Swap in [Sanity](https://www.sanity.io) later if you want a hosted
> CMS — the `src/lib/content.ts` interface is the only thing to replace.

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build locally
- `npm run lint` — ESLint (Next + TypeScript rules)
- `npm run typecheck` — strict TypeScript check

## Writing posts

Posts live as MDX files in `content/posts/`. Frontmatter:

```yaml
---
title: "Title here"
description: "One-line summary."
date: "2026-05-27"
tags: ["essays"]
draft: false
---
```

Routing, sitemap entries, reading time, and OpenGraph metadata are derived
automatically. Drafts (`draft: true`) are excluded from listings and sitemap.

## Project structure

```
content/posts/         # MDX posts
public/                # Static assets
src/
  app/                 # App Router routes
    blog/              # /blog and /blog/[slug]
    layout.tsx         # Root layout (fonts, analytics, header/footer)
    page.tsx           # Home (hero + recent posts)
    sitemap.ts         # /sitemap.xml
    robots.ts          # /robots.txt
    icon.svg           # Favicon
  components/          # Hero, SiteHeader, SiteFooter, PostCard
  lib/                 # site config, content layer, utils
  mdx-components.tsx   # Shared MDX overrides (links, images)
next.config.ts         # MDX pipeline (remark-gfm, rehype-pretty-code)
postcss.config.mjs     # Tailwind v4 plugin
eslint.config.mjs      # Flat ESLint config
```

## Deployment

Push to GitHub, import the repo in Vercel, set `NEXT_PUBLIC_SITE_URL` to the
production domain, and that's it. Analytics and Speed Insights work out of the
box on Vercel — no extra setup required.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (used for OG / sitemap)
