# MODE — Fashion Blog

A curated editorial experience covering fashion, culture, and style through the lens of Swiss Modernism.

**MODE** is a purely frontend fashion blog built with Next.js 16, Tailwind CSS v4, and the Swiss Modernism 2.0 design system (dark mode with gold accents). Content is authored as MDX files and statically generated at build time.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (`@tailwindcss/postcss`) |
| Content | MDX (`.mdx` files in `src/content/articles/`) |
| Fonts | Playfair Display (display/serif) + Inter (body/sans) |
| Animation | [`motion/react`](https://motion.dev) (Framer Motion v12+) |
| Deployment | Static Site Generation via `next build` |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout (fonts, metadata, header/footer)
│   ├── page.tsx             # Homepage — hero, featured, latest, categories
│   ├── not-found.tsx        # 404 page
│   ├── globals.css          # Design tokens, typography, utilities
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── articles/
│   │   ├── page.tsx         # All articles with category filter
│   │   ├── loading.tsx      # Skeleton loading state
│   │   └── [slug]/
│   │       └── page.tsx     # Individual article page
│   └── category/
│       └── [category]/
│           └── page.tsx     # Category-filtered article feed
├── components/
│   ├── Header.tsx           # Fixed top navigation
│   ├── MobileNav.tsx        # Slide-out mobile navigation
│   ├── Footer.tsx           # Site footer
│   ├── ArticleCard.tsx      # Feed card (image, category, title, date)
│   ├── ArticleGrid.tsx      # Responsive grid of ArticleCards
│   ├── ArticlesFilter.tsx   # Category filter with AnimatePresence
│   ├── CategoryBadge.tsx    # Gold category badge
│   ├── GoldRule.tsx         # Decorative gold divider
│   ├── SectionHeading.tsx   # Section title (Playfair Display)
│   ├── ParallaxHero.tsx     # Full-bleed hero with scroll parallax
│   ├── ScrollProgress.tsx   # Reading progress bar (article pages)
│   ├── PageTransition.tsx   # Fade/slide page transitions
│   └── Skeleton.tsx         # Loading skeleton components
├── content/
│   └── articles/            # MDX article files + articles.json
├── data/
│   ├── articles.ts          # Article data utilities (re-exports from lib)
│   └── categories.ts        # Category metadata
├── lib/
│   └── articles.ts          # MDX file reading and frontmatter parsing
└── types/
    └── article.ts           # TypeScript interfaces
```

## Content Management

Articles are written as MDX files in `src/content/articles/` with YAML frontmatter:

```mdx
---
slug: the-new-silhouette
title: "The New Silhouette: Architecture Meets Fabric"
category: runway
date: "2026-07-10"
hero: "/images/hero-01.jpg"
excerpt: "How brutalist geometry is reshaping this season's tailoring."
author: "MODE Editorial"
featured: true
---
```

**Frontmatter fields:**

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL slug (must be unique) |
| `title` | string | Article headline |
| `category` | `runway \| street-style \| culture \| beauty` | Content category |
| `date` | string (ISO) | Publication date |
| `hero` | string | Hero image path in `public/images/` |
| `excerpt` | string | Short description for cards/previews |
| `author` | string | Author name |
| `featured` | boolean | Shows on homepage hero if true |

Use the batch generation script to create multiple articles at once:

```bash
node scripts/generate-content.mjs --count=5
```

## Design System

MODE uses a **Swiss Modernism 2.0** aesthetic — clean lines, generous whitespace, and a restrained color palette:

- **Background:** `#0a0a0a` (near-black)
- **Text:** `#fafafa` (off-white)
- **Accent:** `#d4a853` (gold — achieves 5.3:1 contrast ratio, WCAG AA)
- **Grays:** A 7-step scale from `#1a1a1a` to `#d4d4d4`
- **Typography:** Playfair Display for headings, Inter for body text
- **Animation:** Subtle scroll-driven parallax, staggered card reveals, gold reading progress bar

Design tokens are defined in `src/app/globals.css` under `@theme inline` and are available as Tailwind classes (e.g., `bg-mode-black`, `text-mode-gold`, `font-display`).

## Key Features

- **100% Static Site Generation** — all pages built at compile time, zero runtime data fetching
- **MDX Article Authoring** — write articles with Markdown + JSX components
- **Parallax Hero** — scroll-driven parallax on featured articles
- **Category Filtering** — client-side category tabs on the articles page
- **Reading Progress** — gold progress bar on article pages
- **Responsive Design** — mobile hamburger nav, adaptive grids (1→2→3 columns)
- **Accessibility** — WCAG AA contrast, skip-to-content link, reduced-motion support, semantic headings
- **Animations** — Framer Motion scroll reveals, page transitions, spring-based mobile nav

## Deployment

The site builds to a static export in the `out/` directory:

```bash
npm run build
```

Deploy the `out/` directory to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.). No server required.

---

Built with Next.js, Tailwind CSS, and Motion.
