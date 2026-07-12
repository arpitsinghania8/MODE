#!/usr/bin/env node

// Generates fashion articles for MODE using:
// - GitHub Models API (free — uses built-in $GITHUB_TOKEN)
// - Pexels API (free — uses $PEXELS_API_KEY for fashion photography)
// Run: GITHUB_TOKEN=<token> PEXELS_API_KEY=<key> node scripts/generate-content.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "src/content/articles");
const CATEGORIES = ["runway", "street-style", "culture", "beauty"];

const API_URL = "https://models.github.ai/inference/chat/completions";
const MODEL = "openai/gpt-4o-mini";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const LOCAL_HEROES = [
  "/images/hero-01.svg",
  "/images/hero-02.svg",
  "/images/placeholder.svg",
];

// Pexels search terms mapped to each category
const PEXELS_QUERIES = {
  runway: "fashion runway show designer collection",
  "street-style": "street style fashion urban clothing people city",
  culture: "fashion art design culture exhibition",
  beauty: "beauty fashion makeup skincare portrait",
};

// ---------- helpers ----------

function readAllArticles() {
  const indexPath = path.join(ARTICLES_DIR, "articles.json");
  if (fs.existsSync(indexPath)) {
    try {
      const raw = fs.readFileSync(indexPath, "utf8");
      return JSON.parse(raw);
    } catch {
      // fall through to file-based reading
    }
  }
  // Fallback: read from MDX files directly
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8");
      const slug = f.replace(".mdx", "");
      const title = raw.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] || slug;
      const category = raw.match(/^category:\s*(\S+)/m)?.[1] || "culture";
      return { slug, title, category };
    });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function pickCategory(articles) {
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  for (const a of articles) {
    if (counts[a.category] !== undefined) counts[a.category]++;
  }
  return CATEGORIES.toSorted((a, b) => counts[a] - counts[b])[0];
}

// ---------- Pexels image search ----------

async function searchPexels(query, perPage = 5) {
  if (!PEXELS_API_KEY) return [];

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!res.ok) {
    console.warn(`   ⚠️  Pexels API error ${res.status}, falling back to local images`);
    return [];
  }

  const data = await res.json();
  return data.photos || [];
}

function pickPexelsPhoto(photos) {
  if (!photos || photos.length === 0) return null;
  const photo = photos[Math.floor(Math.random() * photos.length)];
  return {
    url: photo.src.large2x || photo.src.large || photo.src.original,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsUrl: photo.url,
    alt: photo.alt || "",
  };
}

// ---------- GitHub Models API call ----------

async function callAPI(messages) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN env var is required. In GitHub Actions this is automatic."
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.8,
      max_tokens: 3000,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ---------- article generation ----------

async function generateArticle(category, existingArticles, pexelsPhoto) {
  const existingTitles = existingArticles
    .map((a) => `- "${a.title}" (${a.category})`)
    .join("\n");

  // If we have a Pexels photo, describe it so the model can reference it
  const imageHint = pexelsPhoto
    ? `\nThe article's hero image is: "${pexelsPhoto.alt}" (photo by ${pexelsPhoto.photographer}). You can reference this image naturally in the article.`
    : "";

  const prompt = `You are a fashion editor for MODE, a curated fashion and culture publication with a Swiss Modernism design sensibility.

Write an original, compelling fashion article for the **${category}** category.

## Existing articles (avoid repeating these topics):
${existingTitles || "No existing articles yet."}
${imageHint}

## Requirements:
- Category: ${category}
- Today's date: ${new Date().toISOString().split("T")[0]}
- Author: MODE Editorial
- Length: 3-5 sections with ## headings (250-450 words total)
- Include 1 fashion-forward pull quote formatted as a blockquote with attribution (e.g., > "text" > — Name)
- Use sophisticated but accessible fashion language
- Make it feel authentic — like something from a real editorial site

## Output format:
Return ONLY valid MDX with YAML frontmatter between --- delimiters. No markdown code fences, no extra text.

Frontmatter:
\`\`\`
---
slug: kebab-case-slug
title: "Engaging Article Title"
category: ${category}
date: "YYYY-MM-DD"
hero: "/images/placeholder.svg"
excerpt: "One compelling sentence that makes you want to read."
author: "MODE Editorial"
featured: false
---
\`\`\`

Then the MDX content using ## for section headings and > for blockquote pull quotes.`;

  const response = await callAPI([
    {
      role: "system",
      content:
        "You are a fashion editorial writer. You output only valid MDX with YAML frontmatter. No code fences, no extra commentary.",
    },
    { role: "user", content: prompt },
  ]);

  return response;
}

// ---------- parsing ----------

function parseArticle(raw, category, pexelsPhoto) {
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n\s*---/);
  if (!fmMatch) throw new Error("No valid YAML frontmatter found in response");

  const rawContent = raw.slice(fmMatch[0].length).trim();
  if (!rawContent) throw new Error("No body content found after frontmatter");

  const fm = {};
  for (const line of fmMatch[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    fm[key] = val;
  }

  if (!fm.title) throw new Error("Generated article is missing a title");

  const existingSlugs = new Set(
    fs.existsSync(ARTICLES_DIR)
      ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"))
      : []
  );

  let slug = slugify(fm.slug || fm.title);
  if (existingSlugs.has(`${slug}.mdx`)) {
    let i = 1;
    while (existingSlugs.has(`${slug}-${i}.mdx`)) i++;
    slug = `${slug}-${i}`;
  }

  // Determine hero image: prefer Pexels photo, fall back to local SVGs
  let hero, photographerCredit;
  if (pexelsPhoto) {
    hero = pexelsPhoto.url;
    photographerCredit = {
      name: pexelsPhoto.photographer,
      url: pexelsPhoto.photographerUrl,
      pexelsUrl: pexelsPhoto.pexelsUrl,
    };
  } else {
    const idx = existingSlugs.size % LOCAL_HEROES.length;
    hero = fm.hero?.startsWith("/") ? fm.hero : LOCAL_HEROES[idx];
    photographerCredit = null;
  }

  // Append photographer credit to article as a subtle note
  let content = rawContent;
  if (photographerCredit) {
    content += `\n\n---\n\n*Photo by [${photographerCredit.name}](${photographerCredit.url}) on [Pexels](${photographerCredit.pexelsUrl}).*`;
  }

  return {
    slug,
    title: fm.title || "Untitled",
    category,
    date: fm.date || new Date().toISOString().split("T")[0],
    hero,
    excerpt: fm.excerpt || `A story about ${category}.`,
    author: fm.author || "MODE Editorial",
    featured: false,
    content,
  };
}

function buildMDX(article) {
  // Return just the body content — no YAML frontmatter.
  // Metadata is stored in articles.json instead.
  return article.content;
}

function updateArticlesIndex(article) {
  const indexPath = path.join(ARTICLES_DIR, "articles.json");
  let articles = [];
  if (fs.existsSync(indexPath)) {
    try {
      articles = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    } catch {
      articles = [];
    }
  }
  // Remove existing entry with same slug (shouldn't happen but be safe)
  articles = articles.filter((a) => a.slug !== article.slug);
  articles.push({
    slug: article.slug,
    title: article.title,
    category: article.category,
    date: article.date,
    hero: article.hero,
    excerpt: article.excerpt,
    author: article.author,
    featured: article.featured,
  });
  fs.writeFileSync(indexPath, JSON.stringify(articles, null, 2), "utf8");
}

// ---------- main ----------

async function main() {
  console.log("📰 MODE Content Generator\n");

  const articles = readAllArticles();
  console.log(`Existing articles: ${articles.length}`);

  if (articles.length >= 60) {
    console.log("Already have 60+ articles, nothing new this run.");
    return;
  }

  const category = pickCategory(articles);
  console.log(`Picked category: ${category} (fewest articles)`);

  // Fetch a relevant Pexels photo for this category
  let pexelsPhoto = null;
  if (PEXELS_API_KEY) {
    console.log("\n📷 Searching Pexels for fashion images...");
    const query = PEXELS_QUERIES[category] || "fashion style";
    const photos = await searchPexels(query);
    pexelsPhoto = pickPexelsPhoto(photos);
    if (pexelsPhoto) {
      console.log(`   Found photo by ${pexelsPhoto.photographer}`);
    } else {
      console.log("   No photos found, using local hero images");
    }
  } else {
    console.log("\n📷 PEXELS_API_KEY not set, using local hero images");
  }

  // Try generating (with retries)
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`\n✍️  Generating article (attempt ${attempt})...`);
      const raw = await generateArticle(category, articles, pexelsPhoto);
      console.log("   Parsing response...");

      const parsed = parseArticle(raw, category, pexelsPhoto);
      const mdx = buildMDX(parsed);
      const filePath = path.join(ARTICLES_DIR, `${parsed.slug}.mdx`);

      fs.writeFileSync(filePath, mdx, "utf8");
      updateArticlesIndex(parsed);
      console.log(`\n✅ Done!`);
      console.log(`   Title:   "${parsed.title}"`);
      console.log(`   File:    src/content/articles/${parsed.slug}.mdx`);
      console.log(`   Image:   ${parsed.hero.slice(0, 80)}...`);
      return parsed;
    } catch (err) {
      lastError = err;
      console.error(`   ❌ Attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) {
        const wait = attempt * 5000;
        console.log(`   Retrying in ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }

  console.error(`\n❌ All 3 attempts failed. Last error: ${lastError.message}`);
  process.exit(1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
