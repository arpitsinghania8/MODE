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
