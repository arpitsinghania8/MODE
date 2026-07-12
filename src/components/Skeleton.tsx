// src/components/Skeleton.tsx
interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-mode-gray-800/60 rounded-sm ${className}`}
      aria-hidden="true"
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="w-full aspect-[4/3] mb-4" />
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-3" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div>
      {/* Hero skeleton */}
      <Skeleton className="w-full h-[60vh] min-h-[400px]" />
      {/* Content skeleton */}
      <div className="content-container -mt-20 relative z-10">
        <div className="max-w-3xl">
          <div className="pt-20">
            <Skeleton className="h-4 w-20 mb-4" />
            <Skeleton className="h-16 w-full mb-3" />
            <Skeleton className="h-16 w-4/5 mb-4" />
            <Skeleton className="h-4 w-64 mb-8" />
            <Skeleton className="h-px w-full max-w-md mb-12" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
