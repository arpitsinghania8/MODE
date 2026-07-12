import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/data/articles";
import { categories } from "@/data/categories";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";
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
        <section className="relative w-full h-[90vh] min-h-[600px]">
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
            className="font-body text-sm uppercase tracking-[0.15em] text-mode-gold neon-glow-hover hover:text-mode-gold/80 transition-all duration-200"
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
