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
