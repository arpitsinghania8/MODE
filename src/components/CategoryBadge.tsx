// src/components/CategoryBadge.tsx
import { getCategoryMeta } from "@/data/categories";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({
  category,
  className = "",
}: CategoryBadgeProps) {
  const meta = getCategoryMeta(category);
  const label = meta?.name || category;

  return (
    <span
      className={`inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-mode-gold neon-glow-text ${className}`}
    >
      {label}
    </span>
  );
}
