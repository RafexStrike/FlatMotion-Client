"use client";

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-surface border border-gray-200 dark:border-white/10 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 dark:bg-surface-2" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-surface-2 rounded-lg w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-surface-2 rounded-lg w-full" />
          <div className="h-4 bg-gray-200 dark:bg-surface-2 rounded-lg w-5/6" />
        </div>

        {/* Meta info */}
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-gray-200 dark:bg-surface-2 rounded-full w-16" />
          <div className="h-5 bg-gray-200 dark:bg-surface-2 rounded-full w-16" />
        </div>

        {/* Button */}
        <div className="h-9 bg-gray-200 dark:bg-surface-2 rounded-lg w-full mt-4" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
