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
              ? "bg-mode-gold text-mode-black font-medium neon-glow-box"
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
                ? "bg-mode-gold text-mode-black font-medium neon-glow-box"
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
