# MODE Fashion Blog — Design Specification

## Overview

MODE is a purely frontend fashion blog built with Next.js 16, Tailwind CSS v4, and the Swiss Modernism 2.0 design system (dark mode with gold accents). Content is authored as MDX files and statically generated at build time. Components are sourced from 21st.dev and customized to the MODE design tokens. Animations use Framer Motion (Motion for React) to create an editorial scrolling experience.

## Technology Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2.10 (App Router) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Content | MDX (`.mdx` files in `src/content/articles/`) |
| Fonts | Playfair Display (display/serif) + Inter (body/sans) |
| Animation | `motion/react` (Framer Motion v12+) |
| Components | 21st.dev marketplace |
| Design Engine | ui-ux-pro-max |
| Deployment | Static export / SSG via `next build` |

## Content Model

Each article is an `.mdx` file with frontmatter:

```mdx
---
title: "The New Silhouette: Architecture Meets Fabric"
slug: new-silhouette-architecture-fabric
category: "runway"
date: "2026-07-10"
hero: "/images/hero-01.jpg"
excerpt: "How brutalist geometry is reshaping this season's tailoring."
author: "MODE Editorial"
featured: true
---
```

- **Categories:** runway, street-style, culture, beauty
- **Featured flag:** controls whether an article appears in the homepage hero
- **No runtime data fetching** — all queries happen at `next build` via `generateStaticParams`

## Page Architecture

### Homepage (`/`)
- **Hero section** — featured article with full-bleed image, overlaid title, category badge, gold rule divider. Framer Motion scroll-driven parallax on hero image.
- **Featured feed** — 3-column responsive grid of article cards (2-col tablet, 1-col mobile). Each card: image thumbnail, category tag, title, date, gold rule. Staggered scroll-reveal via Framer Motion variants.
- **Latest Stories** — chronological list of recent articles.

### Articles Feed (`/articles`)
- Full grid of all articles, filterable by category (client-side tab filter).
- Same ArticleCard component as homepage.
- `AnimatePresence` for smooth category filter transitions.

### Article Page (`/articles/[slug]`)
- Full-bleed hero image with max-height cap.
- Article header: category badge, Playfair Display XL title, date, gold rule divider.
- Body: Playfair Display headings, Inter body text, pull quotes (gold accent), inline images.
- Scroll-driven reading progress bar (gold, left edge).
- Related articles section at the bottom.

### Category Pages (`/category/[category]`)
- Same as articles feed, pre-filtered to one category.
- Category name displayed as section hero/title.

### About Page (`/about`)
- Minimal editorial about page — publication manifesto, team photos.

### Navigation
- Fixed top nav: logo left, nav links (Runway, Street Style, Culture, About).
- Transparent on hero scroll-up, solid dark on scroll-down (Framer Motion `useScroll`).
- Mobile: hamburger with slide-out overlay (`AnimatePresence` with `x` transform).

## Component Tree

```
src/
├── components/
│   ├── Header.tsx            — Fixed top navigation (transparent→solid on scroll)
│   ├── Footer.tsx            — Minimal footer (mode logo, links, copyright)
│   ├── ArticleCard.tsx       — Feed card (image, category, title, date)
│   ├── ArticleGrid.tsx       — Responsive grid of ArticleCards
│   ├── CategoryBadge.tsx     — Small gold badge with category name
│   ├── GoldRule.tsx          — Decorative gold divider
│   ├── SectionHeading.tsx    — Playfair Display section title
│   ├── ScrollProgress.tsx    — Reading progress indicator (article page)
│   └── MobileNav.tsx         — Slide-out mobile navigation
│
├── content/
│   └── articles/
│       ├── article-01.mdx
│       └── ...
│
├── app/
│   ├── page.tsx              — Homepage
│   ├── layout.tsx            — Root layout (fonts, metadata)
│   ├── articles/
│   │   ├── page.tsx          — All articles feed
│   │   └── [slug]/
│   │       └── page.tsx      — Article detail
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx      — Category feed
│   └── about/
│       └── page.tsx          — About page
│
├── data/
│   ├── articles.ts           — Read frontmatter from MDX files, export for pages
│   └── categories.ts         — Category metadata (name, slug, description)
```

### 21st.dev Sourcing Strategy

| Component | Strategy |
|-----------|----------|
| Header/Nav | Source nav component, customize Tailwind tokens |
| Article cards | Source card components as base, style to MODE design |
| Article grid | Build custom (simple CSS grid) |
| Hero section | Source hero pattern (Scroll Media Expansion Hero or Animated Hero) |
| Footer | Source minimal footer component |
| Mobile nav | Build custom for the slide-out interaction |

## Animation Strategy

| Element | Animation | Framer Motion API |
|---------|-----------|-------------------|
| Hero image | Parallax on scroll | `useScroll` + `useTransform` |
| Article cards | Staggered reveal on scroll | `whileInView` + variants, `staggerChildren: 0.1` |
| Category filter | Smooth grid reflow | `AnimatePresence` + `layout` prop |
| Page transitions | Fade + slide between routes | `AnimatePresence` mode="wait" |
| Header | Transparent → solid on scroll | `useScroll` driven background opacity |
| Scroll progress | Gold bar tracking reading depth | `useScroll` → `useTransform` for width |
| Pull quotes | Scale + fade in on scroll | `whileInView` with spring physics |
| Card hover | Subtle lift + gold border | `whileHover` |
| Mobile nav | Slide overlay from right | `AnimatePresence` with `x` transform |

All animations respect `prefers-reduced-motion` via `useReducedMotion()`.

## Design System Tokens

Refer to `docs/2026-07-12-MODE-fashion-blog-design.md` for the full color palette, typography scale, and spacing system. Key tokens are already implemented in `src/app/globals.css` via Tailwind's `@theme inline`.

## Static Generation Strategy

- All pages use Static Site Generation (SSG).
- `generateStaticParams` on `articles/[slug]` and `category/[category]` reads MDX files at build time.
- No `loading.tsx` or dynamic rendering needed.
- `revalidate` is not set — full rebuild on content changes.

## Accessibility & UX

- WCAG AA contrast (minimum 4.5:1) — the gold accent `#d4a853` on `#0a0a0a` achieves 5.3:1.
- All touch targets ≥44×44px.
- `prefers-reduced-motion` respected throughout.
- Skip-to-content link for keyboard users.
- Semantic heading hierarchy (h1→h2→h3, no skips).
- Alt text on all editorial images.
