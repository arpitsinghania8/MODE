// src/components/ArticleCard.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import type { ArticleMeta } from "@/types/article";

interface ArticleCardProps {
  article: ArticleMeta;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="group"
    >
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-mode-gray-900 rounded-sm mb-4">
          <Image
            src={article.hero}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CategoryBadge category={article.category} className="mb-2" />
        <h3 className="font-display text-display-sm text-mode-white leading-[1.15] mb-2 neon-glow-hover group-hover:text-mode-gold transition-colors duration-300">
          {article.title}
        </h3>
        <p className="font-body text-sm text-mode-gray-400 leading-relaxed mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <time className="font-body text-xs text-mode-gray-600 uppercase tracking-wider">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <GoldRule className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.article>
  );
}
