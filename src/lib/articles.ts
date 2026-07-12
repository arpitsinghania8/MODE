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
