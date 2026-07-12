// src/data/categories.ts
import type { CategoryMeta, ArticleCategory } from "@/types/article";

export const categories: CategoryMeta[] = [
  {
    slug: "runway" as ArticleCategory,
    name: "Runway",
    description:
      "Season collections, designer profiles, and front-row dispatches.",
  },
  {
    slug: "street-style" as ArticleCategory,
    name: "Street Style",
    description:
      "Real fashion from the world's most stylish cities.",
  },
  {
    slug: "culture" as ArticleCategory,
    name: "Culture",
    description:
      "Fashion at the intersection of art, music, and film.",
  },
  {
    slug: "beauty" as ArticleCategory,
    name: "Beauty",
    description:
      "Skin, hair, fragrance — the rituals of personal style.",
  },
];

export function getCategoryMeta(
  slug: string
): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
