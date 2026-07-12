// src/components/ScrollProgress.tsx
"use client";

import { useScroll, useTransform, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-mode-gold origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
