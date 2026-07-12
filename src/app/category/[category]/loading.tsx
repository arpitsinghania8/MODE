// /category/[category] loading
import { ArticleCardSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="content-container section-spacing-sm">
        <div className="h-4 w-32 bg-mode-gray-800/60 rounded-sm animate-pulse mb-4" />
        <div className="h-10 w-56 bg-mode-gray-800/60 rounded-sm animate-pulse" />
        <div className="h-5 w-96 mt-3 bg-mode-gray-800/60 rounded-sm animate-pulse" />
      </div>
      <div className="content-container">
        <div className="h-px w-full bg-mode-gold/30" />
      </div>
      <div className="content-container section-spacing-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
