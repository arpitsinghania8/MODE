// src/components/ParallaxHero.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import type { ArticleMeta } from "@/types/article";

interface ParallaxHeroProps {
  article: ArticleMeta;
}

export default function ParallaxHero({ article }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={article.hero}
          alt={article.title}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mode-black via-mode-black/30 to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24"
        style={{ opacity, y: textY }}
      >
        <div className="content-container">
          <CategoryBadge category={article.category} className="mb-3" />
          <h1 className="font-display text-display-xl text-mode-white leading-[0.95] tracking-[-0.03em] max-w-3xl">
            <Link
              href={`/articles/${article.slug}`}
              className="hover:text-mode-gold neon-glow-hover transition-colors duration-300"
            >
              {article.title}
            </Link>
          </h1>
          <GoldRule className="my-6 max-w-md neon-pulse-slow" />
          <p className="font-body text-lg text-mode-gray-400 max-w-xl leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
