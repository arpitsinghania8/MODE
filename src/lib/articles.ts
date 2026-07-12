// src/lib/articles.ts
import fs from "fs";
import path from "path";
import type { ArticleMeta, ArticleCategory } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");
const indexFilePath = path.join(articlesDirectory, "articles.json");

let cachedArticles: ArticleMeta[] | null = null;

function loadArticles(): ArticleMeta[] {
  if (cachedArticles) return cachedArticles;

  if (!fs.existsSync(indexFilePath)) return [];

  try {
    const raw = fs.readFileSync(indexFilePath, "utf8");
    const articles = JSON.parse(raw) as ArticleMeta[];
    articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    cachedArticles = articles;
    return articles;
  } catch {
    return [];
  }
}

export function getAllArticles(): ArticleMeta[] {
  return loadArticles();
}

export function getFeaturedArticles(): ArticleMeta[] {
  return loadArticles().filter((a) => a.featured);
}

export function getArticleBySlug(slug: string): ArticleMeta | null {
  return loadArticles().find((a) => a.slug === slug) ?? null;
}

export function getArticlesByCategory(
  category: ArticleCategory
): ArticleMeta[] {
  return loadArticles().filter((a) => a.category === category);
}

export function getAllSlugs(): string[] {
  return loadArticles().map((a) => a.slug);
}

export function getAllCategories(): ArticleCategory[] {
  const cats = new Set<ArticleCategory>();
  loadArticles().forEach((a) => cats.add(a.category));
  return Array.from(cats);
}
