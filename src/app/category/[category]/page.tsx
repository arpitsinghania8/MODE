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
