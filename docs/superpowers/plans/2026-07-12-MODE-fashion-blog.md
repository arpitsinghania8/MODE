# MODE Fashion Blog — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a purely frontend fashion blog with Swiss Modernism 2.0 design, MDX content, SSG, and Framer Motion animations.

**Architecture:** Next.js 16 App Router with all pages statically generated at build time. Articles are `.mdx` files read via `@next/mdx` with frontmatter parsed by `gray-matter`. Component sourcing uses 21st.dev for structural UI blocks. Animations use `motion/react` (Motion v12+). Design tokens are defined in Tailwind v4's `@theme inline` in `globals.css`.

**Tech Stack:** Next.js 16.2.10, Tailwind CSS v4, `motion/react` (Framer Motion v12+), `@next/mdx`, `gray-matter`, Playfair Display + Inter fonts, 21st.dev

## Global Constraints

- Next.js 16.2.10 — read `node_modules/next/dist/docs/` before writing code if uncertain about an API
- All imports from `motion/react`, not `framer-motion` (Motion v12+ convention)
- Tailwind CSS v4 with `@tailwindcss/postcss` — no `tailwind.config.js` needed; tokens are in `@theme inline` in `globals.css`
- Design tokens already defined in `src/app/globals.css` under `@theme inline` — use `text-gold`, `bg-gold`, `border-gold`, `font-display`, `font-body`, `text-display-xl` etc.
- `@/*` path alias configured — use `@/components/...` for imports
- 100% SSG — all pages use `generateStaticParams` where needed, no dynamic rendering
- All articles live in `src/content/articles/` as `.mdx` files
- Images live in `public/images/` — referenced as `/images/filename.jpg`
- Color contrast: gold `#d4a853` on black `#0a0a0a` achieves 5.3:1 (WCAG AA)
- Respect `prefers-reduced-motion` everywhere animations are used

---

### Task 1: Install Dependencies and Configure MDX

**Files:**
- Create: `src/mdx-components.tsx`
- Modify: `next.config.ts`
- Modify: `src/app/globals.css` (minor addition: mdx-content styles)

**Interfaces:**
- Consumes: None (first task)
- Produces: `useMDXComponents()` function for all MDX rendering; MDX-enabled next.config for subsequent tasks

- [ ] **Step 1: Install dependencies**

```bash
npm install motion @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter
```

Expected: packages added to `node_modules/` and `package.json`

- [ ] **Step 2: Create `src/mdx-components.tsx`**

This file maps HTML elements to styled components for MDX rendering.

```tsx
// src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="heading-display-xl text-mode-white mt-16 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="heading-display-lg text-mode-white mt-14 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="heading-display-md text-mode-white mt-10 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="heading-display-sm text-mode-white mt-8 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-mode-gold underline underline-offset-2 decoration-mode-gold/40 hover:decoration-mode-gold transition-all duration-200"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6 list-disc list-inside space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6 list-decimal list-inside space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-mode-gold pl-6 my-10 font-display text-display-sm italic text-mode-gold leading-[1.3]">
      {children}
    </blockquote>
  ),
  hr: () => (
    <div className="gold-rule my-12" />
  ),
  img: ({ src, alt }) => (
    <div className="my-10 relative w-full aspect-[16/9] overflow-hidden rounded-sm">
      {src && (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      )}
    </div>
  ),
  code: ({ children }) => (
    <code className="bg-mode-gray-800 text-mode-gray-300 px-2 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-mode-gray-800 p-4 rounded-sm overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

- [ ] **Step 3: Update `next.config.ts` to enable MDX**

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

- [ ] **Step 4: Add MDX content styles to `globals.css`**

Append at the end of `src/app/globals.css`:

```css
/* ===================================================================
   MDX Article Content
   =================================================================== */

.mdx-content > *:first-child {
  margin-top: 0;
}

.mdx-content > *:last-child {
  margin-bottom: 0;
}

.mdx-content img {
  border-radius: 2px;
}
```

- [ ] **Step 5: Verify MDX configuration works**

```bash
npm run build
```

Expected: Build succeeds without errors. (May be minimal since no MDX pages exist yet.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure MDX, install dependencies (motion, gray-matter, @next/mdx)"
```

---

### Task 2: Create Types, Sample Articles, and Hero Images

**Files:**
- Create: `src/types/article.ts`
- Create: `src/content/articles/collection-01.mdx`
- Create: `src/content/articles/collection-02.mdx`
- Create: `public/images/` (directory with placeholder)

**Interfaces:**
- Consumes: None
- Produces: `ArticleMeta` type; sample `.mdx` articles for Tasks 3-10 to consume

- [ ] **Step 1: Create `src/types/article.ts`**

```ts
// src/types/article.ts
export interface ArticleMeta {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string;
  hero: string;
  excerpt: string;
  author: string;
  featured?: boolean;
}

export type ArticleCategory =
  | "runway"
  | "street-style"
  | "culture"
  | "beauty";

export interface ArticleData extends ArticleMeta {
  content: string;
}

export interface CategoryMeta {
  slug: ArticleCategory;
  name: string;
  description: string;
}
```

- [ ] **Step 2: Create `src/content/articles/collection-01.mdx`**

```mdx
---
slug: the-new-silhouette
title: "The New Silhouette: Architecture Meets Fabric"
category: runway
date: "2026-07-10"
hero: "/images/hero-01.jpg"
excerpt: "How brutalist geometry is reshaping this season's tailoring — from sharp shoulder lines to sculptural draping."
author: "MODE Editorial"
featured: true
---

## The Geometry of Garment

This season, the runway belongs to architects. Designers are borrowing from brutalist geometry, postmodern curves, and deconstructivist angles to create garments that stand as much as they drape.

### The Sharp Shoulder

The return of the structured shoulder marks a departure from the soft, oversized silhouettes of recent years. Balenciaga, Margiela, and emerging Korean houses are all pushing toward a sharper, more deliberate line.

> "Clothing is the most personal architecture we inhabit. Why shouldn't it have the same rigor as a building?"

  — Rei Kawakubo

## Fabric as Structure

New textile technologies are enabling shapes that were previously impossible. Thermoplastic threads, 3D-printed meshes, and laser-cut bonding allow fabric to hold its form without traditional interfacing.

The result is a collection of garments that feel both ancient and futuristic — as if they were excavated from a lost civilization's couture archive.

### Key Pieces

The collection's standout is a double-faced wool coat with seams that flare outward at the shoulder, creating a silhouette that shifts with every movement. Paired with razor-pleated trousers, the effect is both commanding and fluid.

Look for similar treatments in accessories — structured bags that resemble miniature buildings, shoes with architectural heels that could stand as sculptures on their own.
```

- [ ] **Step 3: Create `src/content/articles/collection-02.mdx`**

```mdx
---
slug: paris-street-style-july
title: "Paris Street Style: The Art of Effortless Dressing"
category: street-style
date: "2026-07-08"
hero: "/images/hero-02.jpg"
excerpt: "From the Marais to Montmartre, we document the looks defining Parisian summer fashion."
author: "MODE Editorial"
featured: true
---

## The Summer Edit

Paris in July is a study in contrasts — the city empties of locals and fills with visitors, yet the style remains unmistakably Parisian. What we observed on the streets this month is a masterclass in restraint.

### The Uniform

The uniform, if it can be called that, consists of three elements:

1. A well-cut blazer (linen or lightweight wool)
2. Straight-leg trousers (never skinny, never too wide)
3. A single statement accessory

What separates the effortlessly dressed from the trying-too-hard is the third element. It might be a sculptural earring, a vintage bag found at a flea market, or — most commonly — a pair of sunglasses that cost more than the entire outfit combined.

> "Parisian style isn't about having the right things. It's about having the confidence to wear ordinary things extraordinarily well."

  — Sarah Andelman

## The Color Palette

This season's street palette leans toward neutrals with deliberate accents:

- **Sand** and **ecru** dominate tops and trousers
- **Navy** and **charcoal** for outerwear
- **Vintage red** or **chartreuse** for single-note accessories

Black is ever-present but never dominant — it's used as a grounding element, not a statement.

### Proportions

The most interesting looks played with proportion: oversized blazers over slim trousers, cropped jackets over flowing midi skirts, or the inverse — fitted tops with wide-leg trousers that pool over the shoe.
```

- [ ] **Step 4: Add placeholder hero images**

```bash
mkdir -p /Users/arpitsinghania/Downloads/work/MODE/public/images
# Create minimal placeholder images (1x1 pixel colored SVGs as placeholders)
cat > /Users/arpitsinghania/Downloads/work/MODE/public/images/hero-01.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#1a1a1a"/>
  <text x="800" y="460" text-anchor="middle" fill="#d4a853" font-family="serif" font-size="32">MODE — Collection 01</text>
</svg>
EOF

cat > /Users/arpitsinghania/Downloads/work/MODE/public/images/hero-02.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#222"/>
  <text x="800" y="460" text-anchor="middle" fill="#d4a853" font-family="serif" font-size="32">MODE — Paris Street Style</text>
</svg>
EOF

cat > /Users/arpitsinghania/Downloads/work/MODE/public/images/placeholder.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#111"/>
  <text x="400" y="310" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="18">MODE</text>
</svg>
EOF
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add article types, 2 sample MDX articles, hero placeholders"
```

---

### Task 3: Data Layer — Article and Category Utilities

**Files:**
- Create: `src/lib/articles.ts`
- Create: `src/data/articles.ts`
- Create: `src/data/categories.ts`

**Interfaces:**
- Consumes: `src/types/article.ts`, `src/content/articles/*.mdx`
- Produces: `getAllArticles()`, `getArticleBySlug(slug)`, `getArticlesByCategory(cat)`, `getFeaturedArticles()` in `src/lib/articles.ts`; `categories` array in `src/data/categories.ts`

- [ ] **Step 1: Create `src/lib/articles.ts`**

This module reads MDX files at build time using Node.js `fs` and parses frontmatter with `gray-matter`.

```ts
// src/lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleMeta, ArticleCategory } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

function getAllArticleFiles(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx"));
}

function parseArticleFile(filename: string): ArticleMeta | null {
  const filePath = path.join(articlesDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  if (!data.slug || !data.title || !data.category) return null;

  return {
    slug: data.slug,
    title: data.title,
    category: data.category as ArticleCategory,
    date: data.date,
    hero: data.hero || "/images/placeholder.svg",
    excerpt: data.excerpt || "",
    author: data.author || "MODE Editorial",
    featured: data.featured || false,
  };
}

export function getAllArticles(): ArticleMeta[] {
  const files = getAllArticleFiles();
  const articles = files
    .map(parseArticleFile)
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getArticleBySlug(slug: string): ArticleMeta | null {
  const files = getAllArticleFiles();
  for (const file of files) {
    const article = parseArticleFile(file);
    if (article && article.slug === slug) return article;
  }
  return null;
}

export function getArticlesByCategory(
  category: ArticleCategory
): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getAllCategories(): ArticleCategory[] {
  const cats = new Set<ArticleCategory>();
  getAllArticles().forEach((a) => cats.add(a.category));
  return Array.from(cats);
}
```

- [ ] **Step 2: Create `src/data/categories.ts`**

```ts
// src/data/categories.ts
import type { CategoryMeta, ArticleCategory } from "@/types/article";

export const categories: CategoryMeta[] = [
  {
    slug: "runway",
    name: "Runway",
    description: "Season collections, designer profiles, and front-row dispatches.",
  },
  {
    slug: "street-style",
    name: "Street Style",
    description: "Real fashion from the world's most stylish cities.",
  },
  {
    slug: "culture",
    name: "Culture",
    description: "Fashion at the intersection of art, music, and film.",
  },
  {
    slug: "beauty",
    name: "Beauty",
    description: "Skin, hair, fragrance — the rituals of personal style.",
  },
];

export function getCategoryMeta(
  slug: string
): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
```

- [ ] **Step 3: Create `src/data/articles.ts`**

This provides a convenient re-export for page components to consume.

```ts
// src/data/articles.ts
export {
  getAllArticles,
  getFeaturedArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getAllSlugs,
  getAllCategories,
} from "@/lib/articles";
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. No visible output changes yet since no pages use the data layer.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add data layer — lib/articles, data/categories"
```

---

### Task 4: Core Shared Components

**Files:**
- Create: `src/components/CategoryBadge.tsx`
- Create: `src/components/GoldRule.tsx`
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: Design tokens from `globals.css`
- Produces: `<CategoryBadge category={string} />`, `<GoldRule />`, `<SectionHeading>{children}</SectionHeading>`

- [ ] **Step 1: Create `CategoryBadge.tsx`**

```tsx
// src/components/CategoryBadge.tsx
import { getCategoryMeta } from "@/data/categories";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({
  category,
  className = "",
}: CategoryBadgeProps) {
  const meta = getCategoryMeta(category);
  const label = meta?.name || category;

  return (
    <span
      className={`inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-mode-gold ${className}`}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Create `GoldRule.tsx`**

```tsx
// src/components/GoldRule.tsx
interface GoldRuleProps {
  className?: string;
  thick?: boolean;
}

export default function GoldRule({ className = "", thick = false }: GoldRuleProps) {
  return (
    <div
      className={`${thick ? "h-0.5" : "h-px"} w-full bg-mode-gold ${className}`}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 3: Create `SectionHeading.tsx`**

```tsx
// src/components/SectionHeading.tsx
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-display text-display-sm md:text-display-md text-mode-white tracking-[-0.02em] ${className}`}
    >
      {children}
    </h2>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add core shared components — CategoryBadge, GoldRule, SectionHeading"
```

---

### Task 5: ArticleCard and ArticleGrid

**Files:**
- Create: `src/components/ArticleCard.tsx`
- Create: `src/components/ArticleGrid.tsx`

**Interfaces:**
- Consumes: `ArticleMeta` type, `motion/react`, `CategoryBadge`, `GoldRule`
- Produces: `<ArticleCard article={ArticleMeta} index={number} />`, `<ArticleGrid articles={ArticleMeta[]} />`

- [ ] **Step 1: Create `ArticleCard.tsx`**

```tsx
// src/components/ArticleCard.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import type { ArticleMeta } from "@/types/article";

interface ArticleCardProps {
  article: ArticleMeta;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="group"
    >
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-mode-gray-900 rounded-sm mb-4">
          <Image
            src={article.hero}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CategoryBadge category={article.category} className="mb-2" />
        <h3 className="font-display text-display-sm text-mode-white leading-[1.15] mb-2 group-hover:text-mode-gold transition-colors duration-300">
          {article.title}
        </h3>
        <p className="font-body text-sm text-mode-gray-400 leading-relaxed mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <time className="font-body text-xs text-mode-gray-600 uppercase tracking-wider">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <GoldRule className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.article>
  );
}
```

- [ ] **Step 2: Create `ArticleGrid.tsx`**

```tsx
// src/components/ArticleGrid.tsx
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/types/article";

interface ArticleGridProps {
  articles: ArticleMeta[];
  columns?: 2 | 3;
}

export default function ArticleGrid({
  articles,
  columns = 3,
}: ArticleGridProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-x-8 gap-y-12`}>
      {articles.map((article, i) => (
        <ArticleCard key={article.slug} article={article} index={i} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add ArticleCard with scroll-reveal animation and ArticleGrid"
```

---

### Task 6: Navigation — Header and MobileNav

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/MobileNav.tsx`

**Interfaces:**
- Consumes: `motion/react`, Link from Next.js
- Produces: `<Header />` — placed in root layout

- [ ] **Step 1: Create `Header.tsx`**

```tsx
// src/components/Header.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = [
  { href: "/category/runway", label: "Runway" },
  { href: "/category/street-style", label: "Street Style" },
  { href: "/category/culture", label: "Culture" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: isScrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(10, 10, 10, 0)",
        }}
      >
        <nav className="content-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-display-sm text-mode-white hover:text-mode-gold transition-colors duration-200"
          >
            MODE
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm uppercase tracking-[0.15em] text-mode-gray-400 hover:text-mode-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-mode-white" />
            <span className="block w-6 h-px bg-mode-white" />
            <span className="block w-6 h-px bg-mode-white" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
```

- [ ] **Step 2: Create `MobileNav.tsx`**

```tsx
// src/components/MobileNav.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
};

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-mode-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="absolute top-0 right-0 bottom-0 w-72 bg-mode-black border-l border-mode-gray-800 p-8 flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="self-end mb-12 p-2 text-mode-gray-400 hover:text-mode-white transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Links */}
            <ul className="space-y-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-display-sm text-mode-white hover:text-mode-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Header with scroll transition and MobileNav with slide overlay"
```

---

### Task 7: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: GoldRule design token
- Produces: `<Footer />` — placed in root layout

- [ ] **Step 1: Create `Footer.tsx`**

```tsx
// src/components/Footer.tsx
import GoldRule from "@/components/GoldRule";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/articles", label: "All Articles" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32">
      <GoldRule />
      <div className="content-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-display-sm text-mode-white hover:text-mode-gold transition-colors duration-200"
            >
              MODE
            </Link>
            <p className="font-body text-sm text-mode-gray-600 mt-2 max-w-xs">
              A curated editorial experience covering fashion, culture, and style.
            </p>
          </div>

          {/* Links */}
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm uppercase tracking-[0.15em] text-mode-gray-400 hover:text-mode-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-mode-gray-700 mt-10">
          &copy; {new Date().getFullYear()} MODE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update root `layout.tsx` to include Header and Footer**

Edit `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MODE — Fashion Blog",
  description:
    "A curated editorial experience covering fashion, culture, and style through the lens of Swiss Modernism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
    >
      <body className="min-h-dvh bg-mode-black text-mode-white flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Footer, update root layout with Header and Footer"
```

---

### Task 8: Homepage — Hero, Featured Feed, and Latest Stories

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getAllArticles()`, `getFeaturedArticles()` from data layer; `ArticleCard`, `ArticleGrid`, `SectionHeading`, `GoldRule`, `CategoryBadge` components; `motion/react`
- Produces: Homepage with hero, featured grid, and latest stories

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllArticles, getFeaturedArticles } from "@/data/articles";
import { categories } from "@/data/categories";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";
import CategoryBadge from "@/components/CategoryBadge";
import ParallaxHero from "@/components/ParallaxHero";

export default function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const heroArticle = featuredArticles[0];
  const remainingFeatured = featuredArticles.slice(1, 4);
  const latestArticles = allArticles;

  return (
    <div>
      {/* ========== HERO ========== */}
      {heroArticle && (
        <section className="relative w-full h-[80vh] min-h-[600px]">
          <ParallaxHero article={heroArticle} />
        </section>
      )}

      {/* ========== FEATURED FEED ========== */}
      {remainingFeatured.length > 0 && (
        <section className="content-container section-spacing-md">
          <SectionHeading className="mb-10">Featured Stories</SectionHeading>
          <ArticleGrid articles={remainingFeatured} columns={3} />
        </section>
      )}

      <div className="content-container">
        <GoldRule />
      </div>

      {/* ========== LATEST STORIES ========== */}
      <section className="content-container section-spacing-md">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading>Latest Stories</SectionHeading>
          <Link
            href="/articles"
            className="font-body text-sm uppercase tracking-[0.15em] text-mode-gold hover:text-mode-gold/80 transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        <ArticleGrid articles={latestArticles} columns={3} />
      </section>

      {/* ========== CATEGORIES BAR ========== */}
      <div className="content-container">
        <GoldRule />
      </div>
      <section className="content-container section-spacing-md">
        <SectionHeading className="mb-10">Categories</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group border border-mode-gray-800 hover:border-mode-gold/50 rounded-sm p-6 transition-all duration-300"
            >
              <h3 className="font-display text-display-sm text-mode-white group-hover:text-mode-gold transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="font-body text-sm text-mode-gray-500 mt-2 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ParallaxHero.tsx`**

This is a client component with the scroll-driven parallax effect.

```tsx
// src/components/ParallaxHero.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import type { ArticleMeta } from "@/types/article";

interface ParallaxHeroProps {
  article: ArticleMeta;
}

export default function ParallaxHero({ article }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={article.hero}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mode-black via-mode-black/30 to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24"
        style={{ opacity, y: textY }}
      >
        <div className="content-container">
          <CategoryBadge category={article.category} className="mb-3" />
          <h1 className="font-display text-display-xl text-mode-white leading-[0.95] tracking-[-0.03em] max-w-3xl">
            <Link
              href={`/articles/${article.slug}`}
              className="hover:text-mode-gold transition-colors duration-300"
            >
              {article.title}
            </Link>
          </h1>
          <GoldRule className="my-6 max-w-md" />
          <p className="font-body text-lg text-mode-gray-400 max-w-xl leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. The homepage should show the hero with parallax effect, featured stories grid, latest stories, and categories section.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: homepage — parallax hero, featured feed, latest stories, categories"
```

---

### Task 9: Articles Feed Page with Category Filtering

**Files:**
- Create: `src/app/articles/page.tsx`

**Interfaces:**
- Consumes: `getAllArticles()`, `getAllCategories()`; `ArticleGrid`, `SectionHeading`, `GoldRule` components
- Produces: `/articles` route with category filter tabs

- [ ] **Step 1: Create `src/app/articles/page.tsx`**

```tsx
// src/app/articles/page.tsx
import { getAllArticles, getAllCategories } from "@/data/articles";
import { getCategoryMeta } from "@/data/categories";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";
import ArticlesFilter from "@/components/ArticlesFilter";

export default function ArticlesPage() {
  const allArticles = getAllArticles();
  const categories = getAllCategories();

  return (
    <div className="pt-24 md:pt-28">
      <section className="content-container section-spacing-sm">
        <SectionHeading>All Articles</SectionHeading>
        <p className="font-body text-mode-gray-500 mt-3 max-w-lg">
          Discover stories from the worlds of fashion, culture, and style.
        </p>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      <section className="content-container section-spacing-md">
        <ArticlesFilter
          articles={allArticles}
          categories={categories.map((c) => ({
            slug: c,
            name: getCategoryMeta(c)?.name || c,
          }))}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ArticlesFilter.tsx`**

This client component provides the category tab filtering with AnimatePresence.

```tsx
// src/components/ArticlesFilter.tsx
"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/types/article";

interface ArticlesFilterProps {
  articles: ArticleMeta[];
  categories: { slug: string; name: string }[];
}

export default function ArticlesFilter({
  articles,
  categories,
}: ArticlesFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  const handleCategoryChange = useCallback(
    (slug: string | null) => {
      setActiveCategory((prev) => (prev === slug ? null : slug));
    },
    []
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`font-body text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-sm transition-all duration-200 ${
            activeCategory === null
              ? "bg-mode-gold text-mode-black font-medium"
              : "bg-mode-gray-800 text-mode-gray-400 hover:text-mode-white"
          }`}
          role="tab"
          aria-selected={activeCategory === null}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`font-body text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-sm transition-all duration-200 ${
              activeCategory === cat.slug
                ? "bg-mode-gold text-mode-black font-medium"
                : "bg-mode-gray-800 text-mode-gray-400 hover:text-mode-white"
            }`}
            role="tab"
            aria-selected={activeCategory === cat.slug}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Article grid with exit animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ArticleCard article={article} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="font-body text-mode-gray-500 text-center py-16">
          No articles found in this category.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Navigate to `/articles` to see the full feed with category filter tabs.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: articles feed page with category filtering and AnimatePresence"
```

---

### Task 10: Article Detail Page with Reading Progress

**Files:**
- Create: `src/app/articles/[slug]/page.tsx`
- Create: `src/components/ScrollProgress.tsx`

**Interfaces:**
- Consumes: `getAllSlugs()`, `getArticleBySlug()`; MDX dynamic imports; `ScrollProgress`; `motion/react`
- Produces: `/articles/[slug]` route

- [ ] **Step 1: Create `src/components/ScrollProgress.tsx`**

```tsx
// src/components/ScrollProgress.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-mode-gold origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 2: Create `src/app/articles/[slug]/page.tsx`**

```tsx
// src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getArticleBySlug } from "@/data/articles";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import ScrollProgress from "@/components/ScrollProgress";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";
import type { ArticleMeta } from "@/types/article";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Load the MDX module dynamically at build time
  let MDXContent: React.ComponentType;
  let articleMeta: ArticleMeta;

  try {
    const mdxModule = await import(
      `@/content/articles/${slug}.mdx`
    );
    MDXContent = mdxModule.default;

    // Get related articles (same category, exclude current)
    const { getAllArticles } = await import("@/data/articles");
    const related = getAllArticles()
      .filter((a) => a.category === article.category && a.slug !== article.slug)
      .slice(0, 3);

    articleMeta = article;

    return (
      <>
        <ScrollProgress />

        <article>
          {/* Hero image */}
          <div className="relative w-full h-[50vh] min-h-[400px]">
            <Image
              src={article.hero}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mode-black via-mode-black/20 to-transparent" />
          </div>

          {/* Article header */}
          <header className="content-container -mt-20 relative z-10">
            <div className="max-w-3xl">
              <CategoryBadge category={article.category} className="mb-3" />
              <h1 className="font-display text-display-xl text-mode-white leading-[0.95] tracking-[-0.03em]">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 mb-6">
                <span className="font-body text-sm text-mode-gray-500">
                  {article.author}
                </span>
                <span className="text-mode-gray-700">&middot;</span>
                <time className="font-body text-sm text-mode-gray-500">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <GoldRule className="max-w-md" />
            </div>
          </header>

          {/* Article body */}
          <div className="content-container section-spacing-md">
            <div className="max-w-3xl mdx-content">
              <MDXContent />
            </div>
          </div>

          {/* Bottom gold rule */}
          <div className="content-container">
            <GoldRule />
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="content-container section-spacing-md">
              <SectionHeading className="mb-10">Related Stories</SectionHeading>
              <ArticleGrid articles={related} columns={3} />
            </section>
          )}
        </article>
      </>
    );
  } catch {
    notFound();
  }
}

// Dynamically prevent caching — we want full SSG
export const dynamic = "force-static";
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Navigate to `/articles/the-new-silhouette` to see the full article with MDX rendering, scroll progress bar, and related articles.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: article detail page with MDX rendering, scroll progress, related articles"
```

---

### Task 11: Category Pages and About Page

**Files:**
- Create: `src/app/category/[category]/page.tsx`
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `getArticlesByCategory()`, `getAllCategories()`, `getCategoryMeta()`; `ArticleGrid`, `SectionHeading`, `GoldRule` components
- Produces: `/category/[category]` and `/about` routes

- [ ] **Step 1: Create `src/app/category/[category]/page.tsx`**

```tsx
// src/app/category/[category]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCategories,
  getArticlesByCategory,
} from "@/data/articles";
import { getCategoryMeta } from "@/data/categories";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";
import type { ArticleCategory } from "@/types/article";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  if (!meta) {
    notFound();
  }

  const articles = getArticlesByCategory(category as ArticleCategory);

  return (
    <div className="pt-24 md:pt-28">
      <section className="content-container section-spacing-sm">
        <Link
          href="/articles"
          className="font-body text-xs uppercase tracking-[0.15em] text-mode-gray-500 hover:text-mode-white transition-colors duration-200 mb-4 inline-block"
        >
          &larr; All Articles
        </Link>
        <SectionHeading>{meta.name}</SectionHeading>
        <p className="font-body text-mode-gray-500 mt-3 max-w-lg">
          {meta.description}
        </p>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      <section className="content-container section-spacing-md">
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} columns={3} />
        ) : (
          <div className="py-16 text-center">
            <p className="font-body text-mode-gray-500">
              No articles in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export const dynamic = "force-static";
```

- [ ] **Step 2: Create `src/app/about/page.tsx`**

```tsx
// src/app/about/page.tsx
import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="content-container section-spacing-sm">
        <SectionHeading>About MODE</SectionHeading>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      <section className="content-container section-spacing-md">
        <div className="max-w-3xl">
          <p className="font-display text-display-md text-mode-white leading-[1.1] mb-8">
            A curated editorial experience covering fashion, culture, and style
            through the lens of Swiss Modernism.
          </p>

          <GoldRule className="mb-8 max-w-sm" />

          <div className="space-y-6 font-body text-lg text-mode-gray-500 leading-[1.7]">
            <p>
              MODE is a fashion publication that believes clothing is the most
              personal form of architecture. We cover the collections, the
              streets, and the culture that shapes what we wear — with the same
              precision and restraint that defines great design.
            </p>
            <p>
              Founded in 2026, MODE brings together writers, photographers, and
              designers who share a belief in editorial rigor. Every story is
              crafted with the same attention to detail we expect from the
              garments we cover.
            </p>
            <p>
              Based in New York and Paris. Published daily.
            </p>
          </div>

          <GoldRule className="my-12 max-w-sm" />

          {/* Contact */}
          <div>
            <h3 className="font-display text-display-sm text-mode-white mb-4">
              Contact
            </h3>
            <p className="font-body text-mode-gray-500">
              Editorial:{" "}
              <a
                href="mailto:editorial@mode.blog"
                className="text-mode-gold underline underline-offset-2 decoration-mode-gold/40 hover:decoration-mode-gold transition-all"
              >
                editorial@mode.blog
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Navigate to `/category/runway`, `/category/street-style`, `/about` to see all pages working.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: category pages and about page"
```

---

### Task 12: Animation Polish — Reduced Motion and Edge Cases

**Files:**
- Create: `src/components/PageTransition.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `motion/react`, `useReducedMotion()`
- Produces: Page transition animations; 404 page; reduced-motion compliance

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
// src/app/not-found.tsx
import Link from "next/link";
import GoldRule from "@/components/GoldRule";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-32">
      <div className="content-container text-center max-w-lg">
        <h1 className="font-display text-display-xl text-mode-white mb-4">
          404
        </h1>
        <GoldRule className="mb-6 max-w-xs mx-auto" />
        <p className="font-body text-lg text-mode-gray-500 mb-8">
          This page does not exist. The article may have been removed or the
          link is incorrect.
        </p>
        <Link
          href="/"
          className="inline-block font-body text-sm uppercase tracking-[0.15em] text-mode-black bg-mode-gold px-6 py-3 rounded-sm hover:bg-mode-gold/90 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wrap root layout with page transition animations**

Edit `src/app/layout.tsx` to add the `PageTransition` wrapper. Replace the children rendering in the `<main>` tag:

```tsx
import PageTransition from "@/components/PageTransition";

// ... inside the body tag, change:
// <main className="flex-1">{children}</main>
// to:
// <main className="flex-1">
//   <PageTransition>{children}</PageTransition>
// </main>
```

Use Edit to make the specific change:

Old string:
```tsx
        <main className="flex-1">{children}</main>
```

New string:
```tsx
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
```

- [ ] **Step 3: Create `src/components/PageTransition.tsx`**

```tsx
// src/components/PageTransition.tsx
"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Add `useReducedMotion` to all animation components**

Edit `ParallaxHero.tsx` to respect reduced motion:

```tsx
// Add import at top
import { useReducedMotion } from "motion/react";

// In the component body, add:
const prefersReducedMotion = useReducedMotion();

// Use in the motion.div styles:
// If prefersReducedMotion, set imageY to "0%" and opacity to 1
const imageY = prefersReducedMotion
  ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  : useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
const opacity = prefersReducedMotion
  ? useTransform(scrollYProgress, [0, 1], [1, 1])
  : useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
const textY = prefersReducedMotion
  ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  : useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
```

Also update `MobileNav.tsx` to use reduced motion for the panel:

```tsx
// In MobileNav component, add:
import { useReducedMotion } from "motion/react";

// Add inside component:
const prefersReducedMotion = useReducedMotion();

// Adjust panelVariants:
const panelVariants = prefersReducedMotion
  ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    }
  : {
      hidden: { x: "100%" },
      visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
      exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
    };
```

- [ ] **Step 5: Verify full build and navigate all routes**

```bash
npm run build
```

Expected: Build succeeds cleanly. All routes generate statically:
- `/` — Homepage with parallax hero
- `/articles` — Full feed with category filters
- `/articles/the-new-silhouette` — Full article with MDX
- `/articles/paris-street-style-july` — Second article
- `/category/runway` — Category page
- `/category/street-style` — Category page
- `/category/culture` — Category page (empty state)
- `/category/beauty` — Category page (empty state)
- `/about` — About page
- `/nonexistent` — 404 page

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: page transitions, reduced-motion support, 404 page"
```

---

### Task 13: 21st.dev Component Polish and UI/UX Validation

**Files:**
- Modify: Any components improved by sourced alternatives from 21st.dev
- Validate using: `ui-ux-pro-max` skill

**Interfaces:**
- Consumes: All existing components
- Produces: Polished components with 21st.dev-sourced improvements

- [ ] **Step 1: Search 21st.dev for hero section improvements**

```bash
npx 21st search "fashion editorial hero parallax"
```

Evaluate results. If a compelling hero pattern is found, install and adapt it:

```bash
npx 21st add <component-name>
```

Customize the sourced component's colors to match MODE design tokens (`text-gold`, `bg-mode-black`, etc.).

- [ ] **Step 2: Search 21st.dev for navigation improvements**

```bash
npx 21st search "minimal dark navigation header"
```

Evaluate results. If a navigation component fits the Swiss Modernism aesthetic, install and adapt.

- [ ] **Step 3: Search 21st.dev for article card improvements**

```bash
npx 21st search "editorial card fashion blog"
```

Evaluate results. If card patterns match the design system, install and adapt.

- [ ] **Step 4: Run ui-ux-pro-max for validation**

```bash
python3 ~/Downloads/work/.claude/skills/ui-ux-pro-max/scripts/search.py "fashion blog editorial dark gold" --design-system -p "MODE"
```

Compare the output with MODE's current design tokens in `globals.css`. Note any conflicts and resolve them — the MODE design system takes priority as it was already approved.

- [ ] **Step 5: Run accessibility UX check**

```bash
python3 ~/Downloads/work/.claude/skills/ui-ux-pro-max/scripts/search.py "fashion blog editorial" --domain ux
```

Review the UX guidelines against MODE's current implementation. Specifically check:
- Color contrast (gold on black = 5.3:1 ✓)
- Touch target sizes (all interactive elements ≥44px)
- Focus states on interactive elements
- Screen reader labels on icon-only buttons

- [ ] **Step 6: Verify build after any changes**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "polish: 21st.dev component integration and ui-ux-pro-max validation"
```

---

### Task 14: Final Dev Server Smoke Test

**Files:**
- None (verification only)

- [ ] **Step 1: Start the dev server**

```bash
npx next dev -p 3000
```

URL: http://localhost:3000

- [ ] **Step 2: Verify each route manually**

| Route | Expected |
|-------|----------|
| `/` | Hero with parallax, featured grid, latest stories, categories |
| `/articles` | Full grid with category filter tabs |
| `/articles/the-new-silhouette` | MDX rendered article, scroll progress bar, related articles |
| `/articles/paris-street-style-july` | Second article rendering |
| `/category/runway` | Filtered articles for runway |
| `/category/culture` | Empty state message ("No articles in this category yet") |
| `/about` | About page with contact |
| `/nonexistent` | 404 page with "Back to Home" link |

- [ ] **Step 3: Check responsive behavior**

Open DevTools and test at:
- 375px (mobile) — should show single-column grid, hamburger nav
- 768px (tablet) — should show 2-column grid
- 1440px (desktop) — should show 3-column grid, full nav

- [ ] **Step 4: Check reduced-motion**

In DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce"
Verify:
- Page transition animation is skipped
- Parallax hero doesn't move on scroll
- Mobile nav slides without spring animation

- [ ] **Step 5: Commit final adjustments (if any)**

```bash
git add -A
git commit -m "fix: final adjustments from smoke test"
```
