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
