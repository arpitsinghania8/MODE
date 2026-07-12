// /articles loading
import { ArticleCardSkeleton } from "@/components/Skeleton";

export default function ArticlesLoading() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="content-container section-spacing-sm">
        <div className="h-10 w-48 bg-mode-gray-800/60 rounded-sm animate-pulse" />
        <div className="h-5 w-72 mt-3 bg-mode-gray-800/60 rounded-sm animate-pulse" />
      </div>
      <div className="content-container">
        <div className="h-px w-full bg-mode-gold/30" />
      </div>
      <div className="content-container section-spacing-md">
        {/* Filter tabs skeleton */}
        <div className="flex flex-wrap gap-2 mb-10">
          <div className="h-8 w-12 bg-mode-gray-800/60 rounded-sm animate-pulse" />
          <div className="h-8 w-20 bg-mode-gray-800/60 rounded-sm animate-pulse" />
          <div className="h-8 w-24 bg-mode-gray-800/60 rounded-sm animate-pulse" />
          <div className="h-8 w-16 bg-mode-gray-800/60 rounded-sm animate-pulse" />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
